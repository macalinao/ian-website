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
