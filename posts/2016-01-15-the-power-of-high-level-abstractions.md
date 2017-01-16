---
title: The Power of High Level Abstractions
---

Abstractions can be very powerful tools to express complex concepts succinctly. Declarative programming is all about abstracting irrelevant implementation details away, allowing engineers to focus more on logic than on code. Functional programming is a type of declarative programming, where we can express our logic in terms of functions.

In this blog post, I'll be moving from Go to increasingly abstract Scala to solve a problem.

## The Problem

Let's say we have a database of counts of page impressions, and we want to get total page impressions and clicks over any finite, discrete interval of time.

We have a table that looks like the following:

```sql
CREATE TABLE event_sums (
  -- The timestamp of the minute that these sums were collected for.
  timestamp int,

  -- The account of the events, e.g. "Asuna Inc."
  account string,

  -- The source of the event, e.g. "Marketing website 1".
  source string,

  sum blob,

  PRIMARY KEY((timestamp, account, source))
);
```

Sum will be a serializable type that looks like this:

```go
type Sum struct {
  PageImpressions uint64
  Clicks          uint64
}
```

Thus, we can create a type like this that maps one-to-one to sum.

```go
type Query struct {
  Timestamp int
  Account   string
  Source    string
}
```

Let's assume our database cannot add the serialized sum blobs. We're going to have to code this ourselves.

## The Go solution

Here's our first try at a solution, without an implementation of `fetch`.

```go
func add(a Sum, b Sum) {
  return Sum{
    PageImpressions: a.PageImpressions + b.PageImpressions,
    Clicks: a.Clicks + b.Clicks
  }
}

func fetch(query Query) Sum {
  // ...
}

func combine(queries []Query) Sum {
  var sum Sum
  for _, query := range queries {
    sum = add(sum, fetch(query))
  }
  return sum
}
```

This is really simple, but it is unperformant, as we run the database calls in serial. Let's try running things in parallel!

```go
func combine(queries []Query) Sum {
  var sum Sum

  var wg sync.WaitGroup
  sumsChan := make(chan Sum)

  // Fetch sum for each query
  for _, query := range queries {
    wg.Add(1)
    go func(query Query) {
      // Push to the sums channel
      sumsChan <- fetch(query)
      wg.Done()
    }(sum)
  }

  // Add the sums as they are fetched
  go func() {
    for sumEl := range sumsChan {
      sum = add(sum, sumEl)
    }
  }()

  // Wait for all of the wg to be done being fetched
  wg.Wait()
  close(sum)

  return sum
}
```

That's quite a bit more complicated, but still readable. However, what if we don't want to fire all of the database requests at once? We can use a struct token channel to do this, as follows:

```go
func combine(queries []Query) Sum {
  var sum Sum

  var wg sync.WaitGroup
  sumsChan := make(chan Sum)

  // Limit to 10 concurrent requests
  limiter := make(chan struct{}, 10)

  // Fetch sum for each query
  for _, query := range queries {
    wg.Add(1)
    go func(query Query) {
      // Rate limiting
      limiter <- struct{}{}

      // Push to the sums channel
      sumsChan <- fetch(query)

      wg.Done()
      <-limiter
    }(sum)
  }

  // Add the sums as they are fetched
  go func() {
    for sumEl := range sumsChan {
      sum = add(sum, sumEl)
    }
  }()

  // Wait for all of the wg to be done being fetched
  wg.Wait()
  close(sum)
  close(limiter)

  return sum
}
```

This is getting kind of long&#x2026; now, what if fetch returns an error?

```go
func fetch(query Query) (Sum, error) {
  // ...
}
```

We'll have to make quite a few changes to the code:

-   Create an error channel to send errors to
-   Somehow signal the goroutines to not proceed if an error has been encountered
-   Handle the error channel so the error can be returned
-   Close the error channel

Dammit, Go error handling!

This can easily cause our little `combine` function to be over 50 lines of code, which can quickly become an unreadable mess. Furthermore, if we do any of these steps wrong, we could run into bugs. My personal opinion: as a developer, I shouldn't have to worry about problems that have been solved countless times by other people, such as error handling on a parallelized function.

## The Scala solution

Before you read this section, keep in mind that Scala is a *very* complex language, and explaining the exact mechanism for everything that works here would be very lengthy and out of scope of this blog post.

First, we'll redefine a few methods.

