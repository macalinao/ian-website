---
title: The Heat Equation
date: 2017-04-29
ordering: c60
incomplete: true
---

The heat equation is of the form:

$$
\frac{\partial u}{\partial t} = \alpha^2 \frac{\partial^2 u}{\partial x^2}
$$

where $\alpha^2$ is the heat coefficient. To solve for $u(x, t)$ where the ends are fixed at $u(0, t) = u(L, t) = 0$, use the following formulae:

$$
B_n = \frac{2}{L}\int\limits_0^L f(x) \sin(\frac{n\pi x}{L}) dx \hspace{1cm} n = 1, 2, 3, \ldots
$$

$$
u(x, t) = \sum\limits_{n = 1}^{\infty} B_n \sin(\frac{n\pi x}{L}) e^{-(\frac{\alpha n\pi}{L})^2}
$$

Furthermore, whenever your boundary values make the derivative zero at your endpoints, i.e. you have insulated ends, then you would use cosines like so:

$$
A_n = \frac{2}{L}\int\limits_0^L f(x) \cos(\frac{n\pi x}{L}) dx \hspace{1cm} n = 1, 2, 3, \ldots
$$

$$
u(x, t) = \frac{A_0}{2} + \sum\limits_{n = 1}^{\infty} A_n \cos(\frac{n\pi x}{L}) e^{-(\frac{\alpha n\pi}{L})^2}
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
u(x, t) = \sum\limits_{n = 1}^{\infty} \frac{2}{10}
$$

### Example 2

The ends $x = 0$ and $x = 2$ of a thin copper bar $\alpha^2 = 1.14$ are immersed in $0\deg$ water and is otherwise insulated. Find $u(x, t)$ if

$$
u(x, 0) = \begin{cases}
1 &\text{if $0 \leq x \leq 1$} \\
0 &\text{if 1 < x < 2}
\end{cases}
$$

We use the $\sin$ version of the heat equation since both ends are fixed at 0.

Recall

$$
B_n = \frac{2}{L}\int\limits_0^L f(x) \sin(\frac{n\pi x}{L}) dx \hspace{1cm} n = 1, 2, 3, \ldots
$$
