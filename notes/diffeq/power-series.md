---
title: Power Series
ordering: a80
---

The power series technique assumes that your solution is of the following form:

$$
y = \sum\limits_{n=0}^{\infty}a_nt^n
$$

thus for higher derivatives, we get:

$$
y' = \sum\limits_{n=1}^{\infty}na_nt^{n-1} \\
y'' = \sum\limits_{n=2}^{\infty}(n-1)na_nt^{n-2}
$$

Solving the power series involves three steps:

1. Find the initial terms given an initial value
2. Solve for the resulting recurrence
3. Plug the found $a_n$ coefficients into the power series equation

### Example 1

Using a power series, solve for the recurrence relation and the first four nonzero terms of the soution for the following initial value problem:

$$
y'' + (t^3 + t^2)y' + 2ty = 0; y(0) = 2; y'(0) = 3
$$

First, since $y(0) = 2$, we know that the solution is of the form $\sum\limits_{n=0}^{\infty}a_nt^n$, then $a_0 = 2$.

Since $y'(0) = 3$, we also see that $a_1 = 3$ since

$$
y' = \sum\limits_{n=1}^{\infty}na_nt^{n-1}
$$

Now, let's build our power series:

$$
\sum\limits_{n=2}^{\infty} n(n-1)a_n t^{n-2} + \sum\limits_{n=1}^{\infty} na_nt^{n-1}(t^3 + t^2) + \sum\limits_{n=0}^{\infty} 2ta_nt^n \\
= \\
\sum\limits_{n=2}^{\infty} n(n-1)a_n t^{n-2} + \sum\limits_{n=1}^{\infty} na_nt^{n+2} + \sum\limits_{n=1}^{\infty} na_nt^{n+1} + \sum\limits_{n=0}^{\infty} 2a_nt^{n+1} \\
= \\
\sum\limits_{m=0}^{\infty} (m + 2)(m+1)a_{m+2} t^m + \sum\limits_{m=3}^{\infty} (m-2)a_{m-2}t^m + \sum\limits_{m=2}^{\infty} (m-1)a_{m-1}t^m + \sum\limits_{m=1}^{\infty} 2a_{m-1}t^m \\
= \\
2a_2 + 6a_3t^2 + 12a_4t^3 + 3a_2t^2 + 2a_0t + 2a_1t^2 + \\
\sum\limits_{m=3}^{\infty}t^m((m+2)(m+1)a_{m+2} + (m-2)a_{m-2} + (m-1)a_{m-1} +2a_{m-1})
$$

We then solve for $a_{m+2}$:

$$
(m+2)(m+1)a_{m+2} + (m-2)a_{m-2} + (m-1)a_{m-1} + 2a_{m-1} = 0
$$

Simplifying things, we get the following recurrence relation:

$$
a_{m+2} = \frac{-((m-2)a_{m-2} + (m-1)a_{m-1} + 2a_{m-1})}{(m+2)(m+1)}
$$

and our first few terms:

$$
a_0 = 2 \\
a_1 = 3 \\
a_2 = 0 \\
a_3 = -2/3 \\
a_4 = -3/4
$$

thus we get the following solution:

$$
y(t) = 2 + 3t - \frac{2}{3}t^3 - \frac{3}{4}t^4 + \ldots
$$
