---
title: Reduction of Order
ordering: a70
---

If we already have one solution $y_1(t)$ of an equation of the form:

$$
p(t)y'' + q(t)y' + r(t)y = 0
$$

we can find another solution of the form:

$$
y_2(t) = v(t)y_1(t)
$$

for some $v(t)$ using _reduction of order_.

To do this, we follow these steps:

1. Define $y_2(t) := v(t)y_1(t)$
2. Derive this as many times as necessary (in the case of this type of problem, twice) to get your needed derivatives
3. Plug these back into the original equation
4. You should end up with an equation of $v''(t)$ and $v'(t)$. Substitute $u(t) = v'(t)$ and solve your first order equation for $u(t)$.
5. Substitute back into your equation for $y_2(t)$ to get your solution.

## Example 1

$$
t^2y'' - 6ty' + 10y = 0; y_1(t) = t^2 \text{is a solution.}
$$

Let $y_2(t) := t^2v(t)$, so $y_2'(t) = t^2v'(t) + 2tv(t)$ and $y_2''(t) = t^2v''(t) + 2v(t) + 4tv'(t)$.

We plug this into our original equation to get

$$
t^4v''(t) - 2t^3v'(t) = 0
$$

Let $u := v'$, $u' = v''$. So

$$
t^4u'(t) - 2t^3u(t) = 0
$$

thus we get $u(t) = t^2$.

So $v = \int u dt = t^3/3$ and $y_2 = t^2 * t^3/3 = t^5/3$.

Note that since we can take any linear combination of $y_2$ as a valid solution, we can say $y_2 = t^5$ is a solution.
