# Premium & Discount Explained

The premium/discount indicator compares **on-chain DexPaprika USD** to a
**delayed traditional quote** when you have configured Finnhub or Twelve Data.
If that API is not configured, HoodFolio **hides** the badge instead of using
a frozen snapshot.

## Formula

```
premium = (onChainPrice - traditionalQuote) / traditionalQuote × 100
```

Values within **0.1%** are labeled **AT PAR**. The quote is delayed and is
**not** a live NYSE NBBO.

## Why spreads exist

On-chain pools trade 24/7; cash markets have sessions. Liquidity and lag
keep a spread. A discount is not free money.

## Reading the badge

| Badge | Color | Meaning |
|-------|-------|---------|
| ▲ PREMIUM | Amber | On-chain is more expensive than the delayed quote |
| ▼ DISCOUNT | Green | On-chain is cheaper than the delayed quote |
| AT PAR | Grey | Absolute difference is less than 0.1% |

See [Traditional quotes](/data-sources/reference-prices).
