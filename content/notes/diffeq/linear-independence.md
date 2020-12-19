---
title: Linear Independence
ordering: b20
---

You can do one of two things to check if they are linearly independent:

1. Row reduce and check that $rank(A) = dim(A)$
2. Check if $det(A) \not = 0$.

## Example 1

Determine if the following vectors are linearly independent or dependent.

$$
\begin{bmatrix}1 \\ 2 \\ 3\end{bmatrix},
\begin{bmatrix}1 \\ 1 \\ 1\end{bmatrix},
\begin{bmatrix}-1 \\ 3 \\ 1\end{bmatrix}
$$

Take the determinant of everything:

$$
\begin{align}
\det \begin{bmatrix}
1 & 1 & -1 \\
2 & 1 & 3 \\
3 & 1 & 1
\end{bmatrix} &= (1 + 9 - 2) - (-3 + 3 + 2) \\
&= 8 - 2 = 6
\end{align}
$$

Since $6 \not = 0$, they are linearly independent.
