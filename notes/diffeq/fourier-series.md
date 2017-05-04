---
title: Fourier Series
date: 2017-04-29
ordering: 5
---

The basic premise behind the [Fourier series](https://en.wikipedia.org/wiki/Fourier_series) is that any periodic function can be decomposed into the sum of sine and cosine waves.

The Fourier series expansion of a function $f(x)$ over an interval $[-l, l]$ can be computed using the following:

$$
\begin{align}
  a_n &= \frac{1}{l} \int\limits_{-l}^l f(x)\cos(\frac{n\pi x}{l}) dx \text{, for $n \geq 0$} \\
  b_n &= \frac{1}{l} \int\limits_{-l}^l f(x)\sin(\frac{n\pi x}{l}) dx \text{, for $n \geq 1$} \\
  f(x) &= \frac{a_0}{2} + \sum\limits_{n = 1}^{\infty}\big[ a_n \cos\frac{n\pi x}{l} + b_n \sin\frac{n\pi x}{l} \big]
\end{align}
$$

Notice that since $\cos$ is an even function, we will only use this if the original function is an even function. Similarly, since $\sin$ is an odd function, $b_n$ is non-zero only if $f(x)$ is odd.

We can also evaluate half of the integral and multiply it by two, since $\cos$ is even and $\sin$ is odd.

### Example

Find the Fourier series expansion of the following function:

$$
f(x) = \begin{cases}
  -1 &\text{if $-1 \leq x < 0$} \\
  1  &\text{if $0 \leq x \leq 1$}
\end{cases}; |x| \leq 1
$$

Notice that this function is odd, so we know we it is a sum of sines. Thus we only need to compute $b_n$ like so:

$$
\begin{align}
  b_n = 2\int\limits_0^1 \sin(n\pi x)dx &= 2(\frac{-\cos(n\pi x)}{n\pi} \rvert_0^1) \\
  &= 2(\frac{-(-1)^n}{n \pi} + \frac{1}{n\pi}) = \frac{1 - (-1)^n}{n\pi}
\end{align}
$$

Now we plug things into the big formula:

$$
\begin{align}
f(x) &= \sum\limits_{n=1}^{\infty} \frac{2(1 - (-1)^n)\sin(n\pi x)}{n\pi} \\
  &= \frac{4}{\pi} \sum\limits_{n=1}^{\infty} \frac{\sin(n\pi x)}{n\pi}
\end{align}
$$
