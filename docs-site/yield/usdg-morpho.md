# USDG & Morpho Earn

Robinhood-style **Earn** on this chain is associated with **Morpho** vaults
and **USDG**. HoodFolio links to [app.morpho.org](https://app.morpho.org)
and reads your **wallet USDG** on chain 4663.

## What is on-chain vs advertised

- **On-chain USDG**: `balanceOf` at `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`, 6 decimals
- **Advertised APY**: a figure shown in the app and labeled advertised so it
  is not mistaken for a live vault share-price APY unless that call exists

Do not treat HoodFolio as a Morpho portfolio manager. Vault shares, caps,
and withdrawal queues live on Morpho.

## Safety

USDG and Morpho contracts can change. Verify addresses on Blockscout.
HoodFolio will not sign `approve` or `deposit` for you.
