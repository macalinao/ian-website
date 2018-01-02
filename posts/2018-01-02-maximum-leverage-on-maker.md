---
title: Maximum Leverage on Maker
---

First off, this article assumes familiarity with [Maker](https://makerdao.com/) CDP's. (If not, I highly suggest reading up on it!)

Recall that the liquidation ratio of a CDP is the collateral-to-debt ratio of the CDP. For example, if the liquidation ratio is 150% on ETH/USD, if ETH is $100 and you have 1 ETH in the CDP, you may accrue up to $66 of debt (that is, generate up to $66 Dai) as your collateral is worth 150% of your debt. This gives us a leverage ratio of 1.6x. But can we go higher?

Assuming enough liquidity exists, we can then buy 0.66 ETH with this Dai.

![The amount of additional leverage drops off each round.](/images/20180102_additional-leverage-per-round.png)

We can then put this ETH back into our CDP to draw more Dai. We can draw $\$66.66 \* 1/1.5 = $44.44$ more Dai from our CDP. We can keep doing this forever to generate more Dai and thus more leverage; however, we get less Dai each time. But how much?

![Cumulative leverage converges to a finite value.](/images/20180102_cumulative-leverage-per-round.png)

Let $\lambda$ represent the liquidation ratio and $L$ represent our maximum leverage ratio. We compute $L$ to be the following

$$
L = \frac{1}{l} + \frac{1}{\lambda^2} + \frac{1}{\lambda^3} + \ldots
$$

But this is just a [geometric series](https://en.wikipedia.org/wiki/Geometric_series) with $a = 1$ and $r = 1/\lambda$. Using the infinite sum of geometric series formula, we get:

$$
L = \frac{1}{1 - r} = \frac{1}{1 - \frac{1}{\lambda}}
$$

which in the case of $\lambda = 1.5$, 3x leverage.

![Riskier assets will have higher liquidation ratios.](/images/20180102_leverage_liquidation.png)

Note that these ratios will be less in practice due to finite liquidity on the ETH/DAI pair, block time (you must wait a block for every CDP transaction or ETH/DAI purchase), and transaction fees.

The Maker system requires automatic ETH/DAI trades for its liquidation system, so this should be possible to automate in the future once those components are live.
