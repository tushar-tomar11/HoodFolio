#!/bin/sh
set -eu

# Vercel puts pnpm 6 on PATH for any custom "pnpm …" install command.
# Install pnpm 12 ourselves and put it first so frontend engines.pnpm (>=12) passes.
export ELECTRON_SKIP_BINARY_DOWNLOAD=1
npm install -g pnpm@12.2.1
NPM_PREFIX="$(npm prefix -g)"
export PATH="$NPM_PREFIX/bin:$PATH"

echo "node $(node --version)"
echo "pnpm $(pnpm --version)"

pnpm --dir frontend install
pnpm --dir docs-site install