```scala
def add(a: Sum, b: Sum): Sum = {
  Sum(
    pageImpressions = a.pageImpressions + b.pageImpressions,
    clicks = a.clicks + b.clicks
  )
}

def fetch(query: Query): Option[Sum] = ???
```

There's one big difference here: we're using an `Option[Sum]` rather than a `Sum`. An `Option[Sum]` can have two values: a `Some[Sum]`, which means that it contains a `Sum`, and a `None`, which means the `Option` is empty. This lets us not have to deal with nil values, which also allows for some very powerful abstractions in Scala.

Now behold: the functional way of doing things.

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.foldLeft(MatchSum(0, 0)) {
      case (acc, v) => v match {
        case Some(x) => acc + x
        case None => acc
      }
    }
  }
}
```

This code does all of the above. It:

-   handles errors naturally using Future's built-in error handling mechanism
-   limits concurrent requests to a predictable 10 using a thread pool implicitly used by the Future construct
-   adds all of the match sums, with the "+" being homologous to the "add" method in Go, and the "fold" being homologous to the for-loop and accumulator variable re-assigning.

The Scala is almost <span class="underline">one-fifth</span> the length of the Go code in number of lines. (The one difference in implementation is that we are storing all of the `Sum`s in memory before we add them together, but we will get to that later.)

We can still do better by borrowing a concept from abstract algebra: the monoid. A monoid is defined as a set with a binary function equipped with two properties: it possesses an identity element, and it is associative. Using the Cats library, we define a monoid as follows:

```scala
object SumMonoid extends Monoid[Sum] {

  // Our combine function
  def combine(a: Sum, b: Sum): Sum = a + b

  // The identity element
  def empty = Sum(0, 0)

}
```

Using the Monoid, the fold in the above function may be rewritten as so:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.foldLeft(SumMonoid.empty) {
      case (acc, v) => v match {
        case Some(x) => SumMonoid.combine(acc, x)
        case None => acc
      }
    }
  }
}
```

Furthermore, for every monoid of T, there exists a `Monoid[Option[T]]`, so we can write things like this:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.foldLeft(Monoid[Option[Sum]].empty) {
      case (acc, v) => Monoid[Option[Sum]].combine(acc, x)
    } match {
      case Some(x) => x
      case None => Monoid[Sum].empty
    }
  }
}
```

Or simply:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.foldLeft(Monoid[Option[Sum]].empty)(Monoid[Option[Sum]].combine) match {
      case Some(x) => x
      case None => Monoid[Sum].empty
    }
  }
}
```

It turns out, folding on a monoid is a common use case, and Cats gives us a Foldable trait that allows us to write `list.combineAll` to perform the fold.

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.combineAll match {
      case Some(x) => x
      case None => Monoid[Sum].empty
    }
  }
}
```

Unwrapping an Option[T] to a T, using the empty value of the monoid is also a common operation. Cats gives us the `.orEmpty` method for this.

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map { list =>
    list.combineAll.orEmpty
  }
}
```

Rewriting things yet again to use the `_` syntax, we can write this:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(q => fetch(q)))
  futures.map(_.combineAll.orEmpty)
}
```

Also, the `q => fetch(q)` can simply be written as `fetch`.

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = Future.sequence(queries.map(fetch))
  futures.map(_.combineAll.orEmpty)
}
```

Sequence is common to all `Traversable`s, so we can write things like this:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  val futures = queries.map(fetch).sequence
  futures.map(_.combineAll.orEmpty)
}
```

Or simply:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  queries.map(fetch).sequence.map(_.combineAll.orEmpty)
}
```

But wait: we're storing all of the `Sum`s in memory still! Fortunately, `Future` can also be treated as a `Monoid`, so like `Option`, we can fold over it. Thus, we can omit the `.sequence` and `.combineAll` it.

```scala
def sum(queries: List[Query]): Future[Sum] = {
  queries.map(fetch).map(_.combineAll.orEmpty)
}
```

With comments:

```scala
def sum(queries: List[Query]): Future[Sum] = {
  // Get a list of filters
  filters
    // Get the Sum of each Query
    .map(fetch)
    // Aggregate using the Sum monoid
    .map(_.combineAll.orEmpty)
}
```

We've now turned a 50 line function into a one-liner (sans the Monoid). Damn!

If you haven't been exposed to this kind of programming before, you may be thinking that the Scala one-liner is much harder to read than the Go. However, I argue that once you learn and fully understand the abstractions, the Scala code will be better tested, more concise, and easier to understand. In a future blog post, I will be discussing exactly why I believe this.
