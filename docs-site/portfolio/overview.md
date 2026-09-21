# Portfolio overview

The **Portfolio** route is a brokerage-style snapshot of mapped tokens on
chain 4663 for the connected address.

## What you see

- Native **ETH** from `eth_getBalance`
- Each stock token with balance &gt; 0
- **USDG** with 6-decimal formatting
- USD value using DexPaprika prices
- Premium/discount vs the stored NYSE/NASDAQ reference

Empty wallets see an onboarding card (add chain, connect, then buy on Uniswap)
instead of fake demo holdings.

## How balances are read

`useWalletStore` plus a viem public client multicall `balanceOf` for
addresses in `STOCK_TOKENS`. Nothing is written to IndexedDB as a
portfolio of record — refresh re-reads the chain.

## USD values

`balance * priceUsd`. If DexPaprika is down, quantities may still show
with a price error. HoodFolio will not invent a last price.

Next: [Stock token holdings](/portfolio/stock-holdings).
