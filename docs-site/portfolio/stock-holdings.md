# Stock token holdings

Holdings are the ten mapped equities in `STOCK_TOKENS` (NVDA, TSLA, AAPL,
MSFT, AMZN, GOOGL, META, COIN, SPY, QQQ). USDG is listed separately because
it is a stablecoin with 6 decimals.

## Table columns

Typical columns: token (logo + symbol), balance, on-chain USD price,
USD value, 24h change, premium/discount, trade link.

Logos are local files under `public/stock-logos/` to avoid Clearbit CORS
failures. Missing images fall back to a letter tile.

## Zero balances

Tokens at zero are omitted so the table looks like a statement, not a
directory. The full directory is on **Stocks**.

## Trade

**Trade** opens Uniswap with `chain=robinhood`. HoodFolio does not set
amount or route. Verify the token address on Blockscout before signing.
