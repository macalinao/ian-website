---
title: Maximum Leverage on Maker
description: A summary of how to compute and obtain maximum leverage on MakerDAO.
---

![](/images/20180125_mkrbanner.png)

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

## Theoretical vs Actual Leverage

The above calculation accounts for the maximum leverage in an infinitely liquid ETH/DAI market with an instant ability to fund a CDP. However, there are several factors that come into play:

* Finite liquidity on ETH/DAI
* CDP funding and trade delays

### Finite liquidity

The amount of ETH one can buy with Dai is currently very limited, and the spread is significantly wide. The above calculations make the assumption that one can continue to buy more ETH at the market price, which is very far from the truth.

However, this liquidity will improve over time, as the future of the Maker system requires this liquidity to exist for its auto-liquidation system to work.

### CDP funding and trade delays

There are several actions one must perform to increase the collateral locked in the CDP contract, all taking one block each:

1. Generating Dai from the CDP
2. Buying W-ETH from the WETH/DAI market
3. Converting W-ETH to PETH
4. Locking the newly generated PETH into the CDP.

One should note that step 3 will not exist in the final version of Maker -- pooled Ether is a workaround to the MKR token generation system not being in place. However, this means that at a minimum, three blocks will pass before the CDP can be refunded.

If one generates the maximum amount of Dai from the CDP, they are at immediate risk of liquidation if the price of Ether drops even one cent. Since the process of refunding the CDP is not atomic, there is a very real risk of this liquidation taking place.

In theory, one could write a smart contract that performs this entire 4-step process in one transaction with a specified minimum accepted price. Before this exists, however, one is subject to the aformentioned risks.

*(If you liked this post, [join our crypto Discord!](https://discord.gg/5AkBWSY))*
