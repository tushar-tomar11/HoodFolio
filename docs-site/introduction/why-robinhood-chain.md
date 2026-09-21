# Why Robinhood Chain?

Robinhood Chain (chain ID **4663**) is an Arbitrum Orbit L2 where tokenized
US equities and **USDG** trade continuously. HoodFolio exists because a
normal Ethereum portfolio tracker does not know those token addresses,
decimals, or Uniswap pools.

## What the chain is for

Issuers list ERC-20 tokens that track names such as NVDA, TSLA, and AAPL.
Settlement is on-chain. Gas is **ETH**. The public RPC is
`https://mainnet.rpc.robinhood.com`. The explorer is
[Blockscout](https://robinhoodchain.blockscout.com).

Traditional brokers still handle cash equities on NYSE/NASDAQ. HoodFolio
does **not** replace a brokerage account. It shows the **on-chain** side:
balances via viem, prices via DexPaprika, and a premium/discount versus a
stored NYSE/NASDAQ reference.

## Why a dedicated dashboard

Generic explorers show raw ERC-20 transfers. They do not:

- Map the ten HoodFolio stock tokens with company names and logos
- Treat USDG as **6 decimals**
- Compute premium vs discount
- Surface DexPaprika 24h volume for chain 4663

HoodFolio is forked from [rotki](https://github.com/rotki/rotki) (AGPL-3.0)
and stripped down to this chain. It is not affiliated with Robinhood Markets.

## Who should use it

Use HoodFolio if you already hold stock tokens or USDG on chain 4663, or if
you want public market stats without connecting a wallet. Do not use it as
tax software or as a trading terminal — swaps happen on Uniswap.

See [How it works](/introduction/how-it-works) and
[Network details](/robinhood-chain/network).
