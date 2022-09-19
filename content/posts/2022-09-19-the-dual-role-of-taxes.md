---
title: The Dual Role of Taxes
description: "Taxes serve two purposes: to raise revenue and to influence behavior."
tags:
  - tax
  - governance
  - economics
---

The most intuitive reason for taxes to exist is to help pay for common services
and public goods that everyone uses. This is why many people love to tax the
rich: it seems fair to ask the people who can afford it to pay more for the
things that everyone uses.

However, not all taxes are created equal. A tax that is only designed to
maximize revenue can have detrimental effects on the economy. For example: let's
say that sales tax was increased to 50%. While on paper it may seem that revenue
may increase by X%, in reality the amount of sales in the economy may decrease
making the total amount of revenue lower after the tax is instated.

Now, let's say that our goal as a government is to reduce the amount of carbon
emissions from cars on the road. We could apply a _selective sales tax_ to gas,
which would increase the price of gas and reduce the amount of gas that people
buy. The direct effect of this would be that people would use less gas.

- For city dwellers, this could result in people using public transportation
  more often, since both personal and ride sharing would be more expensive.
- For rural/suburban commuters, this could result in either moving to cities
  (which reduces the amount of cars on the road) or using electric cars.
- For businesses which rely on gas to operate, e.g. tractors or delivery trucks,
  this could result in them switching to electric vehicles. This can hurt
  businesses in the short term, but the government can aid the transition via
  [subsidies](https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans).

The point is that taxes can be used to influence behavior in addition to raising
revenue. This is why it's important to understand the effects of a tax before
implementing and/or voting for it.

## How this applies to protocols

Protocols are a form of governance, and as such they can use taxes to influence
user behavior. This is already implemented in many layer one blockchains:

- A tax on transactions to discourage spam. This already exists in the form of
  transaction fees.
- A tax on storage, to discourage state bloat. This exists in Solana in the form
  of rent, and on Ethereum in the form of storage/storage refunds.
- A tax on CPU resources, to encourage developers to optimize their code.

These also exist in the DeFi space:

- Automated market makers give fees to liquidity providers from traders crossing
  a protocol-defined spread between the bid and the ask, which is usually
  referred to as the "trade fee". For example, Uniswap V2 has a 0.3% spread on
  every pool.
  - 1/6 of this may be taken by the Uniswap protocol.
- Borrowers of borrow-lend markets pay interest to depositors, usually based on
  the [utilization
  rate](./2020-12-20-understanding-compound-protocols-interest-rates) of the
  lending market.
  - A percentage of the spread goes to the DAO.

Understanding the effects of taxes is important for protocol designers, since
they can be used to influence user behavior. For example, if a protocol wants to
encourage users to use a specific token, it can give a tax rebate to users who
use that token-- e.g., a stablecoin might buy a lot of governance power to make
it cheaper to use their stablecoin.

## Other Thoughts/Conclusion

I was inspired to write this post by [a short YouTube video about Singapore's
public transit system](https://youtu.be/vyfJgJBB3Vk). They impose a very high
tax on cars: a Honda Civic costs over $100k USD equivalent. This has resulted in
a lot of people using public transit, which has reduced traffic and pollution
and has increased the utilization/ROI of investing in the public transportation
system.

Taxes are an age-old tool for governments to influence behavior. We may be able
to rely on tested economics to help us design better systems for capturing
value.
