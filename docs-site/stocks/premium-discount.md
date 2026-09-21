# Premium vs Discount

This page is the **markets** view of the same formula documented in
[Portfolio → Premium & Discount](/portfolio/premium-discount).

On **Stocks**, every mapped equity shows on-chain USD (DexPaprika) and
**on-chain 24h** from DexPaprika. Traditional quote and premium/discount
columns appear only when `/api/quotes` has a Finnhub or Twelve Data key.

## Using it to trade

A DISCOUNT does not mean "risk-free cheaper Tesla." Liquidity, hours, and
issuer terms differ from NASDAQ. A PREMIUM does not mean the token is
broken — weekend trading often gaps.

## AT PAR

If `abs(premium) < 0.1%` HoodFolio prints AT PAR in grey. That threshold
is a product choice, not an exchange rule.

See [Traditional quotes](/data-sources/reference-prices).
