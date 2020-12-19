---
title: Inverting Matrices
ordering: b10
---

## Example 1

Invert the following matrix:

$$
\left(\begin{array}{ccc}
0 & 2 & -4 \\
1 & 0 & 2 \\
4 & 1 & 7 \\
\end{array}\right)
$$

Solve this by performing elementary row operations with an appended identity matrix like so:

$$
\left(\begin{array}{ccc | ccc}
0 & 2 & -4 & 1 & 0 & 0 \\
1 & 0 & 2 & 0 & 1 & 0 \\
4 & 1 & 7 & 0 & 0 & 1 \\
\end{array}\right)\\
\Downarrow r_1 \iff r_2 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 2 & 0 & 1 & 0 \\
0 & 2 & -4 & 1 & 0 & 0 \\
4 & 1 & 7 & 0 & 0 & 1 \\
\end{array}\right)\\
\Downarrow r_3 - 4r_1 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 2 & 0 & 1 & 0 \\
0 & 2 & -4 & 1 & 0 & 0 \\
0 & 1 & -1 & 0 & -4 & 1 \\
\end{array}\right)\\
\Downarrow r_3 - r_2 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 2 & 0 & 1 & 0 \\
0 & 1 & -2 & \frac{1}{2} & 0 & 0 \\
0 & 1 & -1 & 0 & -4 & 1 \\
\end{array}\right)\\
\Downarrow r_3 - r_2 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 2 & 0 & 1 & 0 \\
0 & 1 & -2 & \frac{1}{2} & 0 & 0 \\
0 & 0 & 1 & -\frac{1}{2} & -4 & 1 \\
\end{array}\right)\\
\Downarrow r_1 - 2r_3 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 0 & 1 & 9 & -2 \\
0 & 1 & -2 & \frac{1}{2} & 0 & 0 \\
0 & 0 & 1 & -\frac{1}{2} & -4 & 1 \\
\end{array}\right)\\
\Downarrow r_2 + 2r_3 \\
\left(\begin{array}{ccc | ccc}
1 & 0 & 0 & 1 & 9 & -2 \\
0 & 1 & -2 & -\frac{1}{2} & -8 & 2 \\
0 & 0 & 1 & -\frac{1}{2} & -4 & 1 \\
\end{array}\right)\\
$$

Thus

$$
\left(\begin{array}{ccc}
0 & 2 & -4 \\
1 & 0 & 2 \\
4 & 1 & 7 \\
\end{array}\right)^{-1} =
\left(\begin{array}{ccc}
1 & 9 & -2 \\
-\frac{1}{2} & -8 & 2 \\
-\frac{1}{2} & -4 & 1 \\
\end{array}\right)
$$
