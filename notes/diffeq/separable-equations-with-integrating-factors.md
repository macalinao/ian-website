---
title: Separable Equations With Integrating Factors
ordering: a15
---

The integrating factor of an equation of the form

$$
y' + h(t)y = g(t)
$$

is just

$$
\mu(t) = e^{\int h(t)dt}
$$

so that

$$
y'\mu(t) + \mu(t)h(t)y = \mu(t)g(t)
$$

is just

$$
(y\mu(t))' = \mu(t)g(t)
$$

which is just a separable equation.

## Example 1

$$
y' + (5/t)y = 3/t^3
$$

Our integrating factor is $\mu = e^{\int 5/t dt} = t^5$, so we get that

$$
(yt^5)' = (3/t^3)*t^5
$$

so

$$
\int(yt^5)'dy = \int(3/t^3)*t^5 dt
$$

thus

$$
yt^5 = \int 3t^2 dt = t^3 + c
$$

so we get that

$$
y = \frac{1}{t^2} + \frac{c}{t^5}
$$
