---
title: Vector Spaces
ordering: b30
---

To check if something is a vector space, check the following properties:

* Presence of the zero vector
* Closed under scalar multiplication
* Closed under addition

Note that the definition of [vector space](https://en.wikipedia.org/wiki/Vector_space) is a bit longer, but since in this class we only deal with subspaces of $\mathbb{R}^n$ we don't have to check a lot of properties.

## Example 1

Show that the set of all vectors $\begin{bmatrix}x_1 \\ x_2 \\ x_3\end{bmatrix}$ such that $x_2 + 3x_3$ constitutes a vector space.

First, since $0 + 3(0) = 0$, we have the zero vector.

Next, since $(x_2 + y_2) + 3(x_3 + y_3) = (x_2 + 3x_3) + (y_2 + 3y_3) = 0$, we are closed under addition.

Finally, since

$$
c\begin{bmatrix}x_1 \\ x_2 \\ x_3\end{bmatrix} = \begin{bmatrix}cx_1 \\ cx_2 \\ cx_3\end{bmatrix}
$$

and

$$
cx_2 + 3cx_3 = c(x_2 + 3x_3) = c(0) = 0
$$

we are closed under scalar multiplication, and we are done.
