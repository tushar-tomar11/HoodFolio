# Adding Stock Tokens

1. Add an entry to `STOCK_TOKENS` in
   `frontend/app/src/chain/robinhood-chain.ts` with checksum address and
   correct decimals
2. Add a logo under `frontend/app/public/stock-logos/`
3. Register logo metadata in `stock-logos.ts`
4. Confirm DexPaprika returns a price for that address on `robinhood`
5. Optional: add `FINNHUB_API_KEY` on the server if you want premium/discount vs delayed quotes
6. Document the address on this docs site

Do not list a token without a Blockscout-verified contract. Do not copy
addresses from Twitter threads.
