---
title: Understanding Compound protocol's interest rates
---

<KaTeXCSS />
<NextImage src="https://static.ian.pw/images/2020-12-20-compound-banner.png" width="750" height="420" />

The [Compound protocol](https://compound.finance) is an unprecedented technological advancement in the history of finance: for the first time in history, one can borrow money and earn interest with no humans or credit involved.

Rates vary frequently, though, and it is important to understand how the protocol determines interest rates.

## The utilization rate

All interest rates in Compound are determined as a function of the utilization rate. The utilization rate $U_a$ for a money market $a$ is defined[^1] as:

$$U_a = Borrows_a / (Cash_a + Borrows_a - Reserves_a)$$

- $Borrows_a$ refers to the amount of $a$ borrowed.
- $Cash_a$ refers to the amount of $a$ left in the system.
- $Reserves_a$ refers to the amount of $a$ that Compound keeps as profit.

Intuitively speaking, this is the percentage of money borrowed out of the total money supplied.

For example: given that reserves are 0, if Alice lends \$500 USDC and Bob lends \$500 USDC, but Charles borrows \$100 USDC, the total borrows is \$100 and the total cash is $500 + 500 - 100 = 900$, so the utilization rate is $100 / (900 + 100) = 10\%$.

A high ratio signifies that a lot of borrowing is taking place, so interest rates go up to get more people to inject cash into the system. A low ratio signifies that demand for borrowing is low, so interest rates go down to encourage more people to borrow cash from the system. This follows economic theory's idea of price (the "price" of money is its interest rate) relative to supply and demand.

## Borrow and supply rates

Borrow and supply rates are calculated using the utilization rate and several arbitrary constants.

The supply rate is calculated as follows:

$$\text{Supply Interest Rate}_a = \text{Borrowing Interest Rate}_a * U_a * (1 - \text{Reserve Factor}_a)$$

where

- $U_a$ is the utilization rate of $a$
- $\text{Reserve Factor}_a$ is the percentage of the spread between the supply and borrow rates that the protocol keeps as profit
- $\text{Borrowing Interest Rate}_a$ is the interest rate that borrowers should pay for $a$.

### The Compound Standard Interest Rate Model

The borrowing rate's calculation depends on something called an **interest rate model** -- the algorithmic model to determine a money market's borrow and supply rates. In this post, I'll go over the interest rate model used for USDC and most other coins: the **Compound Standard Interest Rate Model**.

This interest rate model takes in two parameters:

- Base rate per year, the minimum borrowing rate
- Multiplier per year, the rate of increase in interest rate with respect to utilization

The graph is linear:

$$\text{Borrow Interest Rate} = \text{Multiplier} * \text{Utilization Rate} + \text{Base Rate}$$

<figure>
    <NextImage src="https://static.ian.pw/images/2020-12-20-wbtc-rate-model.png" width="512" height="467" alt="The WBTC rate model." />
    <figcaption>The WBTC rate model.</figcaption>
</figure>

### Example: USDC rates

Let's say the protocol has \$100,000,000 supplied to it and users are borrowing \$10,000,000. The utilization rate is thus 10%. What should the rates be?

The cUSDC market uses the Base200bps_Slope1000bps model, meaning that the base rate is 2% and the multiplier is 10%. To calculate our **borrow interest rate**:

$$\text{Borrow Interest Rate} = 10\% * 10\% + 2\% = 3\%$$

Next, let's assume the **reserve factor** of the USDC market is 0. We can now calculate the **supply interest rate**:

$$\text{Supply Interest Rate}_a = 3\% * 10\% * (1 - 0) = 0.3\%$$

For a sanity check, let's make sure that there is a net positive cash flow; that is, the protocol is not losing money:

$$
\begin{aligned}
\text{Supply} * \text{Supply Interest Rate} &\geq \text{Borrows} * \text{Borrow Interest Rate} \\
\$100,000,000 * 0.3\% &\geq \$10,000,000 * 3.0\% \\
\$300,000 &\geq \$300,000
\end{aligned}
$$

### Example: Effects of large withdraws of USDC on interest rates

Let's say that with the previous example, a whale decided to withdraw \$50,000,000 from the protocol. What happens to rates?

The new utilization factor is $10M/50M = 20%$, up 2x from 10%.

$$\text{Borrow Interest Rate} = 10\% * 20\% + 2\% = 4\%$$

$$\text{Supply Interest Rate}_a = 4\% * 20\% * (1 - 0) = 0.8\%$$

An interesting thing to note here is that the supply interest rate more than doubled (up 166%), but the borrow rate only increased by 33%. This is because the supply interest rate is proportional to the square of the utilization rate, whereas the borrow interest rate is only linearly proportional to the utilization rate.

## Interest rate spikes

In Compound, interest rate is not locked at the price of borrowing: it continuously fluctuates based on changes in the utilization rate.

Another way interest rates could spike is if the Chief Economist decides that the interest rates should go up. This has already happened in the case of MakerDAO, where the stability fee has ranged between 0% and 8%. Fortunately, both Compound and MakerDAO have transparent processes when changing interest rates with beautiful governance dashboards and decisions voted on by governance token holders.

This is in stark contrast to the current quarterly speculation on the Fed/FOMC's decisions. Compound's decision making process on the other hand is transparent and decentralized, protecting the interests of financiers (pun intended).

### Predicting accrued interest

One can compute the total interest they will pay on a principal balance $P$ for a duration in days $t$ with the following equation:

$$\text{Total Interest} = P(1 + \frac{r}{5760})^{5760t}$$

where $r$ is the time-weighted average APR of the interest. 5760 comes from the expected number of Ethereum blocks to be mined in one day ($24 * 60 * 60 / 15$), as this is the interval of compounding in Compound.

### Hedging against rate hikes

Since your interest rate isn't locked in at the time of borrowing, you are be vulnerable to interest rate changes. It is important to understand how the interest rate model of your selected currency works to ensure that there are no surprise massive interest rate changes.

There are several protocols attempting to build interest rate swaps for Compound, e.g. [swaprate.finance](https://swaprate.finance/) and [Opium Protocol](https://opium.network). Interest rate swaps are essentially a way to lock in a borrowing interest rate (usually higher than spot) for a fixed period of time. This is useful if you want to remove more variables from a trading strategy.

[Aave](https://aave.com/), another pool-based lending protocol, has implemented pseudo-fixed rate swaps using an oracle to determine a likely upper bound for what average interest rates could look like over the term of the loan. This has its own problems though and an independent swap market is likely the best solution to this problem.

## Closing thoughts

Compound is a very powerful building block of the Ethereum DeFi ecosystem. Understanding the ways rates change is important in evaluating the potential performance of any leveraged position.

If you enjoyed this post and/or would like to hear more, please leave a comment below!

[^1]: Source: [Compound whitepaper](https://compound.finance)
