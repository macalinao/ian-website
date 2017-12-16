---
title: The Cryptoeconomics of EOS vs Ethereum
---

As mentioned [in a previous post](https://ian.pw/posts/2017-12-08-why-eos-will-overtake-ethereum-in-high-performance-smart-contracts.html), I believe EOS will overtake Ethereum as the smart contract platform used by the mainstream audience. Part of this is due to its economic model, encouraging people to use the platform and to not sell their currency. In this post, I will argue why EOS's economic model is superior to Ethereum's.

## Transaction fees

In order to understand EOS's economic model, one must first understand the reason behind Ethereum's transaction fees.

Imagine a world where there were no transaction fees. In Bitcoin and Ethereum, there is a limit to the number of transactions that can be included in a block. Thus, if I were a malicious individual who wanted the network to fail, I could make a lot of transactions between my own wallets without losing any money. However, due to the transaction limit, I would render the blockchain useless for anyone else, and it would be difficult to determine what transactions are legitimate.

However, with transaction fees, miners have an incentive to prioritize certain transactions over others, as they will make more money if they choose transactions with higher fees. In Ethereum specifically, each transaction has a certain amount of "gas" associated with it and a gas limit per block. Thus in order to raise your chance of your transaction getting accepted, you increase the gas price of your transaction.

As seen in this scenario, transaction fees exist to prevent spam. These fees are acceptable and almost expected for transferring currency. However, smart contracts do not solely encompass currency: they exist to provide a way for anyone to access a decentralized, immutable ledger of anything. It is unreasonable to have transaction fees for many applications of blockchain technology.

Consider a dApp where one can share links and text, similar to Reddit. If you had to pay a bit of currency every time you posted something, would you be motivated to add more content to the website, or would you keep your content to yourself? Let's say you had to pay a fee every time you upvoted or downvoted content-- again, would you hand out votes if you had to pay a few cents for them?

## Proof-of-stake bandwidth allocation

EOS works differently in that it allocates blockchain bandwidth based on the amount of EOS tokens one holds. That is, if you hold 1% of all tokens, you are entitled to 1% of all bandwidth of the network.

Bandwidth allocation can work two ways: using your own bandwidth or delegating bandwidth to someone else. Holding tokens gives you the ability to perform operations on the network. In the case that you do not hold any tokens, a dApp can allocate some tokens to give you bandwidth.

This model of transaction "fees" encourages hodling tokens, propping prices up. In order to use the network without someone else delegating bandwidth to you, you must own tokens. In the case that you are not using your tokens, a bandwidth marketplace will exist: token holders can rent out their excess bandwidth to get more tokens. The only hodl factor Ethereum has is that it is a deflationary currency.

Note that in Ethereum's future, Casper proof-of-stake will encourage hodling for those who would like to validate blocks. However, those that do not care about running a node will not be affected by this benefit.

Furthermore, unlike Ethereum, tokens are not spent in order to perform actions on the network. Due to this, EOS users will not be discouraged from using the network to perform various tasks, such as sending out a tweet or posting a classified. Ethereum users on the other hand must spend tokens for actions, causing users to be more reluctant to use dApps for non-financial tasks.

## But what about the miners?

One may wonder why a miner (in EOS, block producer) would process transactions for free. The answer is simple: voting.

EOS has 21 block producers which process transactions into blocks on the EOS blockchain. These block producers are voted on by token holders, of which token holder voting power is based on the amount of tokens they hold.

A token holder wants the network to continue functioning, so if a block producer is not performing up to par, they would be voted off the block producer list. Token holders are incentivized to pick the best block producers for the task in order to increase the value of their tokens. If voter turnout is low, it does not matter as long as large token holders are making votes. With the 500th largest token holder [currently holding $1M worth of EOS](http://eoschart.com/), this is likely.

Block producers are paid very well for their performance (EOS has 5% inflation first year, 2% each year afterwards), and if voted off, they lose access to all block rewards. Thus they are highly incentivized to not underperform.

## Conclusion

Unlike Ethereum's token model, EOS encourages:

* hodling -- via token rental and bandwidth allocation
* usage of dapps -- Ethereum hodlers do not want to spend their tokens on transaction fees

Read more on this anti-spam model from Dan Larimer, creator of EOS: [How to build a Decentralized Application without Fees](http://bytemaster.github.io/article/2016/02/10/How-to-build-a-decentralized-application-without-fees/).

*(If you liked this post, [join our crypto Discord!](https://discord.gg/5AkBWSY))*
