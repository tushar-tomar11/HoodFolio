# Uniswap on HOOD

Liquidity for stock tokens lives in Uniswap pools on chain 4663 (V2/V3/V4
depending on what DexPaprika indexes). HoodFolio reads **prices and volume**
from DexPaprika; it does not call Uniswap quoter contracts in the UI.

Trade UI: [app.uniswap.org/?chain=robinhood](https://app.uniswap.org/?chain=robinhood)

Always match token addresses to HoodFolio's table before swapping.
