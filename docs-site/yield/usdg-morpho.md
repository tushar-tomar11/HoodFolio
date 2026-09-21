# USDG & Morpho Earn

Robinhood-style **Earn** on this chain is associated with **Morpho** vaults
and **USDG**. HoodFolio links to the Steakhouse USDG vault and reads your
**wallet USDG** on chain 4663.

## What is on-chain vs Morpho APY

- **On-chain USDG**: `balanceOf` at `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`, 6 decimals
- **APY**: Morpho GraphQL `vaultV2ByAddress.netApy` for Steakhouse USDG (`0xBeEff033F34C046626B8D0A041844C5d1A5409dd`)
- If the Morpho request fails, the Yield page shows a dash, not an estimate

Do not treat HoodFolio as a Morpho portfolio manager. Vault shares, caps,
and withdrawal queues live on Morpho.

## Safety

USDG and Morpho contracts can change. Verify addresses on Blockscout.
HoodFolio will not sign `approve` or `deposit` for you.
