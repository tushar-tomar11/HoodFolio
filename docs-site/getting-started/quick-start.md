# Quick Start Guide

Get from zero to viewing your Robinhood Chain portfolio in under 5 minutes.

## Step 1 — Open HoodFolio

Navigate to [hoodfolio.online](https://hoodfolio.online).
You'll see the stock ticker scrolling at the top — on-chain DexPaprika prices
(and 24h change when DexPaprika returns it). HoodFolio is **not** Robinhood
Markets, Inc.

HoodFolio is a **read-only** dashboard. It does not custody assets, create
accounts, or submit swaps. Everything you see is fetched from chain 4663 and
from [DexPaprika](/data-sources/dexpaprika).

## Step 2 — Add Robinhood Chain to MetaMask

If you haven't added Robinhood Chain to MetaMask yet:

1. Click **Add Robinhood Chain** on the homepage
2. MetaMask will prompt you to add the network — click **Approve**
3. Network details are added automatically:

| Field | Value |
|-------|-------|
| Network name | Robinhood Chain |
| RPC URL | `https://mainnet.rpc.robinhood.com` |
| Chain ID | `4663` |
| Symbol | ETH |
| Explorer | `https://robinhoodchain.blockscout.com` |

You can also add the chain by hand. See [Add Robinhood Chain to MetaMask](/getting-started/add-chain).

## Step 3 — Connect Your Wallet

Click **Connect Wallet** in the top-right corner.
A modal will appear showing supported wallets:

- MetaMask (recommended)
- Rabby
- Coinbase Wallet
- WalletConnect (any mobile wallet)

Select your wallet and approve the connection request.
Once connected, the navbar shows your address and ETH balance on chain 4663.

::: tip Read-only connection
HoodFolio only reads data from your wallet. It never requests
transaction signing unless you explicitly click a "Trade on Uniswap" link.
:::

## Step 4 — View your portfolio

Navigate to **Portfolio** in the top nav.

If you have stock tokens on Robinhood Chain, you'll see them listed
in a brokerage-style table with:

- Current balance and USD value
- 24h price change
- On-chain 24h change from DexPaprika
- Premium/discount only when a traditional quote API is configured

If your wallet is empty, HoodFolio shows a guide to getting started
with stock tokens on the chain. An empty portfolio is not an error —
it means viem read zero ERC-20 balances for the mapped token list.

## Step 5 — Explore the Stock Markets

Click **Stocks** to see all supported tokenized equities with live
on-chain prices and premium/discount data. Ten names are mapped today:
NVDA, TSLA, AAPL, MSFT, AMZN, GOOGL, META, COIN, SPY, and QQQ.

## That's it

You're now tracking your Robinhood Chain portfolio. Prices refresh
automatically every 30 seconds from DexPaprika. Chain stats (pool liquidity,
24h volume, 24h transactions) use the same API and show a Retry control if
the request fails — HoodFolio never invents a fallback number.
