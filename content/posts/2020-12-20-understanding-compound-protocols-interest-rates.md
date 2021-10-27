---
title: Understanding Compound protocol's interest rates
description: A deep dive into the factors that calculate Compound's interest rates.
tags:
  - DeFi
  - Finance
  - Crypto
hasMath: true
banner:
  alt: Compound protocol logo
  width: 750
  height: 420
  src: https://static.ian.pw/images/2020-12-20-compound-banner.png
---

The [Compound protocol](https://compound.finance) is an unprecedented technological advancement in the history of finance: for the first time in history, one can borrow money and earn interest with no humans, governments, or credit involved.

Rates vary frequently, though, and it is important to understand how the protocol determines interest rates.

## The utilization rate

All interest rates in Compound are determined as a function of a metric known as the **utilization rate**. The utilization rate $U_a$ for a money market $a$ is defined[^1] as:

$$U_a = Borrows_a / (Cash_a + Borrows_a - Reserves_a)$$

- $Borrows_a$ refers to the amount of $a$ borrowed.
- $Cash_a$ refers to the amount of $a$ left in the system.
- $Reserves_a$ refers to the amount of $a$ that Compound keeps as profit.

Intuitively speaking, this is the percentage of money borrowed out of the total money supplied.

For example: given that reserves are 0, if Alice supplies \$500 <TokenIcon token="USDC" /> and Bob supplies \$500 USDC, but Charles borrows \$100 USDC, the total borrows is \$100 and the total cash is $500 + 500 - 100 = 900$, so the utilization rate is $100 / (900 + 100) = 10\%$.

A high ratio signifies that a lot of borrowing is taking place, so interest rates go up to get more people to inject cash into the system. A low ratio signifies that demand for borrowing is low, so interest rates go down to encourage more people to borrow cash from the system. This follows economic theory's idea of price (the "price" of money is its interest rate) relative to supply and demand.

## Borrow and supply rates

Borrow and supply rates are calculated using the utilization rate and several arbitrary constants.

The supply rate is calculated as follows:

$$\text{Supply Interest Rate}_a = \text{Borrowing Interest Rate}_a * U_a * (1 - \text{Reserve Factor}_a)$$

where

- $U_a$ is the utilization rate of $a$
- $\text{Reserve Factor}_a$ is the percentage of the spread between the supply and borrow rates that the protocol keeps as profit[^2]
- $\text{Borrowing Interest Rate}_a$ is the interest rate that borrowers should pay for $a$.

### The Compound Standard Interest Rate Model

The borrowing rate's calculation depends on something called an **interest rate model** -- the algorithmic model to determine a money market's borrow and supply rates. In this post, I'll go over the interest rate model used for USDC and most other coins: the **Compound Standard Interest Rate Model**.

This interest rate model takes in two parameters:

- Base rate per year, the minimum borrowing rate
- Multiplier per year, the rate of increase in interest rate with respect to utilization

The graph is linear:

$$\text{Borrow Interest Rate} = \text{Multiplier} * \text{Utilization Rate} + \text{Base Rate}$$

### Example: WBTC rates

<figure>
    <a href="https://compound.finance/markets/WBTC">
        <NextImage src="https://static.ian.pw/images/2020-12-20-wbtc-rate-model.png" width="512" height="467" alt="The WBTC rate model." />
    </a>
    <figcaption>The WBTC rate model.</figcaption>
</figure>

Let's say the protocol has 10,000 <TokenIcon token="WBTC" /> supplied to it and users are borrowing 1,000 WBTC. The utilization rate is thus 10%. What should the rates be?

The cWBTC market uses a model where the base rate is 2% and the multiplier is 30%. To calculate our **borrow interest rate**:

$$\text{Borrow Interest Rate} = 30\% * 10\% + 2\% = 5.0\%$$

Next, let's assume the **reserve factor** of the WBTC market is 20%. We can now calculate the **supply interest rate**:

$$\text{Supply Interest Rate}_a = 5.0\% * 10\% * (1 - 20\%) = 0.4\%$$

For a sanity check, let's make sure that there is a net positive cash flow; that is, the protocol is not losing money:

$$
\begin{aligned}
\text{Supply} * \text{Supply Interest Rate} &\leq \text{Borrows} * \text{Borrow Interest Rate} \\
10,000 * 0.4\% &\leq 1,000 * 5.0\% \\
40 &\leq 50
\end{aligned}
$$

You can view the effect of utilization rate on the supply using this interactive graph on [the Compound WBTC market's summary page](https://compound.finance/markets/WBTC). Note that the numbers are slightly different due to the graph on the website including <TokenIcon token="COMP" /> rewards APY.

[Here is the underlying smart contract of the rate model.](https://etherscan.io/address/0xbae04cbf96391086dc643e842b517734e214d698)

### Example: Effects of large withdraws of WBTC on interest rates

Let's say that with the previous example, a whale decided to withdraw an additional 8,000 WBTC from the protocol. What happens to rates?

The new utilization factor is $(8,000+1,000)/10,000 = 90\%$, up 9x from 10%.

$$\text{Borrow Interest Rate} = 30\% * 90\% + 2\% = 29\%$$

$$\text{Supply Interest Rate}_a = 29\% * 90\% * (1 - 20\%) = 20.88\%$$

An interesting thing to note here is that the supply interest rate increased dramatically (up 5120%), but the borrow rate only increased by 480%. This is because the supply interest rate is proportional to the square of the utilization rate, whereas the borrow interest rate is only linearly proportional to the utilization rate.

### The Jump Rate model

Some markets follow what is known as the "Jump Rate" model. This model has the standard parameters:

- Base rate per year, the minimum borrowing rate
- Multiplier per year, the rate of increase in interest rate with respect to utilization

but it also introduces two new parameters:

- Kink, the point in the model in which the model follows the jump multiplier
- Jump Multiplier per year, the rate of increase in interest rate with respect to utilization after the "kink"

The borrow rate of the jump rate model is defined as follows:

$$
\begin{aligned}
\text{Borrow Interest Rate} &= \text{Multiplier} * min(U_a, \text{Kink}) \\
    &+ \text{Jump Multiplier} * max(0, U_a - \text{Kink}) \\
    &+ \text{Base Rate}
\end{aligned}
$$

### Example: USDC rate model

<figure>
    <a href="https://compound.finance/markets/USDC">
        <NextImage src="https://static.ian.pw/images/2020-12-20-usdc-rate-model.png" width="512" height="467" alt="The WBTC rate model." />
    </a>
    <figcaption>The USDC rate model is a jump rate model.</figcaption>
</figure>

The USDC rate model is a jump rate model with the following parameters:

- Base rate: 0%/yr
- Multiplier: 5%/yr
- Kink: 80%
- Jump multiplier: 109%/yr

The USDC market also has a reserve factor of 7%.

Let's say that the market has the following status:

- \$180M in borrows
- \$20M in cash

What is the borrow rate and supply rate?

Doing the math:

$$U_a = \$180M/(\$180M + \$20M) = 90\%$$

$$\text{Borrow Interest Rate} = 5\% * 80\% + 109\% * (90\% - 80\%) + 0\% = 14.9\%$$

$$\text{Supply Interest Rate}_a = 14.9\% * 90\% * (1 - 7\%) = 12.5\%$$

## Interest rate spikes

In Compound, interest rate is not locked at the price of borrowing: it continuously fluctuates based on changes in the utilization rate.

Another way interest rates could spike is if the Chief Economist decides that the interest rates should go up. This has already happened in the case of MakerDAO, where the stability fee has ranged between 0% and 8%. Fortunately, both Compound and MakerDAO have transparent processes when changing interest rates with beautiful governance dashboards and decisions voted on by governance token holders.

This is in stark contrast to the current quarterly speculation on the Fed/FOMC's decisions. Compound's decision making process on the other hand is transparent and decentralized, protecting the interests of financiers (pun intended).[^3]

### Predicting accrued interest

One can compute the total interest they will pay on a principal balance $P$ for a duration in days $t$ with the following equation:

$$\text{Total Interest} = P(1 + \frac{r}{B_y})^{B_y / 365 * t}$$

where

- $B_y = 2102400$, the number of blocks in the year, and
- $r$ is the expected value of the APR of the interest over the given period.

The number 2,102,400 assumes 15 second blocks.[^4]

### Hedging against rate hikes

Since your interest rate isn't locked in at the time of borrowing, you are be vulnerable to interest rate changes. It is important to understand how the interest rate model of your selected currency works to ensure that there are no surprise massive interest rate changes.

There are several protocols attempting to build interest rate swaps for Compound, e.g. [swaprate.finance](https://swaprate.finance/) and [Opium Protocol](https://opium.network). Interest rate swaps are essentially a way to lock in a borrowing interest rate (usually higher than spot) for a fixed period of time. This is useful if you want to remove more variables from a trading strategy.

[Aave](https://aave.com/), another pool-based lending protocol, has implemented pseudo-fixed rate swaps using an oracle to determine a likely upper bound for what average interest rates could look like over the term of the loan. This has its own problems though and an independent swap market is likely the best solution to this problem.

## Closing thoughts

Compound is a very powerful building block of the Ethereum DeFi ecosystem. Understanding the ways rates change is important in evaluating the potential performance of any leveraged position.

If you enjoyed this post and/or would like to hear more, please leave a comment below!

[^1]: Source: [Compound whitepaper](https://compound.finance)
[^2]: According to [proposal 31](https://compound.finance/governance/proposals/31), the Reserve Factor is a percentage of the borrowers paid interest which can be used by the governance or act as an insurance against borrower default which protects all the suppliers.
[^3]: Technically, this system is not immune to insider trading. A member of governance can trade before voting. Also since COMP can be borrowed on Compound, one can stake a lot of ETH, borrow COMP, place a large vote, then repay all of the COMP.
[^4]: At the time of writing Ethereum has been producing ~13 second blocks, so all annualized rates in Compound should be multiplied by approximately 15/13. Although [this number is hardcoded into the smart contract](https://etherscan.io/address/0xbae04cbf96391086dc643e842b517734e214d698#code), the rate model may be updated in the future via governance.
