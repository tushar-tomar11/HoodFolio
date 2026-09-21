#!/bin/sh
set -eu

# App SPA + VitePress docs (same origin at /docs).
pnpm --dir docs-site exec vitepress build
pnpm --dir frontend/app exec tsx scripts/build.ts --renderer-only
mkdir -p frontend/app/dist/docs
cp -r docs-site/.vitepress/dist/. frontend/app/dist/docs/
