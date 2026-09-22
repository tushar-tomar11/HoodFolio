# Development Setup

## Prerequisites

- Node.js 20+ (the rotki workspace currently pins Node 24)
- pnpm 9+ (workspace pin is pnpm 12)
- Git
- An injected wallet (MetaMask) for connection testing

## Clone and install

The product UI lives in the rotki-style workspace:

```bash
git clone https://github.com/tushar-tomar11/HoodFolio.git
cd hoodfolio/frontend
pnpm install
```

## Environment variables

Copy the example env file if present:

```bash
cp app/.env.example app/.env
```

Useful values:

```
VITE_CHAIN_ID=4663
VITE_ROBINHOOD_RPC=https://mainnet.rpc.robinhood.com
VITE_BLOCK_EXPLORER=https://robinhoodchain.blockscout.com
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get a WalletConnect project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com) (free).
RPC and explorer already default in `src/chain/robinhood-chain.ts` if env vars are omitted.

## Run the app

```bash
cd frontend/app
pnpm serve --web --port 5173
```

Open [http://localhost:5173](http://localhost:5173). HMR may be disabled by the
rotki serve wrapper — refresh after large CSS changes.

## Run the docs

Product docs are a **standalone** VitePress app (this site). They are not the
Sphinx tree under `hoodfolio/docs/` (that folder is upstream rotki developer docs).

```bash
cd docs-site
pnpm install
pnpm dev
# http://localhost:5174
```

From the frontend workspace:

```bash
pnpm docs:dev
```

## Build

```bash
# Docs
cd docs-site && pnpm build

# App renderer (from frontend/app)
pnpm exec tsx scripts/build.ts --renderer-only
```

## Project structure

```
hoodfolio/
├── frontend/app/         Vue 3 HoodFolio UI (package name: rotki)
│   ├── src/chain/        Chain 4663 config + stock token addresses
│   ├── src/components/   HoodNavbar, portfolio, stocks, yield
│   ├── src/store/        Pinia: prices, wallet, theme
│   └── src/views/        Routes
├── docs-site/            VitePress documentation (this site)
│   ├── .vitepress/       Config + green theme
│   └── *.md
└── docs/                 Upstream rotki Sphinx docs (not this site)
```

## Lint rules that apply to the app

HoodFolio Vue code follows rotki ESLint: kebab-case filenames, no barrel files,
no `void` operator, `shallowRef` where required, sorted imports. Do not add
Lucide as a dependency unless the repo already has it — prefer inline SVG.

## Tests

```bash
cd frontend/app
pnpm test
```

That runs `vitest.hoodfolio.config.ts` (HoodFolio unit tests), not the full rotki suite.
