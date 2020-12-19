---
title: Variation of Parameters
ordering: a60
---

Consider the following differential equation:

$$
y'' + q(t)y' + r(t)y = g(t)
$$

First, we will define a determinant called the **Wronskian**:

$$
W(y_1, y_2) = \begin{vmatrix}
y_1 & y_2 \\
y_1' & y_2'
\end{vmatrix}
$$

If $y_1(t)$ and $y_2(t)$ are a fundamental set of solutions for

$$
y'' + q(t)y' + r(t)y = 0
$$

Then a particular solution to the nonhomogenous problem is

$$
y_p(t) = -y_1(\int \frac{y_2 g(t)}{W(y_1, y_2)} dt) + y_2(\int \frac{y_1 g(t)}{W(y_1, y_2)} dt)
$$

where $W(y_1, y_2)$ is the **Wronskian**.

## Example

Consider the following problem:

$$
y'' + y = sec t
$$

Our homogenous solution can be computed via:

$$
(r^2 + 1) = 0 \Rightarrow r = \pm i
$$

Thus we get:

$$
y_h = c_1 \sin(t) + c_2 \cos(t)
$$

So $y_1 = \sin(t)$ and $y_2 = \cos(t)$.

The Wronskian is thus:

$$
W(y_1, y_2) = \begin{vmatrix}
\sin(t) & \cos(t) \\
\cos(t) & -\sin(t)
\end{vmatrix} = -\sin^2(t) -\cos^2(t) = -1
$$

We see that $g(t) = \sec(t)$, so the particular is:

$$
\begin{align}
y_p(t) &= -y_1(\int \frac{y_2 g(t)}{W(y_1, y_2)} dt) + y_2(\int \frac{y_1 g(t)}{W(y_1, y_2)} dt) \\
&= -\sin(t) (\int \frac{\cos(t)\sec(t)}{-1} dt) + \cos(t)(\int \frac{\sin(t)\sec(t)}{-1} dt) \\
&= -\sin(t) (\int -dt) + \cos(t)(\int -\tan(t)dt) \\
&= t\sin(t) - \cos(t)(\int \tan(t)dt) \\
&= t\sin(t) - \cos(t)\ln|\cos(t)|
\end{align}
$$

Thus the full solution $y_h + y_p = y(t)$ is:

$$
y(t) = c_1 \sin(t) + c_2 \cos(t) + t\sin(t) - \cos(t)\ln|\cos(t)|
$$
