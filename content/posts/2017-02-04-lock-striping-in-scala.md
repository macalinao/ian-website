---
title: Lock Striping in Scala
---

Let's say you have a set of keys, and you want to lock on a per-key level. A naive solution could look like this:

```scala
class LockManager[K] {

  private[this] val logger = getLogger

  val locks: Atomic[Map[K, Lock]] = Atomic(Map[K, Lock]())

  def run[T](key: K)(fn: => T): T = {
    locks.getAndTransform { locksMap =>
      locksMap.get(key) match {
        case Some(lock) => {
          lock.lock()
          locksMap
        }
        case None => locksMap + (key -> new ReentrantLock())
      }
    }
    try {
      fn
    } finally {
      locks.getAndTransform { locksMap =>
        locksMap.get(key) match {
          case Some(lock) => {
            lock.unlock()
            locksMap - key
          }
          case None => {
            logger.warn(s"Lock for ${key} suspiciously missing")
            locksMap  // wtf?? this shoudnt happen
          }
        }
      }
    }
  }

}
```

However, there's quite a few things wrong with this:

- It has the potential to use a LOT of memory. (if we have high key cardinality)
- We need to lock BOTH the map AND the key lock. (If we had mutability a la `ConcurrentHashMap`, we could get around this, but that'd be un-Scala-like.)
- We keep creating keys and destroying keys. If we didn't destroy keys and keys weren't often reused, we'd OOM.
- Code is inevitably messy due to all of the above.

The thing is, we usually don't _need_ all resources to be accessible simultaneously. People rarely do. Thus, we can create a locking system using the mod of a hash, similar to a hash table, where each "bucket" is simply a lock. This is also known as **lock striping**.

With this strategy in mind, we can rewrite the above class like so:

```scala
class LockManager[K](power: Int) {

  private[this] val logger = getLogger

  val locks: Vector[Lock] = Vector.fill[Lock](1 << power)(new ReentrantLock())
  val modMask = locks.length - 1

  def get(key: K): Lock = {
    locks(key.hashCode() & modMask)
  }

  def run[T](key: K)(fn: => T): T = {
    get(key).lock()
    try {
      fn
    } finally {
      get(key).unlock()
    }
  }

}
```

Note that we've fixed quite a few problems:

- We are fixed to a known amount of memory.
- We don't need to lock the list of locks, as we're only performing reads. (Also Scala enforces immutability on `Vector`, yay!)
- We can "get" a lock, since locks are never deleted.
- We allocate all of the locks upfront, so GC can't screw us over. This also hugely simplifies our code.

The only downside to this is that each lock could possess multiple keys, though you can probably tweak the numbers to find something with a good balance of throughput and memory usage.

### Further reading

- [A good StackOverflow post](http://stackoverflow.com/questions/8354758/designing-a-key-based-lock-or-lock-map)
- [Guava's implementation](http://google.github.io/guava/releases/21.0/api/docs/com/google/common/util/concurrent/Striped.html)
