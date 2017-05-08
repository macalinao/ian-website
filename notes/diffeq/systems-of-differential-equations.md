---
title: Systems of Differential Equations
ordering: c10
---

You can use linear algebra techniques to solve differential equations of the form:

$$
\dot{\vec{x}} = A\vec{x}
$$

where $A$ is a matrix of constants.

## Real Eigenvalues

Consider the following initial value problem:

$$
\dot{\vec{x}} = \begin{bmatrix}
  1 & 1 \\ 4 & 1
\end{bmatrix} \vec{x} \text{, } \vec{x}(0) = \begin{bmatrix}
  2\\3
\end{bmatrix}
$$

There are three steps involved in solving this problem:

1. Find the eigenvalues (solve for $\lambda$ in $det(A - \lambda I) = 0$; that is, the "characteristic equation")
2. Find the eigenvectors
3. Solve for the constants

First, let's find the eigenvalues ($\lambda$):

\begin{align}
  \det(A - \lambda I) &= \det \begin{bmatrix}
    1 - \lambda & 1           \\
    4           & 1 - \lambda
  \end{bmatrix} \\
  &= (1 - \lambda)(1 - \lambda) - 4 \\
  &= \lambda^2 - 2\lambda - 3 \\
  &= (\lambda - 3)(\lambda + 1) = 0
\end{align}

Thus, $\lambda = -1, 3$.

Next, let's solve for the eigenvectors. To do this, we plug in each $\lambda$ into the following equation:

$$
(A - \lambda_i I)\vec{v_i} = 0
$$

where $\lambda_1$, $\vec{v_i}$ are the i-th eigenvalue and eigenvector. In this case, we have two of them. Let us solve for them below:

$$
\begin{bmatrix}
 -2 & 1 \\ 4 & -2
\end{bmatrix} \vec{v_1} = \begin{bmatrix}0 \\ 0\end{bmatrix} \Rightarrow v_{11} = (-1/2)v_{12}
$$

Thus an eigenvector is $\begin{bmatrix}-1/2 \\ 1\end{bmatrix}$ Note that since eigenvectors are not unique, we can simply use the eigenvector $\begin{bmatrix}1 \\ -2\end{bmatrix}$.

Similarly, let's solve for $\vec{v_2}$:

$$
\begin{bmatrix}
  -2 & 1 \\ 4 & -2
\end{bmatrix} \vec{v_2} = \begin{bmatrix}0 \\ 0\end{bmatrix} \Rightarrow v_{21} = (1/2)v_{22}
$$

So the second eigenvector $\vec{v_2}$ is $\begin{bmatrix}1/2 \\ 1 \end{bmatrix}$ or just $\begin{bmatrix}1 \\ 2\end{bmatrix}$.

From these, we can now construct a general solution to our differential equation:

$$
\vec{x}(t) = c_1e^{-t}\begin{bmatrix}1 \\ -2\end{bmatrix} + c_2 e^{3t}\begin{bmatrix}1 \\ 2\end{bmatrix}
$$

Now, let's plug in our initial values to solve for the constants $c_1$ and $c_2$:

$$
\begin{bmatrix}
  2 \\ 3
\end{bmatrix} = c_1 \begin{bmatrix}
  1 \\ -2
\end{bmatrix} + c_2 \begin{bmatrix} 1 \\ 2 \end{bmatrix}
$$

or in matrix form

$$
\begin{bmatrix}1 & 1 \\ -2 & 2\end{bmatrix}\begin{bmatrix}c_1 \\ c_2\end{bmatrix} = \begin{bmatrix}2 \\ 3\end{bmatrix}
$$

With a bit of algebra, we get $c_1 = \frac{1}{4}$ and $c_2 = \frac{7}{4}$, thus our final equation is:

$$
\vec{x}(t) = \frac{1}{4} e^{-t}\begin{bmatrix}1 \\ -2\end{bmatrix} + \frac{7}{4} e^{3t}\begin{bmatrix}1 \\ 2\end{bmatrix}
$$

### Example

Let $A$ be a $3 \times 3$ matrix. Suppose $7, 4, 1$ are eigenvalues with corresponding eigenvectors:

$$
\begin{bmatrix}2 \\ 0 \\ 3\end{bmatrix},
\begin{bmatrix}6 \\ 1 \\ 8\end{bmatrix},
\begin{bmatrix}4 \\ 2 \\ 7\end{bmatrix},
$$

