# Connect Your Wallet

Click **Connect Wallet** in the HoodFolio navbar. The modal lists injected
wallets and WalletConnect. Approve the connection in the wallet UI.

## What is requested

HoodFolio asks for your **address** and current **chain**. It does not ask
you to sign a swap, permit, or typed-data payload from the dashboard itself.

After connect, the navbar shows a truncated address and ETH balance on
chain 4663. Disconnect is in the account menu.

## Supported wallets

- **MetaMask** — recommended; used for Add Chain
- **Rabby** — injected EIP-1193
- **Coinbase Wallet** — injected when the extension is present
- **WalletConnect** — needs `VITE_WALLETCONNECT_PROJECT_ID` in local builds

## Wrong network

If you are on Ethereum, Arbitrum One, or another id, HoodFolio shows
**Wrong Network**. Switch to Robinhood Chain (4663) or use
[Add Robinhood Chain](/getting-started/add-chain).

::: tip Privacy
The address is kept in browser memory (Pinia). HoodFolio does not create an
account or POST your address to a HoodFolio backend. Reads go to the public
RPC and DexPaprika.
:::

## Troubleshooting

- Popup blocked — allow popups for hoodfolio.online
- Multiple wallets — disable extra extensions or pick one in the modal
- Zero ETH — you may still have stock tokens; ETH is only gas. See
  [Bridge ETH](/getting-started/bridge)
