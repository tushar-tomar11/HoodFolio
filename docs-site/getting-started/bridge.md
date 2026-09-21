# Bridge ETH to Robinhood Chain

Robinhood Chain uses **ETH** for gas. Stock tokens and USDG cannot pay
Uniswap fees. If the navbar shows **0 ETH**, you cannot swap until you
bridge or transfer ETH to 4663.

## Why you need ETH

Every Uniswap swap and Morpho deposit is an L2 transaction. Block time is
about 100ms, but the wallet still needs a non-zero ETH balance.

## How to get ETH onto 4663

Use the official bridge or transfer path published by Robinhood Chain /
Arbitrum Orbit documentation for this network. HoodFolio does **not** embed
a bridge UI and will not ask you to sign a bridge transaction.

After ETH arrives:

1. Switch MetaMask to chain 4663
2. Refresh HoodFolio
3. Confirm the navbar ETH amount updates from the RPC

::: warning Verify the destination chain
Bridging to Ethereum mainnet or Arbitrum One will not fund gas on 4663.
Always confirm the destination chain id is **4663** in the bridge UI.
:::

## Stock tokens without ETH

You can still **view** ERC-20 balances and premium/discount with 0 ETH.
You cannot trade until gas is funded.
