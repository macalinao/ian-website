---
title: The Cryptoeconomics of EOS vs Ethereum
description: An analysis on the economic models of EOS and Ethereum and the advantages and disadvantages to both.
---

As mentioned [in a previous post](https://ian.pw/posts/2017-12-08-why-eos-will-overtake-ethereum-in-high-performance-smart-contracts.html), I believe EOS will overtake Ethereum as the smart contract platform used by the mainstream audience. Part of this is due to its economic model which encourages people to use the platform and to not sell their currency. In this post, I will argue why EOS's economic model offers more benefits to token holders than Ethereum's.

## Transaction fees

Ethereum, Bitcoin, and most other cryptocurrencies charge small costs per transaction called **transaction fees**. Why do these fees exist?

Imagine a world where there were no transaction fees. In Bitcoin and Ethereum, there is a limit to the number of transactions that can be included in a block. Thus, if I were a malicious individual who wanted the network to fail, I could make a lot of transactions between my own wallets without losing any money. However, due to the transaction limit, I would render the blockchain useless for anyone else, and it would be difficult to determine what transactions are legitimate.

However, with transaction fees, miners have an incentive to prioritize certain transactions over others, as they will make more money if they choose transactions with higher fees. In Ethereum specifically, each transaction has a certain amount of "gas" associated with it and a gas limit per block. Thus in order to raise your chance of your transaction getting accepted, you increase the gas price of your transaction.

As seen in this scenario, transaction fees exist to prevent spam. These fees are acceptable and almost expected for transferring currency. However, smart contracts do not solely encompass currency: they exist to provide a way for anyone to access a decentralized, immutable ledger of anything. It is unreasonable to have transaction fees for many applications of blockchain technology.

Consider a dApp where one can share links and text, similar to Reddit. If you had to pay a bit of currency every time you posted something, would you be motivated to add more content to the website, or would you keep your content to yourself? Let's say you had to pay a fee every time you upvoted or downvoted content-- again, would you vote if you had to pay a few cents for them?

## Proof-of-stake bandwidth allocation

EOS on the other hand has no transaction fees. This then begs the question: how does EOS prevent spam?

EOS works differently in that it allocates blockchain bandwidth based on the amount of EOS tokens one holds. That is, if you hold 1% of all tokens, you are entitled to 1% of all bandwidth of the network.

Thus if a spammer wanted to cause network congestion, they cannot exceed their total reserved bandwidth if the network is at full capacity. That is, if they hold 1% of all EOS tokens, they cannot use up more than 1% of the EOS network's total possible bandwidth. Any EOS token holder can perform operations on the blockchain since they have reserved bandwidth.

Bandwidth allocation can work two ways: using your own bandwidth or delegating bandwidth to someone else. Holding tokens gives you the ability to perform operations on the network. In the case that you do not hold any tokens, a dApp can allocate some tokens to give you bandwidth.

This model of transaction "fees" encourages hold tokens, propping prices up. In order to use the network without someone else delegating bandwidth to you, you must own tokens. In case you are not using your tokens, a bandwidth marketplace will exist: token holders can rent out their excess bandwidth to get more tokens. The only hodl factor Ethereum has is that it is a deflationary currency.

Note that in Ethereum's future, Casper proof-of-stake will encourage holding for those who would like to validate blocks. However, those that do not care about running a node will not be affected by this benefit.

Furthermore, unlike Ethereum, tokens are not spent in order to perform actions on the network. Due to this, EOS users will not be discouraged from using the network to perform various tasks, such as sending out a tweet or posting a classified. Ethereum users on the other hand must spend tokens for actions, causing users to be more reluctant to use dApps for non-financial tasks.

## But what about the miners?

One may wonder why a miner (in EOS, block producer) would process transactions without transaction fees. In Ethereum and Bitcoin, miners are incentivized to create blocks for two reasons: block reward and transaction fees.

The block reward is a guaranteed amount of tokens given to the miner of the block. This reward is specified in the rules of the blockchain. For example, in Bitcoin, a block grants the miner 12.5 bitcoins. Ethereum is a bit more complex than this but follows a similar structure.

Miners are incentivized to include transactions in blocks due to transaction fees. They include the highest fee transactions in their blocks to make more money.

Without transaction fees, why would an EOS block producer include as many transactions as possible into blocks? The answer is _voting_.

EOS has 21 block producers which process transactions into blocks on the EOS blockchain. These block producers are voted on by token holders, of which token holder voting power is based on the amount of tokens they hold.

A token holder wants the network to continue functioning, so if a block producer is not performing up to par, they would be voted off the block producer list. Token holders are incentivized to pick the best performing block producers for the task in order to increase the value of their tokens.

Block producers are paid very well for their performance (EOS has an initial 5% annual inflation), and if voted off, they lose access to all block rewards. Thus they are highly incentivized to not underperform.

## Conclusion

Compared to traditional token models, EOS encourages:

* Hodling -- EOS users want to hold tokens to rent out or gain access to more bandwidth.
* Usage of dApps -- EOS users will use the platform more because there are no transaction fees.

Its economic model is better poised to encourage activity on the platform and thus make it the dominant platform in the mainstream.

Thanks to Michael Huang, Grace Jiang, Tejas Manohar, and Andrew Tian for reading drafts of this.

_(If you liked this post, [join our crypto Discord!](https://discord.gg/5AkBWSY))_
