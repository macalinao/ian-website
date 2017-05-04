---
title: Equilibrium Solutions
ordering: c20
---

The equilibrium solutions of a differential equation are those where the derivative is zero.

### Example 1

Given the following differential equation:

$$
y' = y^2 - y - 6
$$

We simply solve for the roots:

$$
y' = 0 = y^2 - y - 6 = (y - 3)(y + 2)
$$

Thus the functions $y = -2, 3$ are the equilibrium solutions.

### Example 2

Say we have the following system of equations:

$$
\frac{dx}{dt} = x - x^2 - 2xy
$$

$$
\frac{dy}{dt} = 2y - 2y^2 - 3xy
$$

We need to solve for  $\frac{dx}{dt} = \frac{dy}{dt} = 0$. An easy way to do this is factor the variables and solve for the zeroes like so:

$$x(1 - x - 2y) = 0$$

$$y(2 - 2y - 3x) = 0$$

We can set $x = 0$ then see $y = 0$ is also a solution. Furthermore, $2 - 2y - 3(0) = 0$ so $2(1 - y) = 0$, thus we also have $y = 1$ being a solution.

Similarly, we can set $1 - x - 2y = 0$ so if $y = 0$ then $x = 1$. Furthermore, if we set $1 - x - 2y = 2 - 2y - 3x = 0$, we can get our last solution, $x = 1/2$, $y = 1/4$.

Thus, our final solution set is:

$$
\begin{bmatrix}0 \\ 0\end{bmatrix}, \begin{bmatrix}0 \\ 1\end{bmatrix}, \begin{bmatrix}1 \\ 0\end{bmatrix}, \begin{bmatrix}1/2 \\ 1/4\end{bmatrix}
$$
