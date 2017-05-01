---
title: Separation of Variables (Partial Differential Equations)
date: 2017-04-29
ordering: 4
---

Now we will solve a PDE using separation of variables.

### Example

$$
\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2} + u
$$

$$
u(x, 0) = 3 \sin 2\pi x - 7 \sin 4 \pi x \text{ where $0 < x < 10$}
$$

$$
u(0, t) = u(10, t) = 0
$$

First, define $u(x, t) = T(t)X(x)$. Replacing this into our original equation, we get the following equation:

$$
T'(t)X(x) = T(t)X''(x) + T(t)X(x)
$$

With some algebra, we get the following separation:

$$
\frac{T'(t)}{T(t)} = \frac{X''(x) + X(x)}{X(x)} = -\lambda
$$

First, let's solve $\frac{X''(x) + X(x)}{X(x)} = -\lambda$ for $\lambda$ since we have the (initial) boundary conditions $X(0) = X(10) = 0$.

We find that $x'' + x = -\lambda x$, so the characteristic equation is $r^2 + 1 = -\lambda$; that is, $r^2 = -\lambda - 1$. So $r = \pm \sqrt{-\lambda - 1}$. Factoring out an $i$, we get $r = \pm i\sqrt{\lambda + 1}$.

Using Euler's formula, we have the following:

$$
X(x) = c_1 \cos(\sqrt{\lambda + 1}x) + c_2 \sin(\sqrt{\lambda + 1}x)
$$

Plugging in our initial condition $X(0) = 0$, we get:

$$
X(0) = 0 = c_1 \cos(\sqrt{\lambda + 1} * 0) + c_2 \sin(\sqrt{\lambda + 1} * 0)
$$

Thus $c_1 = 0$ since $\cos(0) = 1$ and $\sin(0) = 0$. With our second initial condition $X(10) = 0$, we get:

$$
X(10) = 0 = c_2 \sin(\sqrt{\lambda + 1} * 10)
$$

$$
\begin{align}
  10\sqrt{\lambda + 1} &= n\pi \\
  \lambda + 1 &= \frac{n^2 \pi^2}{100} \\
  \lambda &= \frac{n^2 \pi^2}{100} - 1
\end{align}
$$

thus we have solved for our eigenvalue. Our eigenfunction just involves plugging this back into the original equation, so

$$
X(x) = c_2 \sin(\sqrt{\frac{n^2 \pi^2}{100}} * x) = c_2 \sin(n\pi x / 10)
$$

Next, let's solve for $T(t)$.

$$
\frac{T'(t)}{T(t)} = -\lambda
$$

This is pretty easy to solve: $T(t) = ce^{-\lambda t} = ce^{(1 - \frac{n^2 \pi^2}{100})t}$.

Finally, let's combine the functions together:

$$
u_n(x, t) = csin(n\pi x)e^{(\frac{-n^2 \pi^2}{100} - 1)t}
$$

Thus, given $u(x, 0)$ we get that $c_1 = 3$, $n_1 = 20$, $c_2 = -7$, and $n_2 = 40$, so:

$$
u(x, t) = 3\sin(2\pi x)e^{(1 - 4\pi^2)t} - 7\sin(4\pi x)e^{(1 - 16\pi^2)t}
$$
