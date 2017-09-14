A function $\phi: G \to H$, $G, H$ groups is a *homomorphism* iff

$$\phi(ab) = \phi(a)\phi(b) \forall a, b \in G$$

So: an *isomorphism* is a homomorphism that's also a bijection.

## Lemma 2.6

$$
(1) \phi(1_G) = 1_H

(2) \phi(a^{-1}) = \phi(a)^{-1}

(3) \phi(a^n) = \phi(a)^n \forall n \in \mathbb{Z}
$$

### Proof.

(1) Let $a \in G$. $1_H \phi(a) = \phi(a) = \phi(1_G * a) = \phi(1_G)\phi(a)$, so by cancellation $1_H = \phi(1_G)$.

(2) $1_G = aa^{-1}$, therefore $\phi(1_G) = \phi(aa^{-1}) = \phi(a)\phi(a^{-1})$. Therefore, $(\phi(a))^{-1} * 1_H = \phi(a^{-1})$.

### Note.

$\phi: G \to H$, $\psi: H \to K$ homomorphisms implies that $\phi \psi : G \to K$ is a homomorphism.

Therefore, $\phi, \psi$ isomorphisms implies $\psi \phi$ is an isomorphism.

$\phi: G \to H$ isomorphism, $\phi$ bijection, therefore $\phi^{-1}: H \to G$ exists.

$\phi^{-1} is also an isomorphism: it is clearly a bijection, it is a homomorphism because $\phi(\phi^{-1(ab)}) = (\phi \phi^{-1})(ab) = ab$, $\phi(\phi^{-1}(a)\phi^{-1}(b)) = \phi(\phi^{-1}(a))\phi(\phi^{-1}(b))$. Since $\phi$ is a homomorphism, then so is $\phi^{-1}$.