# Reference Prices (NYSE/NASDAQ)

Premium/discount needs a **traditional-market** reference. In the current
HoodFolio build those references are **constants updated periodically**, not
a streaming NYSE feed and not Chainlink.

## Implications

- After a violent cash-market move, the badge can be stale
- Weekends and nights, on-chain price moves while the reference sits
- AT PAR uses a 0.1% band around that stale reference

::: warning Not a live NBBO
Do not trade as if HoodFolio's reference is the official last sale.
When production adds Chainlink or another oracle, this page should be
updated to name the feed.
:::