Find the solution to the initial value problem $\frac{d}{dt}\vec{x} = A\vec{x}$ with $\vec{x}(0) = \begin{bmatrix}1 \\ 1 \\ 4\end{bmatrix}$.

With the eigenvalues and eigenvalues already solved for, this problem is very simple: just plug things into the formula like below.

$$
\vec{x}(t) =
  c_1e^{7t}\begin{bmatrix}2 \\ 0 \\ 3\end{bmatrix}
  + c_2e^{4t}\begin{bmatrix}6 \\ 1 \\ 8\end{bmatrix}
  + c_3e^{t}\begin{bmatrix}4 \\ 2 \\ 7\end{bmatrix}
$$

Then, we solve for our constants by plugging in $\vec{x}(0)$:

$$
\vec{x}(0) = \begin{bmatrix}1 \\ 1 \\ 4\end{bmatrix} =
  c_1\begin{bmatrix}2 \\ 0 \\ 3\end{bmatrix}
  + c_2\begin{bmatrix}6 \\ 1 \\ 8\end{bmatrix}
  + c_3\begin{bmatrix}4 \\ 2 \\ 7\end{bmatrix}
$$

Transforming this into a matrix equation, we get:

$$
\begin{bmatrix}1 \\ 1 \\ 4\end{bmatrix} =
  \begin{bmatrix}
    2 & 6 & 4 \\
    0 & 1 & 2 \\
    3 & 8 & 7
  \end{bmatrix}\begin{bmatrix}c_1 \\ c_2 \\ c_3\end{bmatrix}
$$

With this, we can easily solve for our constants $c_1$, $c_2$, and $c_3$.

## Complex Eigenvectors

Let's say we get end up with complex eigenvalues/eigenvectors, for example:

$$
\lambda_1 = -1 \text{,}\hspace{1cm} \lambda_2 = 5 + 2i
$$

$$
\vec{v_1} = \begin{bmatrix}3 \\ 1 \\ 6\end{bmatrix} \text{,}\hspace{1cm} \vec{v_2} = \begin{bmatrix}6i \\ 0 \\ 3\end{bmatrix}
$$

Recall [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula):

$$e^{i\theta} = \cos(\theta) + i \sin(\theta)$$

We will use this to erase the $i$ term by letting it be absorbed into the constant. We can use this formula to get another eigenvector for free from the complex-valued eigenvalue.

$$
e^{(5 + 2i)t}\begin{bmatrix}6i \\ 0 \\ 3\end{bmatrix} = e^{5t}(\cos(2t) + i\sin(2t))\begin{bmatrix}6i \\ 0 \\ 3\end{bmatrix}
$$

Each $e^{\lambda t}$ will have its own constant, so the final solution looks like this:

$$
\vec{x} = c_1e^{-t}\begin{bmatrix}3 \\ 1 \\ 6\end{bmatrix} + c_2 e^{5t}\begin{bmatrix}-\sin(2t) \\ 0 \\ 3\cos(2t)\end{bmatrix} + c_3 e^{5t}\begin{bmatrix}6\cos(2t) \\ 0 \\ 3\sin(2t)\end{bmatrix}
$$

Notice that the $i$ in the third term was absorbed by $c_3$ -- the whole idea is to factor out $i$ so we don't get it in our answer.

## Repeated Eigenvalues

If our characteristic equation has a root of multiplicity $2$, we use the following method:

Let's say we get an eigenvector $\begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix}$. If our $A - \lambda I$ was $\begin{bmatrix}1 & -1 & 1 \\ 2 & -2 & 1 \\ 0 & 0 & 1\end{bmatrix}$, we would solve for a second eigenvector:

$$
\begin{bmatrix}1 & -1 & 1 \\ 2 & -2 & 1 \\ 0 & 0 & 1\end{bmatrix} \vec{v} = \begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix}
$$

Let $\vec{v} = \begin{bmatrix}0 \\ 0 \\ 1\end{bmatrix}$. Then, we would put together the eigenvectors as follows:

$$
c_1 e^{\lambda t} \begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix} + c_2 e^{\lambda t} \Bigg(t \begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix} + \begin{bmatrix}0 \\ 0 \\ 1\end{bmatrix} \Bigg) = c_1 e^{\lambda t} \begin{bmatrix}1 \\ 1 \\ 0\end{bmatrix} + c_2 e^{\lambda} \begin{bmatrix}t \\ t \\ 1\end{bmatrix}
$$

If we have multiplicity $n > 2$, then we use $t^k/k!$ as coefficients for our terms for all $k = 1 \ldots n$.
