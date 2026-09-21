# Frequently asked questions

## General {#general}

### Is HoodFolio safe to use?

HoodFolio is a **read-only** web dashboard. Connecting a wallet exposes your
address so the app can call \`balanceOf\`. It does not custody funds. Signing
still happens if **you** click through to Uniswap or Morpho — read those
prompts.

### Is HoodFolio part of Robinhood Inc.?

No. It is an independent AGPL-3.0 fork of [rotki](https://github.com/rotki/rotki)
aimed at chain 4663. Not affiliated with Robinhood Markets.

### Is this tax software?

No. There is no cost-basis engine and no filing workflow.

### Can I trade from HoodFolio?

No. Trade links open Uniswap. HoodFolio does not submit swaps.

### What is DexPaprika?

A public market-data API. HoodFolio uses it for USD prices, volume, and
chain stats on network \`robinhood\`. See [DexPaprika](/data-sources/dexpaprika).

### How often do prices update?

About every **30 seconds** from the price store, plus on manual refresh.

## Wallet & Connection {#wallet}

### Why do I see 0 ETH in my balance?

Your address has no ETH on **chain 4663**. You may still hold stock tokens.
Bridge or transfer ETH for gas. See [Bridge](/getting-started/bridge).

### Why does the app say Wrong Network?

The connected wallet's chain id is not 4663. Switch or
[add the chain](/getting-started/add-chain).

### Does HoodFolio store my wallet address?

No HoodFolio account database. The address lives in the browser session.
RPC and DexPaprika still see the requests you make (normal public-chain leakage).

### Which wallets work?

MetaMask, other injected EIP-1193 wallets, and WalletConnect when a project
id is configured.

## Stock Tokens {#stock-tokens}

### What is the difference between stock tokens and real stocks?

Stock tokens are ERC-20s on Robinhood Chain that track listed names. They are
not the same as shares in a brokerage account. Issuer terms control backing
and redemption. HoodFolio does not issue them.

### Why is my token missing from Portfolio?

Only the mapped ten equities plus USDG are queried. Other ERC-20s need a
code change. See [Adding stock tokens](/contributing/adding-tokens).

### Why does USDG show 6 decimals?

USDG is configured with 6 decimals (like USDC). Stock tokens use 18. Using
the wrong exponent would display amounts off by a trillion.

### What is USDG?

The stablecoin HoodFolio maps at
\`0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168\` on chain 4663. Used as
settlement and for Morpho Earn flows.

## Premium & Discount {#premium-discount}

### Why is the premium/discount not exactly zero?

On-chain pools trade 24/7; traditional quotes are delayed session prices.
Liquidity and lag keep a spread. Under 0.1% shows as AT PAR.

### Is a discount free money?

No. Liquidity, issuer risk, and delayed quotes remain. Not financial advice.

### Are traditional quotes live NYSE?

No. They appear only if you set `FINNHUB_API_KEY` or `TWELVE_DATA_API_KEY`
on the server. Otherwise Market and Premium are hidden.

## Yield & Morpho {#yield}

### Does HoodFolio deposit into Morpho for me?

No. It links to Morpho. Approvals and deposits are signed in that UI.

### Where does APY come from?

Morpho’s public REST instant net APY for Steakhouse USDG. If the call fails,
HoodFolio shows no rate.

### I deposited but Portfolio USDG did not change.

Vault shares are not the same ERC-20 as wallet USDG. Refresh after Morpho
confirms; if HoodFolio only reads the USDG token, the wallet balance should
drop when you deposit.

## Data & Privacy {#privacy}

### Does HoodFolio store my wallet address on a server?

The dashboard is designed not to. You still use a public RPC and DexPaprika.

### What happens if DexPaprika is down?

Error + Retry. No silent fake prices.

### Can I self-host?

Yes. The Vue app and this VitePress site are open source (AGPL-3.0). Point
RPC env vars at your node if you want.
