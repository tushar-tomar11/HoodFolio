# Withdraw USDG

Withdrawals happen on Morpho, not inside HoodFolio.

1. Open Morpho while connected to chain 4663
2. Withdraw to the same address HoodFolio is reading
3. Wait for the transaction
4. Refresh HoodFolio — `balanceOf` USDG should increase

Liquidity, lockups, or queues are Morpho protocol rules. HoodFolio cannot
speed them up. Keep ETH for gas on 4663.
