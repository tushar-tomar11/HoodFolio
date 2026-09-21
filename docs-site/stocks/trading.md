# Trading on Uniswap

HoodFolio does not execute swaps. Every **Trade** control is an outbound
link to Uniswap with `chain=robinhood`.

## Checklist before you sign

1. Wallet network is **4663**
2. You have **ETH** for gas
3. Token address matches [the table](/stocks/contract-addresses)
4. You understand premium/discount vs the NYSE reference is **not** a
   guaranteed arbitrage

Uniswap routing, slippage, and MEV are Uniswap's UI, not HoodFolio's.

## After a swap

Wait for the ~100ms block, then refresh HoodFolio. The portfolio multicall
will pick up the new `balanceOf`. Prices still come from DexPaprika.

Official UI: [app.uniswap.org/?chain=robinhood](https://app.uniswap.org/?chain=robinhood).
