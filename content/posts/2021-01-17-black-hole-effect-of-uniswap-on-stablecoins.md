---
title: The Black Hole Effect of Uniswap on Algorithmic Stablecoins
description: Uniswap is a suboptimal place for stablecoins that rely on mean reversion to $1 to trade, as Uniswap encourages price crashes to stay low.
tags:
  - DeFi
  - Finance
  - Crypto
hasMath: true
banner:
  alt: Compound protocol logo
  width: 1400
  height: 788
  src: https://static.ian.pw/images/black-hole.jpg
---

Algorithmic, undercollateralized stablecoins have popped up everywhere in the past few months. They've been touted to be everything from the cure to inflation to solving world poverty. However, the current pricing mechanism used by these stablecoins is flawed: while expansions are usually able to bring the price sufficiently down, contractionary mechanisms are not able to bring the price back to peg.

While some may say that the underlying notion that an undercollateralized stablecoin could possibly work is the problem, the current problem lies in the Uniswap constant product model.

## A brief review of Uniswap

Uniswap is built on one equation: `xy = k`, where:

- $x$ is the total amount of token 0 staked in the Uniswap pool,
- $y$ is the total amount of token 1 staked in the Uniswap pool, and
- $k$ is a constant supplied at the time of creating the pool.

Due to this, $x$ and $y$ must always have the same ratio to each other in the pool in terms of relative value: $y/k = x$ and $x/k = y$. Thus a pool with a 10:1 ratio of DAI to ETH (in terms of dollar value, e.g. \$10M DAI and \$1M ETH) will always have a ratio of 10:1 DAI to ETH, no matter how expensive the price of ETH becomes.[^1]

However, the price of $x$ relative to $y$ is determined by $x/y$: if the pool is initialized with \$10M of DAI and \$1M of ETH, if the price of ETH is 1000 DAI, then that means there are 1000 DAI in the pool for each ETH. This price is able to change while keeping the dollar value ratio of the two tokens the same.

While this model is very simple (and thus cheap in terms of transaction fees), it has several problems which we will uncover later in this article.

### Example: buying tokens

Let's say the pool has the price of 1 ETH = \$1000 DAI, and the pool has reserves of \$2M USD. Due to the constant product, this means there is \$1M of ETH in the pool and \$1M of DAI, so there are 1000 ETH and 1M DAI in the pool.

Recall that $xy = k$ is the Uniswap invariant. Let the initial ETH reserves be $x_0$ and the initial DAI reserves be $y_0$, so $x_0 * y_0 = k$.

Now let's say I want to buy 500 ETH. Thus the new ETH reserves $x_1 = 500 + 1000 = 1500$. Since $k$ is constant, we can compute that the new DAI reserves should be $y_1 = k/x_1 = x_0 * y_0 / x_1$ = 666,666.66 DAI\$.

Thus we will sell 500 ETH to buy 333,333.33 DAI.

Note that the new reserves are now 500 ETH and 666,666 DAI, so the new price of ETH is $666666/500 = 1333$ DAI. However, there are now only \$666,666 ETH and \$666,666 DAI in the pool.

### Acceleration of price drift

The above solution seems innocuous at first, but it causes hidden forces in the market: with the same amount of liquidity and trade volume, as the price drifts from the initial price, the price begins to drift faster.

Recall the constant product formula:

$$
xy = k
$$

Let $x$ be the number of TOKX in the pool and $y$ be the number of TOKY in the pool. Given that the current price of TOKX relative to TOKY $p = x/y$, the change in price with respect to the change in reserves $x$ of TOKX is given by the derivative:

$$
\frac{dp}{dx} = \frac{x}{y} \frac{d}{dx} = \frac{x}{k/x} \frac{d}{dx} = \frac{x^2}{k} \frac{d}{dx} = \frac{2x}{k}
$$

This means that for every $x$ TOKX tokens sold into the pool for TOKY, the change in the price of TOKY increases at a rate of $2x/k$. Since $x$ will continue to grow as more TOKX are sold for TOKY, the slippage in price for the same number of TOKY purchased is magnified the lower the price goes.

### The black hole effect

At some point, the supply of $x$ relative to $y$ is so great such that overcoming the massive amount of liquidity is economically not viable. Even if people unstake their tokens from the pool at low prices, the imbalance may be so great that the pool will never revert to \$1.

Consider an extreme where 1 DAI is equivalent to 1 BAC: i.e. BAC is \$0.01. Let's say the total amount of liquidity is merely \$50k, a fraction of the \$60M at the time of writing.

Since the pool has a 100:1 token ratio but 1:1 constant ratio, the reserves can be computed as follows: let $x$ be the total BAC reserves and $y$ be the total DAI reserves. So $x = 100y$ due to the liquidity ratio and $y = 50000/2 = 25000$ due to k, where the pool has half of its dollar value in $y$ and half of its dollar value in $x$. Solving this system of equations, we get that there are **2.5M BAC** in the pool and **25,000 DAI** in the pool.

