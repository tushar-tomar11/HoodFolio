# Current APY

HoodFolio reads **instant net APY** from Morpho’s public GraphQL API for the
Steakhouse USDG vault on chain 4663:

`0xBeEff033F34C046626B8D0A041844C5d1A5409dd`

```graphql
query {
  vaultV2ByAddress(address: "0xBeEff033F34C046626B8D0A041844C5d1A5409dd", chainId: 4663) {
    netApy
  }
}
```

Locally and on Vercel this is proxied as `POST /morpho-api/graphql` to avoid CORS.

## How to read it

- It is Morpho’s **vault** rate, not your personal yield-to-date
- If Morpho is unreachable, HoodFolio shows **no number** (never a guessed ~7%)
- Confirm deposits on [Morpho](https://app.morpho.org/robinhood-chain/vault/0xBeEff033F34C046626B8D0A041844C5d1A5409dd/steakhouse-usdg) — they may be disabled

For deposits use [How to deposit](/yield/how-to-deposit).
