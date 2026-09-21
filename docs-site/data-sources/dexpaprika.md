# DexPaprika API

HoodFolio uses [DexPaprika](https://dexpaprika.com) as its primary price
data source for Robinhood Chain token prices, pool volume, and chain stats.

## Why DexPaprika?

- **Free** — no API key required for the public REST API
- **No signup** — works from the browser (HoodFolio proxies in Vite during local dev)
- **Robinhood network id** — `robinhood` in path params
- **DEX coverage** — Uniswap-style pools on chain 4663

HoodFolio never silently substitutes a hardcoded NVDA or TSLA price if DexPaprika
is down. The UI shows an error and a **Retry** button instead.

## Endpoints used by HoodFolio

### Batch token prices

```http
GET https://api.dexpaprika.com/networks/robinhood/multi/prices?tokens={addr1},{addr2}
```

Returns USD prices for a batch of token addresses.
The app maps those USD amounts onto the ten stock tokens plus USDG.

**Response shape:**

```json
[
  { "id": "0x322f...", "chain": "robinhood", "price_usd": 212.15 },
  { "id": "0xd060...", "chain": "robinhood", "price_usd": 141.88 }
]
```

### Token 24h change

```http
GET https://api.dexpaprika.com/networks/robinhood/tokens/{address}
```

`summary["24h"].last_price_usd_change` is the **on-chain** 24h percent.
HoodFolio never treats this as an NYSE session change.

### Pool OHLCV

```http
GET https://api.dexpaprika.com/networks/robinhood/pools/{pool}/ohlcv?interval=1h&limit=24
```

Used for sparklines when a primary USDG pool exists. Empty history means no sparkline — never fake bars.

### Top pools by volume

```http
GET https://api.dexpaprika.com/networks/robinhood/pools?order=desc&sort=volume_usd
```

Used on Analytics and the meme-coin / pool views. Ranking is 24h volume from
DexPaprika, not a made-up leaderboard.

### DEX / chain statistics

Chain-wide **pool liquidity**, **24h volume**, and **24h transaction count**
on the Overview strip come from DexPaprika aggregates. If the request fails,
those four cards show an error state — except **Stock tokens**, which is the
length of the local `STOCK_TOKENS` map (currently 10 equities).

## Caching

Prices refresh on a 30-second timer in the Pinia price store. The Vite
dev server proxies `/dexpaprika` to avoid browser CORS. Production must
keep that proxy or an equivalent.

## Rate limits

HoodFolio batches token addresses and avoids refetching on every keystroke.
Do not scrape DexPaprika from a tight loop in a fork without reading their
current terms.

## Fallback behavior

If DexPaprika is unavailable, HoodFolio shows an error state with
**Retry**. It never falls back to hardcoded prices silently.
::: tip Related
Balances still come from [viem RPC reads](/data-sources/viem-rpc) even when
prices fail. You may see token quantities without USD until prices recover.
:::
