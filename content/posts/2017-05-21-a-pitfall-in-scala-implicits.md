---
title: A Pitfall in Scala Implicits
---

Consider the following code:

```scala
import cats._

case class MyClass(a: Int)

object Main {
  implicit val myMonoid = Monoid[MyClass]

  def main(args: Array[String]): Unit = {
    println(myMonoid)
  }
}
```

For those unfamiliar with Cats/Scalaz, `Monoid` is a simulacrum-generated typeclass, so its `apply` method simply resolves the implicit in scope. It looks something like this:

```scala
object Monoid {
  def apply[T](implicit m: Monoid[T]): Monoid[T] = m
  // ...
}
```

This code will not compile because the `Monoid` cannot be implicitly resolved. However:

```scala
import cats._

case class MyClass(a: Int)

object Main {
  implicit val myMonoid: Monoid[MyClass] = Monoid[MyClass]

  def main(args: Array[String]): Unit = {
    println(myMonoid)
  }
}
```

This will compile and print `null`. It resolves the implicit using the default empty `null` value!

Be careful when exporting implicits in your objects.
