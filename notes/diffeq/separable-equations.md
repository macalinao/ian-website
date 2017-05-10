---
title: Separable Equations
ordering: a10
---

Inarguably the easiest differential equations are separable equations, because we already know how to do them from calculus.

This is when you have an equation of the form

$$
a(t)dt = b(y)dy
$$

To solve this, simply integrate both sides to get an equation of $y$ and $t$.

## Example 1

$$
(t^2 + 4)dy/dt = e^{2y}; y(0) = 1
$$

First, separate the equation to get

$$
\frac{dt}{t^2 + 4} = \frac{dy}{e^{2y}}
$$

Integrating both sides, we get

$$
-\frac{1}{2e^{2y}} = \frac{1}{4}tan^{-1}(t/2) + c
$$

This is an *implicit* solution, as we have removed all terms that are not of $y$ or $t$.
