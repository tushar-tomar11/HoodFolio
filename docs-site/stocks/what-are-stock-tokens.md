# What are Stock Tokens?

On Robinhood Chain, **stock tokens** are ERC-20 contracts whose market price
tracks a listed US name (for example NVDA or TSLA). They trade in Uniswap
pools against ETH or USDG, 24/7.

## They are not NYSE shares in your brokerage

A token in your wallet is not the same legal instrument as a share held at
a broker. Issuance, backing, and redemption are defined by the **issuer**,
not by HoodFolio. HoodFolio only reads `balanceOf` and pool prices.

## How HoodFolio treats them

Each mapped token has `symbol`, `name`, `address`, and `decimals: 18`
in `robinhood-chain.ts`. The stocks table shows DexPaprika `price_usd` and
on-chain 24h. Premium/discount is computed only against a live delayed quote
API, not a stored NYSE constant.

## Buying and selling

Use [Uniswap](https://app.uniswap.org/?chain=robinhood). HoodFolio's Trade
button is a link, not a built-in router. You need ETH for gas.

See [Supported tokens](/stocks/supported-tokens) and
[Contract addresses](/stocks/contract-addresses).
