# HoodFolio

A non-custodial portfolio dashboard for Robinhood Chain stock tokens, USDG yield, and meme coins — with a premium/discount indicator vs NYSE/NASDAQ.

Forked from [rotki/rotki](https://github.com/rotki/rotki) (AGPL-3.0).

## Tech stack

- Vue 3, TypeScript, Pinia, Tailwind CSS
- Vite
- wagmi + viem (direct RPC to Robinhood Chain)
- lightweight-charts

## Setup

```bash
cd frontend
pnpm install
cd app
pnpm exec tsx scripts/serve.ts --web --port 5173
```

Frontend-only serve is the supported HoodFolio path. `pnpm dev` in the rotki tree still expects Rust sidecars.

Production web build:

```bash
cd frontend/app
pnpm exec tsx scripts/build.ts --renderer-only
pnpm preview
```

## Environment variables

| Variable | Description |
| --- | --- |
| `VITE_CHAIN_ID` | Robinhood Chain ID (`4663`) |
| `VITE_ROBINHOOD_RPC` | RPC URL (`https://mainnet.rpc.robinhood.com`) |
| `VITE_BLOCK_EXPLORER` | Blockscout explorer URL |
| `VITE_WALLETCONNECT_PROJECT_ID` | Optional WalletConnect Cloud project id |

Copy `frontend/app/.env.example` to `frontend/app/.env`.
