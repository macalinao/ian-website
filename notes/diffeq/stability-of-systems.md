---
title: Stability of Systems
ordering: c21
---

A system is *unstable* if trajectories move away from the equilibrium, and *stable* otherwise.

Given the eigenvalues of a linear system of differential equations, there are several cases that can happen:

* All eigenvalues are positive: the system is unstable
* All eigenvalues are negative: the system is stable
* Some eigenvalues are positive and some are negative: saddle point, so unstable
* All eigenvalues are less than or equal to zero:
    * If no eigenvalues have multiplicity $> 1$, stable
    * Check if we can find $k$ eigenvectors for each $\lambda$ with real part 0 with multiplicity $k$. If so, stable, otherwise, unstable.
  
### Example 1

$$
\dot{\vec{x}} = \begin{bmatrix}-7 & 1 & -6 \\ 10 & -4 & 12 \\ -2 & -1 & 1\end{bmatrix} \vec{x}
$$

Solve for the eigenvalues $\lambda$ in $\det(A - \lambda I) = 0$, which turn out to be $\lambda = -2, -3, -5$. Because they are all negative, this is stable.

### Example 2

$$
\dot{\vec{x}} = \begin{bmatrix}-5 & 3 \\ -1 & 1\end{bmatrix} \vec{x}
$$

We get eigenvalues of $\lambda = -2 \pm \sqrt{6}$. Since one of these is positive and one of these is negative, we are at a saddle point and thus unstable.
