---
title: Orbits
ordering: c22
---

The *orbits* of a a system of differential equations $x = x(t)$, $y = y(t)$, is the curve on the x-y plane. Solve for it by arranging your system of equations such that you only have $x$ and $y$ as variables.

### Example 1

Find the orbit of the following system of equations:

$$
\begin{align}
  x(t) &= 1 + t \\
  y(t) &= \cos t^2
\end{align}
$$

To do this, *solve for $t$* in $x(t)$ and $y(t)$ like so:

$$
\begin{align}
  t &= x(t) - 1 \\
  t &= \sqrt{\cos^{-1}(y(t))}
\end{align}
$$

Next, equate them to each other like so:

$$
x(t) - 1 = \sqrt{\cos^{-1}(y(t))}
$$

This is an implicit solution. To clean up our variables, let's solve for $y(t)$:

$$
y(t) = \cos (x(t) - 1)^2
$$

### Example 2

Find the orbit of the following system of equations:

$$
\begin{align}
  x' &= y \\
  y' &= -x
\end{align}
$$

We need to get rid of the derivatives here to create a function of $x$ and $y$.

$$
\begin{align}
  \frac{y'}{x'} = \frac{dy}{dx} &= \frac{-x}{y} \\
  y dy &= -x dx \\
  \frac{y^2}{2} + c_1 &= \frac{-x^2}{2} + c_2 \\
  x^2 + y^2 = c
\end{align}
$$

Thus our solution is $x^2 + y^2 = c$ for arbitrary $c$.

### Example 3

Find the orbits of the following system of equations:

$$
\begin{align}
  x' &= y(1 + x + y) \\
  y' &= -x(1 + x + y)
\end{align}
$$

This is very similar to our previous problem, except that when $1 + x + y = 0$ we have an orbit. Thus the orbits are $x^2 + y^2 = c$ for all $c$ and points where $1 + x + y = 0$.
