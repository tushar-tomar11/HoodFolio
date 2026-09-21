# Premium & Discount Explained

The premium/discount indicator is HoodFolio's signature feature.
It shows whether a stock token is trading above or below its
traditional market price on NYSE or NASDAQ.

## What is a premium?

A **premium** means the stock token costs MORE on Robinhood Chain
than the same company's shares cost on the traditional stock market.

**Example:**

- NVDA on NYSE: $142.18
- NVDA on Robinhood Chain: $142.86
- Premium: +0.48%

You are paying 0.48% more to buy NVDA on-chain versus buying
the listed share through a traditional broker.

## What is a discount?

A **discount** means the stock token costs LESS on Robinhood Chain
than the traditional market price.

**Example:**

- TSLA on NASDAQ: $211.42
- TSLA on Robinhood Chain: $210.92
- Discount: -0.24%

You can buy TSLA 0.24% cheaper on-chain than through a traditional broker.

## Why do premiums and discounts exist?

Several factors cause on-chain price to deviate from traditional market price:

**1. Market hours**
Traditional stock markets are open Mon-Fri, 9:30am–4:00pm ET.
Robinhood Chain trades 24/7. When traditional markets are closed,
prices diverge because supply and demand are different.

**2. Arbitrage lag**
When traditional prices move, traders on Robinhood Chain
rebalance Uniswap pools. This lag is typically minutes to hours.

**3. Liquidity differences**
On-chain pool liquidity is smaller than NYSE/NASDAQ.
Large trades have more price impact on-chain.

**4. Access premium**
Sometimes traders pay extra for 24/7 access and wallet-native settlement
that a cash equity account does not offer.

## How the calculation works

```
premium = (onChainPrice - referencePrice) / referencePrice × 100
```

HoodFolio uses:

- **On-chain price**: DexPaprika USD price for the token on network `robinhood`
- **Reference price**: NYSE/NASDAQ last-check constants stored in the app

Values within **0.1%** are labeled **AT PAR**.

::: warning Reference prices
Reference prices are updated periodically, not tick-by-tick from NYSE.
They represent traditional-market prices at HoodFolio's last check.
The badge is informational, not a live NBBO. It is not financial advice.
:::

## Reading the badge

| Badge | Color | Meaning |
|-------|-------|---------|
| ▲ PREMIUM | Amber | On-chain is more expensive than the reference |
| ▼ DISCOUNT | Green | On-chain is cheaper than the reference |
| AT PAR | Grey | Absolute difference is less than 0.1% |

The same math appears on the ticker, the stocks table, and the portfolio
when you have a balance. See also [Premium vs Discount](/stocks/premium-discount)
for how to use it when trading on Uniswap.

## Should I care?

If you are **buying** a stock token, a discount means the pool is cheaper
than the stored reference; a premium means you pay extra for on-chain access.
If you are a **long-term holder**, small gaps matter less as pools mean-revert.
HoodFolio does not execute trades — it only displays the spread.
