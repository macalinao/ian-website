---
title: Exact Equations
ordering: a20
incomplete: true
---

Exact equations are of the following form:

$$
M(x, t)dt + N(x, t)dx = 0
$$

where

$$
\frac{\partial M}{\partial x} = \frac{\partial N}{\partial t}
$$

To solve this for a solution $F(x, t)$, perform the following steps:

1. Solve $\int \partial F = \int M \partial t$ for $F$.
2. Set your constant to a function $f(t)$.
3. Find $\partial F/\partial t$ and equate this to $\frac{\partial N}{\partial t}$.
4. Solve for $f'(t)$.
5. Integrate $f'(t)$ with respect to $t$ to get $f(t)$.
6. Substitute $f(t)$ from step 2 with this result to find your solution $F(x, t)$.
