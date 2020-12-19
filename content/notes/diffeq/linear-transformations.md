---
title: Linear Transformations
ordering: b40
---

A linear transformation $f$ over a vector space $V$ is a map that preserves addition and scalar multiplication such that for all $x, y \in V$:

- $f(x + y) = f(x) + f(y)$
- $f(ax) = af(x)$ for any scalar $a$.

## Example 1

Is $T: M_{22} \to M_{22}$ where

$$
T(\begin{bmatrix}a & b \\ c & d\end{bmatrix}) := \begin{bmatrix}d + \cos(a) & c - \sin(b) \\ -4a & b + c - 3d\end{bmatrix}
$$

a linear tranformation?

No it isn't, since scalar multiplication is not preserved:

$$
r\begin{bmatrix}d + \cos(a) & c - \sin(b) \\ -4a & b + c - 3d\end{bmatrix} \not = \begin{bmatrix}rd + r\cos(a) & rc - r\sin(b) \\ -4ra & rb + rc - 3rd\end{bmatrix}
$$

since $\cos$, $\sin$ are periodic.
