---
title: Why EVM chains can never be as fast as Solana
description: In this post, I explore the different design decisions Solana has made to be the fasted blockchain in the world.
tags:
  - DeFi
  - Finance
  - Crypto
hasMath: true
banner:
  alt: Solana logo
  width: 1400
  height: 788
  src: https://static.ian.pw/images/black-hole.jpg
draft: true
---

Solana is fast. Why can't the EVM get to the same speed?

## Non-native instructions

### Native vs virtual instruction sets

When a computer runs programs, it does not look at code and know what to do. Instead, the code must be compiled into a series of instructions which are processed by the central processing unit, or CPU. If you've recently migrated to an [M1 Mac](https://en.wikipedia.org/wiki/Apple_M1), you'll quickly notice that there are several programs that do not run on your new computer. This is because the M1 Mac uses the [ARM](https://en.wikipedia.org/wiki/ARM_architecture) instruction set, whereas the Intel-based Macs use [x86](https://en.wikipedia.org/wiki/X86).

Instruction sets may be specialized to a specific purpose. For example, [here's a graphics card](http://developer.amd.com/wordpress/media/2012/10/R700-Family_Instruction_Set_Architecture.pdf)'s instruction set. It contains special operations for loading textures and vertices, since the hardware is specialized for 3D rendering.

However, there are instruction sets that do not correspond to instructions that the CPU hardware can directly interpret. These are generally referred to as _virtual machines_, because unlike physical machines, their instruction set architecture does not correspond directly to hardware.

Despite the indirection from machine code to virtual code, virtual machines are not always slow. The Java Runtime Environment, which processes Java Virtual Machine (or JVM) instructions, is able to operate at near native speeds due to a technique known as _just-in-time compilation_, or JIT. What the JRE does is it takes the opcodes of a JVM program and converts them to native machine instructions "just in time" for execution. When the program or function is executed, there is no longer overhead in processing individual instructions.

Runtimes not based around instruction set architectures do this as well, such as [the V8 JavaScript runtime](https://v8.dev/docs/turbofan) found in Google Chrome and Node.js.

### Shortcomings of the EVM

The Ethereum virtual machine processes [instructions](https://ethereum.github.io/yellowpaper/paper.pdf) for each Ethereum transaction. These instructions are not executed natively on a computer; instead, they are [interpreted](https://github.com/ethereum/go-ethereum/blob/94451c2788295901c302c9bf5fa2f7b021c924e2/core/vm/interpreter.go) by block producers. On Ethereum, this is miners, and for other EVM chains, these are validators.

However, Ethereum cannot easily benefit from JIT compilation.

Each opcode is associated with a [cost](https://github.com/ethereum/go-ethereum/blob/97ce6dfa6d425ba4b76278627a91c7285d6d00b2/params/protocol_params.go#L21), meaning that

On the EVM, transactions are metered by a virtual machine.

Possible optimizations:

- JIT compilation
- A new instruction set. This however means that we are no longer using the EVM.

## Serial processing

Blockchains are linear finite state machines; that is, they have a state, and for each transaction they process, the state is modified.

Solana is able to process transactions in parallel due to [Sealevel](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192): a runtime that knows what storage will be mutated and which ones will merely be read.

The EVM, on the other hand, is not as elegant: it d

## Cross-shard communication

There is a hack to have infinite TPS: to shard.

Imagine if

In this post, I explore the different design decisions Solana has made to be the fasted blockchain in the world.
