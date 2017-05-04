---
title: The Heat Equation
date: 2017-04-29
ordering: c60
---

The heat equation is of the form:

$$
\frac{\partial u}{\partial t} = k \frac{\partial^2 u}{\partial x^2}
$$

where $k$ is the heat coefficient. To solve for $u(x, t)$, use the following formulae:

$$
B_n = \frac{2}{L}\int\limits_0^L f(x) \sin(\frac{n\pi x}{L}) dx \hspace{1cm} n = 1, 2, 3, \ldots
$$

$$
u(x, t) = \sum\limits_{n = 1}^{\infty} B_n \sin(\frac{n\pi x}{L}) e^{-k(\frac{n\pi}{L})^2}
$$

These are derived using techniques from earlier sections.

### Example

The ends $x = 0$ and $x = 10$ of an aluminum bar ($k = 0.86$) are kept at 0\deg C, while the surface of the bar is kept insulated. Find an expression for the temperature $u(x, t)$ with the following initial conditions:

$$
u(x, 0) = 70, \hspace{1cm} 0 < x < 10
$$

Notice that the length $L$ of the bar is 10, so

$$
B_n = \frac{2}{10} \int\limits_0^{10} 70 \sin(\frac{n\pi x}{10}) dx
$$

thus $u(x, t)$:

$$
u(x, t) = \sum\limits_{n = 1}{\infty} \frac{2}{10}
$$
