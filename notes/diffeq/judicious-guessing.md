---
title: Judicious Guessing
ordering: a50
incomplete: true
---

Judicious guessing can be used to guess for a solution.

First, solve the homogenous case, then solve the particular case, then add them together. This is clearer in the below example.

## Example 1

$$
y'' + y' - 20y = 10t
$$

First, $r^2 + r - 20 = 0$, so $(r - 4)(r + 5) = 0$ and $r = -5, 4$.

Thus our homogenous solution is

$$
y_h = c_1e^{-5t} + c_2e^{4t}
$$

Let's guess our solution is of the form $At + B$, since it would be a linear combination of derivatives of $10t$.

Plugging things back into the original equation, we get

$$
(At + B)'' + (At + B)' - 20(At + B) = A - 20At - 20B = 10t
$$

thus

$$
A = 20B \\
-20A = 10 \\
A = -1/2 \\
B = (1/20)(-1/2) = -1/40
$$

so our particular solution is

$$
y_p = (-1/2)t - (1/40)
$$

and our whole solution is

$$
y(t) = c_1e^{-5t} + c_2e^{4t} - (1/2)t - (1/40)
$$
