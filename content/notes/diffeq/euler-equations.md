---
title: Euler Equations
ordering: a95
---

The Euler method says we guess $y = (t - 1)^n$ as the form of our solution.

## Example 1

Find the general solution for the following differential equation:

$$
(t - 1)^2y'' - 2(t-1)y' + 2y = 0
$$

We guess:

$$
\begin{align}
y &= (t - 1)^r \\
y' &= r(t - 1)^{r - 1} \\
y'' &= (r-1)r(t-1)^{r-2}
\end{align}
$$

so plugging this in, we get

$$
\begin{align}
(t-1)^2(t-1)^{r-2}(r-1)r &- 2(t-1)r(t-1)^{r-1} + 2(t-1)^r \\
&= (t-1)^r((r-1)r - 2(r-1) + 2) \\
&= r^2 - r - 2r + r + 2 \\
&= r^2 - 2r + 2 = (r - 2)(r - 1)
\end{align}
$$

so our roots are $r = 1, 2$, and our solution is

$$
y = c_1(t - 1) + c_2(t-1)^2
$$

## Example 2

$$
t^2y'' - ty' + y = 0
$$

We guess:

$$
\begin{align}
y &= (t - 1)^r \\
y' &= r(t - 1)^{r - 1} \\
y'' &= (r-1)r(t-1)^{r-2}
\end{align}
$$

so we get

$$
(r-1)rt^r - rt^r + t^r = 0
$$

so

$$
(r-1)r - r + 1 = 0
$$

thus

$$
r^2 - 2r + 1 = (r-1)^2
$$

so one solution $y_1 = c_1t$.

Since we have a repeated root, we solve for a second $y_2 = \phi(t)y_1(t)$.

$$
\begin{align}
y &= \phi t \\
y' &= \phi' t + \phi \\
y'' &= \phi''t + 2\phi
\end{align}
$$

Plugging things in, we get

$$
\begin{align}
t^3\phi'' + 2t^2\phi' &- \phi't^2 - \phi t + \phi t \\
&= t\phi'' + \phi' = 0
\end{align}
$$

With reduction of order, we have $\phi' = \lambda$, so:

$$
\lambda' = \lambda/t = 0
$$

$$
(\lambda t)' = 0 \Rightarrow \lambda t = c
$$

so we find that $\phi = c \ln|t|$.

Plugging this into the original equation, we find that $y_2 = ct\ln|t|$, so

$$
y = c_1t + c_2t\ln|t|
$$
