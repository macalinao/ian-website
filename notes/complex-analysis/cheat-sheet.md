---
title: Cheat Sheet
---

## Basics

$$z = x + iy$$
$$\bar{z} = x - iy$$

Modulus: $|z| = \sqrt{x^2 + y^2} = \sqrt{z\bar{z}}$

$$z = |z|e^{i\theta}$$

where

$$\theta = arg(z)$$

Two derivatives:

$$\frac{\partial}{\partial z} = \frac{1}{2}(\frac{\partial}{\partial x} - i\frac{\partial}{\partial y})$$

$$\frac{\partial}{\partial \bar{z}} = \frac{1}{2}(\frac{\partial}{\partial x} + i\frac{\partial}{\partial y})$$

Product: $\frac{\partial}{\partial z} \frac{\partial}{\partial \bar{z}} = \frac{1}{4}(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}) = \frac{1}{4}\Delta$

Every analytic function is harmonic.

$$f \text{analytic} \iff \frac{\partial f}{\partial \bar{z}} = 0$$

For complex numbers all arithmetic goes through as we would expect.

For complex-valued functions of a real variable, differential and integration are linear operations with the same properties as for a real-valued function.

$$
z^\alpha = e^{\alpha \log z}
$$

### Laplace's Equation

$$\phi_{xx}(x, y) + \phi_{yy}(x, y) = 0$$

Solutions of Laplace's equation are called harmonic functions; they are all analytic within the domain where the equation is satisfied.

### Integration

Two functions: $w_1(t), w_2(t)$ where $w_a(t) = u_a(t) + iv_a(t)$.

$$\int\limits_a^b w(t)dt = \int\limits_a^b u(t) dt + i\int\limits_a^b v(t)dt$$

### Mod of integral

Simple estimate:

$$
\begin{align}
\lvert\int\limits_a^b w(t)dt\rvert &= (\int\limits_a^b w(t)dt)e^{-i\theta} \\
&= \int\limits_a^b (e^{-i\theta} w(t))dt \\
&= \int\limits_a^b Re(e^{-i\theta} w(t))dt + i\int\limits_a^b Im(e^{-i\theta} w(t))dt \\
&= \int\limits_a^b Re(e^{-i\theta} w(t))dt \\
&\leq \int\limits_a^b |e^{-i\theta} w(t)|dt = \int\limits_a^b |w(t)|dt \\
\end{align}
$$

### Cauchy-Riemann Equations

Conditions on which a function is differentiable.

$$
\begin{align}
\frac{\partial u}{\partial x} &= \frac{\partial v}{\partial y} \\
\frac{\partial u}{\partial y} &= -\frac{\partial v}{\partial x}
\end{align}
$$

### Limits

What does limit mean?

Convergence of sequences. Limits that go to zero.

$\{z_n\}$ sequence of points, $z_n \to w$. Show that $|z_n - w| < \delta$ for all $n > N$.

Note that $\lim(z_n + w_n) = \lim z_n + \lim w_n$