Now, to get the price of BAC to double in this pool, the new ratio of BAC:DAI needs to be 100:2. So $x' = 50y'$. We can solve the following system of equations to compute the change in reserves needed:

$$
\begin{aligned}
xy &= 2500000 * 25000 \\
x/100 &= y/2
\end{aligned}
$$

[This gives us](https://www.wolframalpha.com/input/?i=xy+%3D+2500000*25000%3B+x%2F100%3Dy%2F2) the new reserves of **1.7M BAC** and **35355 DAI**. The new liquidity is 2x DAI $\simeq 70k$.

So \$10k of DAI had to be spent in order to rais the price 1 cent. _Not terrible,_ you might be thinking-- unfortunately; the effects amplify as the ratio equalizes.

To get to 10 cents per BAC, the pool requires 79K DAI reserves-- 160K of liquidity.

To get to 1 dollar per BAC, the pool requires a whopping 250K DAI of reserves-- 500K of liquidity.

<figure>
  <NextImage src="https://static.ian.pw/images/2021-01-17-bac-dai-repeg.png" width="640" height="480" alt="BAC/DAI reweight" />
  <figcaption>
    Amount of DAI required to bring BAC from $0.01 to $1 with $50K liquidity
  </figcaption>
</figure>

So you see, despite the pool only having \$50K of liquidity in it, the pool requires $\$250K - \$25K = \$225K$ in order to recover back to the peg, or **9x the current DAI in the pool**. It is unlikely for this recovery to happen to a dead project and the problem only worsens as the price continues to cause more selling of BAC, hence the term: **black hole effect**.

## Solutions

### Using a flatter curve

A flatter curve would prevent the price from slipping until faith in the token has completely dropped off. [Curve.fi](https://curve.fi) is one such example of a curve that is optimized for stablecoins:

<figure>
    <NextImage src="https://static.ian.pw/images/2021-01-17-stableswap.png" width="625" height="389" alt="Stableswap" />
    <figcaption>
      <a href="https://en.cryptonomist.ch/2020/09/26/guide-curve-finance/">A Guide to Curve Finance — The Cryptonomist</a>
    </figcaption>
</figure>

[Basis.cash](https://medium.com/basis-cash/stableswap-pools-and-algorithmic-stablecoins-b21ab5cb555f) is already planning on implementing this.

However, this is not a panacea -- since there is more liquidity in the middle of the curve, if the stablecoin is problematic for long enough, the price will fall rapidly at the extremes of the curve. This curve simply deplays the inevitable black hole.

### Reweighting the pair back to 1:1

By modifying the $k$ in the Uniswap constant product, one can avoid this black hole effect.

One solution is described by the [Fei Protocol](https://fei.money/) as follows[^2]:

> Peg Reweights — In the event of extended periods below the peg, the Fei Protocol can reweight the Uniswap price back to the peg. It achieves this by executing the following atomic trade: 1. Withdraw all protocol owned liquidity, 2. Buy FEI with the withdrawn ETH to bring price up to peg. 3. Resupply remaining PCV as liquidity. 4. Burn the excess FEI.

Since Basis.cash and its forks rely on a "BAC/DAI LP" pool, the pool could theoretically be upgraded in a later version of the protocol to implement this algorithm.[^3]

However, this may not always work since not all liquidity is staked into the BAC/DAI pool-- one may run into the effects mentioned above where there isn't enough money in the pool. A naive solution to this could be to have the protocol run the exchange used to determine the peg; however BAC that exists outside of the pool could in theory be used to drive the prices back down despite a peg reweighting occurring. This is okay though since the intent of BAC is to be worth \$1.

There is another downside to using such a reweighting system in BAC, where stakers in the BAC/DAI pool may be hesitant to stake as their BAC continues to be chipped off every time there is a dip in the market. This may be okay though since it is desirable to not have liquidity in the pools when prices are low again due to the black hole effect.

## Conclusion

One may think that undercollateralized seigniorage share tokens have been proven to be unreliable due to recent events. However, the current depression of three-token stablecoins is only due to the constant product model and the contraction mechanism used. The algorithmic stablecoin space is developing rapidly and I am really looking forward to what projects propose as solutions to this problem.

[^1]: The pool ratio can change over time due to pool fees collected: each transaction takes a 0.3% cut of the total input tokens transacted. The fees are kept in the pool's reserves and LP token holders accrue these fees in their pool tokens.
[^2]: Source: https://medium.com/fei-protocol/introducing-fei-protocol-2db79bd7a82b
[^3]: Most algorithmic stablecoins have some version of this pool.
