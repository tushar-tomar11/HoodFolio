# How it works

HoodFolio is a Vue 3 app. It never hosts your keys. Three data paths feed the UI.

## 1. Wallet connection

An injected provider (MetaMask, Rabby, Coinbase Wallet) or WalletConnect
exposes your address. HoodFolio requests **accounts** and **chain id**.
If the chain is not 4663, you see **Wrong Network**. Switching calls
`wallet_switchEthereumChain` / `wallet_addEthereumChain`.

## 2. Balances (viem)

A public client on `https://mainnet.rpc.robinhood.com` runs **multicall3**
(`0xca11bde05977b3631167028862be2a173976ca11`) for `balanceOf` on every
mapped stock token plus USDG. Native ETH uses `getBalance`. USDG is divided
by 10^6; other tokens by 10^18.

## 3. Prices and stats (DexPaprika)

USD prices, on-chain 24h change, pool volume, TVL, and transaction counts come from
the DexPaprika REST API for network `robinhood`. The price store refreshes
about every 30 seconds. Failures surface in the UI; they are not replaced
with dummy candles.

## Premium / discount

Shown only when `/api/quotes` returns live delayed quotes (Finnhub or Twelve Data).
Formula: `(onChainUsd - quoteUsd) / quoteUsd`. Within 0.1% is AT PAR. Not a live NYSE feed.

## What HoodFolio does not do

It does not broadcast swaps, deposits, or approvals. **Trade** links open
[Uniswap](https://app.uniswap.org/?chain=robinhood). Yield deposits open
[Morpho](https://app.morpho.org). Morpho APY is live from Morpho or omitted.
