# USDG yield position

The Yield page shows your **USDG** ERC-20 balance on chain 4663 and any
**advertised** Morpho Earn APY HoodFolio is configured to display.

## What is USDG?

USDG (mapped as USD Gold in code, Global Dollar in product copy) is the
settlement stablecoin on Robinhood Chain at
`0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`. **Decimals: 6.**

## What HoodFolio reads

On-chain: `balanceOf(yourAddress)` via viem. It does **not** currently
treat a Morpho vault share price as TVL of "your earn position" unless that
read is explicitly implemented. Advertised APY is labeled advertised so it
is not confused with a live vault APR from the contract.

## Deposits

Deposit and withdraw on [Morpho](https://app.morpho.org). See
[USDG & Morpho Earn](/yield/usdg-morpho).
