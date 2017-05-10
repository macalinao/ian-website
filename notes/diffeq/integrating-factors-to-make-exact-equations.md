---
title: Integrating Factors to Make Exact Equations
ordering: a30
incomplete: true
---

Let's say we have an equation of the following form:

$$
M(x, t)dx + N(x, t)dt = 0
$$

that is not exact; that is,

$$
\frac{\partial M}{\partial t} \not = \frac{\partial N}{\partial x}
$$

To solve this, we look for a function $\mu(x, t)$ called an *integrating factor* such that

$$
u(x, t)M(x, t)dx + u(x, t)N(x, t)dt = 0
$$

becomes an exact equation.

Not all equations of this form can be made exact. We have two cases:

#### Case 1

$$
u(x, t) = \frac{\frac{\partial M}{\partial t} - \frac{\partial N}{\partial x}}{N}
$$

becomes an integrating factor if $u(x, t)$ is solely a function of $x$, so

$$
u(x) = exp(\int \frac{\frac{\partial M}{\partial t} - \frac{\partial N}{\partial x}}{N} dx)
$$

#### Case 2

$$
u(x, t) = \frac{\frac{\partial M}{\partial t} - \frac{\partial N}{\partial x}}{-M}
$$

becomes an integrating factor if $u(x, t)$ is solely a function of $t$, so

$$
u(t) = exp(\int \frac{\frac{\partial M}{\partial t} - \frac{\partial N}{\partial x}}{-M} dt)
$$

## Example 1

$$
(1 + 4t)\sin y + (t \cos y)y' = 0
$$

First, let

$$
\begin{align}
M &= (1 + 4t)\sin y \\
N &= (t \cos y)
\end{align}
$$

So we get that

$$
\frac{\partial M}{\partial y} = (1 + 4t)\cos y
$$

and

$$
\frac{\partial N}{\partial t} = \cos y
$$

Since these are unequal, we must compute an integrating factor.

Notice that 

$$
\frac{\frac{\partial M}{\partial y} - \frac{\partial N}{\partial t}}{N} = 4
$$

so our integrating factor is $e^{4t}$.

## Example 2

Find the particular solution to

$$
y^3 +(3y^2 \sin t \cos t)y' = 0
$$

satisfying $y(\pi/4) = 8$.

Let $M = y^3$ and $N = 3y^2\sin t \cos t$, so

$$
\frac{\partial M}{\partial y} = 3y^2
$$

and

$$
\frac{\partial N}{\partial t} = 3y^2(cos^2 t - sin^2 t)
$$

so we see that

$$
\frac{\frac{\partial M}{\partial y} - \frac{\partial N}{\partial t}}{N} = 2\tan t
$$

and the integrating factor is

$$
e^{\int 2 \tan t dt} = e^{-2 \ln|\cos t| + c} = c|\cos t|
$$
