# Robinhood Chain Network Details

## Network Configuration

Add Robinhood Chain to any EVM wallet using these settings:

| Field | Value |
|-------|-------|
| Network Name | Robinhood Chain |
| RPC URL | https://mainnet.rpc.robinhood.com |
| Chain ID | 4663 |
| Currency Symbol | ETH |
| Block Explorer | https://robinhoodchain.blockscout.com |

HoodFolio's **Add Robinhood Chain** button sends the same payload via
`wallet_addEthereumChain`. Gas is **ETH**, not a custom gas token.

## Technical Specifications

| Property | Value |
|----------|-------|
| Architecture | Arbitrum Orbit L2 |
| Settles to | Ethereum Mainnet |
| Block time | ~100ms |
| Gas token | ETH |
| EVM compatibility | Full (same opcodes as Ethereum) |
| Multicall3 | `0xca11bde05977b3631167028862be2a173976ca11` |

HoodFolio only reads this chain. Connecting a wallet that is on Ethereum
mainnet or Arbitrum One will show a **Wrong Network** control until you switch
to 4663.

## Key Contracts

| Contract | Address |
|----------|---------|
| WETH | `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73` |
| USDG | `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168` |

USDG uses **6 decimals**. Stock tokens use **18**. HoodFolio divides balances
accordingly in the portfolio multicall. Using 18 for USDG would display
amounts that are wrong by 10¹².

## Stock Token Addresses

| Symbol | Company | Address |
|--------|---------|---------|
| TSLA | Tesla | `0x322F0929c4625eD5bAd873c95208D54E1c003b2d` |
| NVDA | NVIDIA | `0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC` |
| AAPL | Apple | `0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9` |
| MSFT | Microsoft | `0xe93237C50D904957Cf27E7B1133b510C669c2e74` |
| AMZN | Amazon | `0x12f190a9F9d7D37a250758b26824B97CE941bF54` |
| GOOGL | Alphabet | `0x2e0847E8910a9732eB3fb1bb4b70a580ADAD4FE3` |
| META | Meta | `0xc0D6457C16Cc70d6790Dd43521C899C87ce02f35` |
| COIN | Coinbase | `0x6330D8C3178a418788dF01A47479c0ce7CCF450b` |
| SPY | S&P 500 ETF | `0x117cc2133c37B721F49dE2A7a74833232B3B4C0C` |
| QQQ | Nasdaq 100 ETF | `0xD5f3879160bc7c32ebb4dC785F8a4F505888de68` |

::: warning Verify before use
Always verify contract addresses on
[Blockscout](https://robinhoodchain.blockscout.com) before sending tokens.
HoodFolio's mapped list lives in `frontend/app/src/chain/robinhood-chain.ts`.
:::

## RPC and explorer

Public RPC: `https://mainnet.rpc.robinhood.com`.
Explorer: [robinhoodchain.blockscout.com](https://robinhoodchain.blockscout.com).
Uniswap UI: [app.uniswap.org/?chain=robinhood](https://app.uniswap.org/?chain=robinhood).
Morpho: [app.morpho.org](https://app.morpho.org).
