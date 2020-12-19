---
title: Cheat Sheet
ordering: z10
---

## Basic Probability

### Demorgan's

$$
P((AB)^C) = P(A^C \cup B^C)
$$

### Inclusion/Exclusion

$$
P(A \cup B) = P(A) + P(B) - P(AB)
$$

### Conditional probability

$$
P(A | B) = \frac{P(A \cap B)}{P(B)}
$$

### Bayes Theorem

$$
P(A | B) = \frac{P(B | A)P(A)}{P(B)}
$$

## Approximation

Poisson approximation of binomial $(n, p)$: $\lambda = np$.

Normal $(\mu, \sigma)$ of binomial $(n, p)$: $\mu = np$, $\sigma^2 = np(1-p)$. Make sure you correct for continuity.

## Random Variables

### Expectation

- $E(X) = \sum\limits_{\text{all} x} xP(X = x)$
- $e(X + Y) = E(X) + E(Y)$ even if dependent
- $E(XY) = E(X)E(Y)$ only if independent
- $E(cX) = cE(X)$

**Markov's inequality** states that if $X \geq 0$, then $P(X \geq a) \leq E(X)/a$ for every $a > 0$. It can be used to find an upper bound if you don't have the standard deviation.

The tail sum formula for expectation is $E(X) = \sum\limits_{j=1}^n P(X \geq j)$.

Variance can be computed as $E(X^2) - E(X)^2$.

### Scaling

- $Var(aX + b) = a^2 Var(x)$
- $SD(aX + b) = |a|SD(x)$

**Chebychev's inequality** states that for any random variable $X$ and any $k > 0$, then $P[|X - E(X)| \geq kSD(X)] \leq 1/k^2$. That is, if a random variable differs from expected value by more than $k$ standard deviations is at most $1/k^2$.

Variances can be added like so:

- $Var(X + Y) = Var(X) + Var(Y)$ if $X$ and $Y$ are **independent**.
- $Var(X_1 + \ldots + X_n) = Var(X_1) + \ldots + Var(X_n)$ if $X_1, \ldots, X_n$ are **independent**.

The _square root law_ states that $SD(S_n) = SD(X_1)\sqrt{n}$ if $S_n$ is a sum of random variables $X_i$, and $SD(\bar{X_n}) = SD(X_1)/\sqrt{n}$ for some $\bar{X_n} = S_n/n$.

## Continuous distributions

Half life can be computed with $h = log(2)/\lambda$, where $\lambda$ is the rate of decay. This is derived from the exponential survival function, $P(T > t) = e^{-\lambda t}$.

The CDF (cumulative density function) is $F(x) = \int\limits_{-\infty}^x f(x) dx$.

### Change of variable

The expectation of a function of X is $E(Y) = \int\limits_{-\infty}^{\infty} g(x) f_X(x) dx$. You can use this to compute $E(Y)$ and $E(Y^2)$ (variance).

### One to One change of variable for densities

Let $X, Y$ be random variables. IF $Y = g(X)$, then the pdf $f_y$ is defined as

$$f_Y(y) = \frac{f_X(x)}{|dy/dx|}$$

where $y = g(x)$. This works for monotonically increasing/decreasing functions.

#### Many to one

$$f_Y(y) = \sum\limits_{x: g(x) = y} \frac{f_X(x)}{|dy/dx|}$$

where each $f_X(x)$ is monotone.

## Probability Distributions

### Binomial

- PMF: $\binom{n}{k} p^k (1-p)^{n-k}$
- Mean: $np$
- Variance: $np(1-p)$

### Poisson

- Probability: $\frac{e^{-\mu}\mu^k}{k!}$
- Mean: $\mu$
- Variance: $\mu$

### Geometric

- Probability: $(1 - p)^{k-1} p$ where $k = 1, 2, 3, \ldots$.
- Mean: $1/p$
- Variance: $\frac{1 - p}{p^2}$

### Exponential

- Density: $\lambda e^{-\lambda x}$
- CDF: $1 - e^{-\lambda x}$
- Mean: $1/\lambda$
- Variance: $1/\lambda^2$

### Uniform

- Density: $1/(b-a)$
- CDF: $(x-a)/(b-a)$
- Mean: $(a+b)/2$
- Variance: $\frac{(b-a)^2}{12}$

## Continuous Joint Distributions

### Joint Distribution Defined by a Density

#### Infinitesimal probability

$$
P(X \in dx, Y \in dy) = f(x, y)dx dy
$$

#### Probability of a set B

$$
P((X, Y) \in B) = \int \int\limits_B f(x, y)dx dy
$$

#### Constraints

A density needs to be equal to 1, so check that $f(x, y) \geq 0$ and

$$
\int\limits_{-\infty}^{\infty} \int\limits_{-\infty}^{\infty} f(x, y)dx dy = 1
$$

#### Marginals

$$
f_X(x) = \int\limits_{-\infty}^{\infty} f(x, y)dy
$$

$$
f_Y(y) = \int\limits_{-\infty}^{\infty} f(x, y)dx
$$

#### Independence

For all $x$ and $y$,

$$
f(x, y) = f_X(x)f_Y(y)
$$

#### Expectation of a function $g$ of $(X, Y)$

$$
E(g(X, Y)) = \int \int g(x, y)f(x, y)dx dy
$$

This only works if the integral converges absolutely.

## Independent normal variables

Given two normal distributions $N_1(\mu_1, \sigma_1^2)$, $N_2(\mu_2, \sigma_2^2)$, the sum of the distribution is $N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$.

## Discrete Conditioning

$$
E(g(y) \mid X = x) = \sum\limits_{\text{all } y}g(y)P(Y = y \mid X = x)
$$

## Continuous Conditioning

$$
f_X(x \mid Y = y) = \frac{f_Y(y \mid X = x)f_X(x)}{f_Y(y)}
$$

$$
P(Y \in B \mid X = x) = \int\limits_B f_Y(y \mid X = x)dy
$$

$$
P(B) = \int P(B \mid X = x)f_X(x)dx
$$

$$
f_Y(y) = \int f_Y(y \mid X = x)f_X(x)dx
$$

$$
E(Y) = \int E(Y \mid X = x)f_X(x)dx
$$
