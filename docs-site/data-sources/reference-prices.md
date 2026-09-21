# Traditional quotes (optional)

Premium/discount needs a **traditional-market last price**. Official NYSE/NASDAQ
feeds are not free to republish. HoodFolio therefore:

- Does **not** ship frozen snapshot prices (those were misleading)
- Hides Market and Premium columns until a quote API key is set
- Uses **delayed** Finnhub or Twelve Data last price when you add a key

## Configure (optional)

On Vercel, set a **server-side** env var (not `VITE_*`):

| Variable | Provider |
| --- | --- |
| `FINNHUB_API_KEY` | [Finnhub](https://finnhub.io/) free quote |
| `TWELVE_DATA_API_KEY` | [Twelve Data](https://twelvedata.com/) fallback |

The SPA calls `/api/quotes`. The function attaches the key. If neither key is
set, `/api/quotes` returns **204** and the UI shows no premium.

## What the badge means

`(onChain DexPaprika USD − delayed quote) / delayed quote`. Within 0.1% is
AT PAR. This is **not** a live NYSE NBBO.

On-chain 24h change is a separate column from DexPaprika
(`summary["24h"].last_price_usd_change`).
