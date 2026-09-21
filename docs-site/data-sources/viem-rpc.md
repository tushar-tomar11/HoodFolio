# Viem & RPC Reads

Balances use [viem](https://viem.sh) `createPublicClient` against
`https://mainnet.rpc.robinhood.com` (override with `VITE_ROBINHOOD_RPC`).

## Multicall3

Address: `0xca11bde05977b3631167028862be2a173976ca11` (canonical Multicall3).
HoodFolio batches ERC-20 `balanceOf` so one round trip covers the mapped
set.

## Chain definition

`defineChain({ id: 4663, nativeCurrency: ETH })` lives in
`robinhood-chain.ts`. Explorer URL defaults to Blockscout.

## Failure mode

RPC errors surface as wallet/balance errors. HoodFolio does not switch to
a second RPC automatically in the current app. You can point
`VITE_ROBINHOOD_RPC` at your own endpoint.
