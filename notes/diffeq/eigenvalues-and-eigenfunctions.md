---
title: Boundary Value Problems
ordering: c30
---

To find the eigenvalues and eigenfunctions of a boundary value problem, we must consider three cases: $\lambda = 0$, $\lambda > 0$, and $\lambda < 0$. For each of these cases, we find the eigenfunction using the initial values, then we find the eigenvalues using the result.

### Example

Find the eigenvalues and eigenfunctions of the following boundary value problem:

$$
y'' - \lambda y = 0 \hspace{1cm} y'(0) = 0 \hspace{1cm} y'(l) = 0
$$

#### Case $\lambda < 0$

First, let us consider the case of $\lambda < 0$. We can solve the differential equation using its characteristic equation $r^2 - \lambda = 0$ to get $r = \pm \sqrt{\lambda}$, which results in $r = \pm i\sqrt{-\lambda}$.

With this, we construct the following function:

$$
y(t) = c_1 \cos(t\sqrt{-\lambda}) + c_2 \sin(t\sqrt{-\lambda})
$$

Taking the derivative of this, we get:

$$
y'(t) = -c_1\sin(t\sqrt{-\lambda})\sqrt{-\lambda} + c_2\cos(t\sqrt{-\lambda})\sqrt{-\lambda}
$$

Using the initial value of $y'(0) = 0$, we see that since $\cos(0) = 1$, $c_2$ must equal $0$ for this to be possible.

Using this, we now have the following equation:

$$
y'(t) = -c_1\sin(t\sqrt{-\lambda})\sqrt{-\lambda}
$$

Plugging in $l$, we get that

$$
y'(l) = -c_1\sin(l\sqrt{-\lambda})\sqrt{-\lambda} = 0
$$

Since $c_1 = 0$ is trivial, we will solve for $\sin(l\sqrt{-\lambda}) = 0$ to find that $\lambda = -\frac{n^2 \pi^2}{l^2}$. Plugging this back into our original equation $y(t)$, we get that:

$$
y(t) = c \cos(\frac{tn\pi}{l})
$$

where $c$ is an arbitrary constant.

#### Case $\lambda = 0$

If $\lambda = 0$, our equation is of the form $y = c_1 x + c_2$, so $y' = c_1$. Since $y' = 0$, we see that $c_1 = 0$. Plugging this back in, we now see that $y = c_2$, which is perfectly valid since this allows $y'(l) = 0$ for all $l$.

#### Case $\lambda > 0$

In this case, we cannot extract an $i$ from the $\sqrt{lambda}$, so we end up getting trivial solutions.
