---
title: Cheat Sheet
ordering: z10
---

## Random Variables

### Expectation
* $E(X) = \sum\limits_{\text{all} x} xP(X = x)$
* $e(X + Y) = E(X) + E(Y)$ even if dependent
* $E(XY) = E(X)E(Y)$ only if independent
* $E(cX) = cE(X)$

**Markov's inequality** states that if $X \geq 0$, then $P(X \geq a) \leq E(X)/a$ for every $a > 0$. It can be used to find an upper bound if you don't have the standard deviation.

The tail sum formula for expectation is $E(X) = \sum\limits_{j=1}^n P(X \geq j)$.

Variance can be computed as $E(X^2) - E(X)^2$.

### Scaling
* $Var(aX + b) = a^2 Var(x)$
* $SD(aX + b) = |a|SD(x)$

**Chebychev's inequality** states that for any random variable $X$ and any $k > 0$, then $P[|X - E(X)| \geq kSD(X)] \leq 1/k^2$. That is, if a random variable differs from expected value by more than $k$ standard deviations is at most $1/k^2$.

Variances can be added like so:

* $Var(X + Y) = Var(X) + Var(Y)$ if $X$ and $Y$ are **independent**.
* $Var(X_1 + \ldots + X_n) = Var(X_1) + \ldots + Var(X_n)$ if $X_1, \ldots, X_n$ are **independent**.

The *square root law* states that $SD(S_n) = SD(X_1)\sqrt{n}$ if $S_n$ is a sum of random variables $X_i$, and $SD(\bar{X_n}) = SD(X_1)/\sqrt{n}$ for some $\bar{X_n} = S_n/n$.

## Continuous distributions

Half life can be computed with $h = log(2)/\lambda$, where $\lambda$ is the rate of decay. This is derived from the exponential survival function, $P(T > t) = e^{-\lambda t}$.

The CDF (cumulative density function) is $F(x) = \int\limits_{-\infty}^x f(x) dx$.

### Change of variable

The expectation of a function of X is $E(Y) = \int\limits_{-\infty}^{\infty} g(x) f_X(x) dx$. You can use this to compute $E(Y)$ and $E(Y^2)$ (variance).

### One to One change of variable for densities

Let $X, Y$ be random variables. IF $Y = g(X)$, then the pdf $f_y$ is defined as

$$f_Y(y) = \frac{f_X(x)}{|dy/dx|}$$

where $y = g(x)$.

## Probability Distributions

### Binomial
* PMF: $\binom{n}{k} p^k (1-p)^{n-k}$
* Mean: $np$
* Variance: $np(1-p)$

### Poisson
* Probability: $\frac{e^{-\mu}\mu^k}{k!}$
* Mean: $\mu$
* Variance: $\mu$

### Geometric
* Probability: $(1 - p)^{k-1} p$ where $k = 1, 2, 3, \ldots$.
* Mean: $1/p$
* Variance: $\frac{1 - p}{p^2}$

### Exponential
* Density: $\lambda e^{-\lambda x}$
* CDF: $1 - e^{-\lambda x}$
* Mean: $1/\lambda$
* Variance: $1/\lambda^2$

### Uniform
* Density: $1/(b-a)$
* CDF: $(x-a)/(b-a)$
* Mean: $(a+b)/2$
* Variance: $\frac{(b-a)^2}{12}$
