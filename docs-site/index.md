---
layout: home

hero:
  name: "HoodFolio"
  text: "Portfolio dashboard for Robinhood Chain"
  tagline: "Track tokenized stocks, USDG yield, and meme coins. Non-custodial, read-only, open source."
  image:
    src: /hero-preview.png
    alt: HoodFolio dashboard preview
  actions:
    - theme: brand
      text: Quick Start →
      link: /getting-started/quick-start
    - theme: alt
      text: View on GitHub
      link: https://github.com/yourusername/hoodfolio
    - theme: alt
      text: Open App
      link: https://hoodfolio.xyz

features:
  - icon: 📊
    title: Brokerage-style portfolio
    details: Your NVDA, TSLA, and AAPL holdings displayed exactly like a stock brokerage statement. Real balances read directly from Robinhood Chain via viem multicall.

  - icon: 📈
    title: Premium & Discount indicator
    details: When a quote API key is set, see whether each stock token is above (PREMIUM) or below (DISCOUNT) a delayed traditional quote. Hidden until then — no frozen NYSE snapshots.

  - icon: 💰
    title: USDG Yield tracking
    details: Track your USDG wallet balance. Yield APY is Morpho’s live net rate for Steakhouse USDG when the API responds.

  - icon: ⛓️
    title: Built for Chain 4663
    details: Native support for Robinhood Chain (Arbitrum Orbit L2). Prices from DexPaprika, balances from viem multicall. Real data only — no fake numbers.

  - icon: 🔐
    title: Non-custodial & read-only
    details: HoodFolio never stores your data. It reads directly from the blockchain. No accounts, no sign-up, no email required.

  - icon: 🌐
    title: Open source (AGPL-3.0)
    details: Forked from rotki — the original open-source portfolio tracker. All code is public. Audit it, fork it, contribute to it.
---
