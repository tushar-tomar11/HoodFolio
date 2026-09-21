# Add Robinhood Chain to MetaMask

HoodFolio can add chain 4663 with one click, or you can enter the RPC by hand.

## One-click from the app

On Overview, click **Add Robinhood Chain**. MetaMask opens
`wallet_addEthereumChain` with:

- `chainId`: `0x1237` (4663)
- `rpcUrls`: `https://mainnet.rpc.robinhood.com`
- `nativeCurrency`: ETH, 18 decimals
- `blockExplorerUrls`: `https://robinhoodchain.blockscout.com`

Approve, then **Switch network** if MetaMask asks.

## Manual add

1. MetaMask → Networks → Add a network → Add a network manually
2. Paste the table from [Network details](/robinhood-chain/network)
3. Save, then switch to Robinhood Chain

## After adding

Connect the wallet on HoodFolio. The live-dot **Chain 4663** chip in the
navbar confirms the app thinks you are on the right id. If ETH shows 0,
bridge gas before you swap on Uniswap.
