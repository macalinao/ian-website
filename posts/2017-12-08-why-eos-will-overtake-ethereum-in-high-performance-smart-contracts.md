---
title: Why EOS will overtake Ethereum in high performance smart contracts
---

I've always been a huge fan of Ethereum; however, it has some shortcomings, as recently made evident by [CryptoKitties](http://www.bbc.com/news/technology-42237162).

## Ethereum vs EOS

There are many problems with Ethereum in its current state that EOS has solutions for, which I will list some of below.

### Scalability/Speed

Ethereum can only handle ~23 transactions per second (TPS) on average. Larger transactions require more gas fees, so this could be less. This is due to block size limits: larger blocks cannot be processed by all nodes, so Ethereum resorts to using smaller blocks in favor of decentralization.

Furthermore, the Ethereum block time is around 30 seconds, which will be reduced to around 5-7 seconds when PoS is introduced. **You may have a lag of up to 30 seconds after every action.** This prohibits many types of applications that require more real-time feedback, e.g. decentralized asset exchange.

EOS has a projected TPS of 100k/sec and a block time of 2 seconds on the testnet with a target time of 500ms on the mainnet. EOS can do this because it uses an algorithm called DPOS (delegated proof of stake) which basically lets you vote for "delegates" to process the blockchain for you. These delegates can be massive datacenters that can process many transactions in parallel, unlike Ethereum which is built to run on anything.

### Contract execution fees

In order for one to use a dApp, one must pay gas fees in order to perform an action. This requires people to buy Ether, which can be a barrier to entry for those that do not already have Ether. For example, if I decided to make a decentralized Wikipedia where every edit appended some sort of pointer to the blockchain, I would have to pay a fee in order to make my edit. Although the fee may be small, it is still a fee that needs to be dealt with.

However, with EOS, there are no such fees. The "fees" (which are not actually transaction fees, explained in next section) are paid by the dApp, so the user does not need to own any EOS in order to be able to use an application. This is great for having new, non-crypto people adopt the platform.

As someone with no knowledge of crypto other than the word "Bitcoin", would you rather register an account on [Steemit](https://steemit.com) **just like you do on other websites** and post your content **just like you do on other websites**, or would you rather download Metamask, buy Ether on Coinbase, transfer said Ether to your wallet 10 days after you bought it, and then pay a few cents to post your content, waiting 30 seconds before it shows up?

### The "hodl" factor

As an investor, it is generally better to own things that people will not want to sell. There is an analogy where Bitcoin is gold, Ethereum (Ether) is oil, and EOS is real estate.

Bitcoin is gold because you want to buy it once and keep it for a long time. There is no inherent value in it other than scarcity, as it is not even viable as a payments platform. Transaction fees are increasing dramatically.

Ether is oil because you use it to buy gas. If you ever need to execute a transaction on the Ethereum network, whether that is token transfer or contract execution, you must pay Ether for it.

EOS is real estate because it works in a completely different way from Bitcoin or Ethereum: token holders get a percentage of the bandwidth of the EOS network relative to their total share of the tokens. If EOS can handle 100k TPS and you hold 1% of tokens, you are reserved 1k TPS. The only cost to developing your dApp is purchasing tokens in the first place. Furthermore, if you are not a dApp developer, you can rent your stake in the network, allowing you to collect interest on your stake.

EOS encourages people to buy and hold their tokens-- not just for speculation, but because they need to in order to reserve network bandwidth.

### Other factors

Many other factors are much smaller but still make EOS really appealing:

* **Account system** Use a username rather than some weird hexadecimal string.
* **Storage** IPFS-based storage works by replicating files across all 21 delegates. This is an insane level of redundancy, and these nodes are already trusted. Ethereum has no file storage built in.
* **WASM** Rather than writing Solidity, you write C++ (officially supported) or any language that compiles to WASM.

## EOS "Shortcomings"

Now, EOS is not completely better than Ethereum. From the [Ethereum wiki](https://github.com/ethereum/wiki/wiki/Sharding-FAQ), Buterin's scalability trilemma states that blockchain systems can only at most have two of the following three properties: decentralization, scalability, and security.

EOS is scalable and secure, but it sacrifices decentralization, which Buterin defines as "the system being able to run in a scenario where each participant only has access to O(c) resources, ie. a regular laptop or small VPS". The question is: is decentralization really necessary? Is it really a core value of blockchain technology?

Now, the Wikipedia definition of decentralization is quite different:

> Decentralization is the process of distributing or dispersing functions, powers, people or things away from a central location or authority.

Having massive block producers is not decentralized in Vitalik's definition, but it is definitely decentralized by the Wikipedia definition. Block producers can be and will be anyone token holders decide to vote for.

*If you'd like to read the debate between Vitalik and Dan, see [Vitalik's criticism](https://np.reddit.com/r/ethereum/comments/6qm0y2/is_the_ethereum_team_defending_their_ground/dkyk94c/) and [Dan's response](https://steemit.com/eos/@dan/reponse-to-vitalik-s-written-remarks).*

There is also the looming factor that EOS may not deliver on its promises. Unlike most of the other major cryptocurrencies currently on the market, they do not have a mainnet deployed-- EOS is currently an ERC20 token that you can later redeem for "real" EOS in the future. Although the testnet is out, they have a way to go before building the 100K TPS platform they promised. Their ICO is uncapped, meaning that they are collecting as much money as they can for their ICO-- many consider this to be a "scammy" play.

However, the lead developer of EOS, Daniel Larimer, has built two other extremely successful DPOS platforms (Bitshares and Steem) with proven technology, and I am confident that he and his team will be able to execute on their vision, especially with $1B worth of funding.

## Ethereum has its place

I believe Ethereum makes sense for things that do not require mainstream adoption and/or high TPS, i.e. as a "settlement layer". It is more decentralized than EOS and suited for things that need that. However, for things like social networks or real time matchmaking, I believe EOS will find significant traction.
