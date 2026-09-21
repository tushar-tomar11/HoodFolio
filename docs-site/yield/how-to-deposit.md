# How to Deposit

1. Hold **USDG** on chain 4663 (swap on Uniswap if you only have ETH/WETH)
2. Open [Morpho](https://app.morpho.org) from HoodFolio Yield
3. Confirm you are on **Robinhood Chain**
4. Deposit USDG into the Earn vault Morpho shows for this network
5. Return to HoodFolio and refresh — wallet USDG will drop if you deposited
   from the same address; vault shares may not appear until HoodFolio adds
   that read

HoodFolio never constructs the deposit calldata.

::: warning Approvals
Morpho will ask the wallet to `approve` USDG. That signature is **not**
initiated by HoodFolio. Read the spender on Blockscout.
:::
