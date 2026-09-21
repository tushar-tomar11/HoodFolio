# USDG yield position

The Yield page shows your **USDG** ERC-20 balance on chain 4663 and Morpho’s
**instant net APY** for Steakhouse USDG when the Morpho API responds.

## What is USDG?

USDG (mapped as USD Gold in code, Global Dollar in product copy) is the
settlement stablecoin on Robinhood Chain at
`0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`. **Decimals: 6.**

## What HoodFolio reads

On-chain: `balanceOf(yourAddress)` via viem. APY: Morpho REST for
`4663:0xBeEff033F34C046626B8D0A041844C5d1A5409dd`. If Morpho fails, no rate
is shown.

## Deposits

Deposit and withdraw on [Morpho](https://app.morpho.org/robinhood-chain/vault/0xBeEff033F34C046626B8D0A041844C5d1A5409dd/steakhouse-usdg). See
[USDG & Morpho Earn](/yield/usdg-morpho).
