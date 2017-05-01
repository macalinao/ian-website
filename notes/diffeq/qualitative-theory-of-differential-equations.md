---
title: Qualitative Theory of Differential Equations
date: 2017-04-29
ordering: 2
---

## Equilibrium Solutions

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

Thus, our final solution set is $\begin{bmatrix}0 \\ 0\end{bmatrix}, \begin{bmatrix}0 \\ 1\end{bmatrix}, \begin{bmatrix}1 \\ 0\end{bmatrix}, \begin{bmatrix}1/2 \\ 1/4\end{bmatrix}$.

## Stability of Systems

A system is *unstable* if trajectories move away from the equilibrium, and *stable* otherwise.

Given the eigenvalues of a linear system of differential equations, there are several cases that can happen:

* All eigenvalues are positive: the system is unstable
* All eigenvalues are negative: the system is stable
* Some eigenvalues are positive and some are negative: saddle point, so unstable
* All eigenvalues are less than or equal to zero:
  * If no eigenvalues have multiplicity $> 1$, stable
  * Check if we can find $k$ eigenvectors for each $\lambda$ with multiplicity $k$. If so, stable, otherwise, unstable.
  
### Example 1

$$
\dot{\vec{x}} = \begin{bmatrix}-7 & 1 & -6 \\ 10 & -4-\lambda & 12 \\ -2 & -1 & 1\end{bmatrix} \vec{x}
$$

Let's solve for the eigenvalues, which turn out to be $\lambda = -2, -3, -5$. Because they are all negative, this is stable.

### Example 2

$$
\dot{\vec{x}} = \begin{bmatrix}-5 & 3 \\ -1 & 1\end{bmatrix} \vec{x}
$$

We get eigenvalues of $\lambda = -2 \pm \sqrt{6}$. Since one of these is positive and one of these is negative, we are at a saddle point and thus unstable.

## The phase plane

The *orbit* of a solution of a system of differential equations $x = x(t)$, $y = y(t)$, is the curve on the x-y plane.


