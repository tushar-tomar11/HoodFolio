import {
  MORPHO_HOME,
  ROBINHOOD_CHAIN_ID,
  ROBINHOOD_EXPLORER,
  ROBINHOOD_RPC,
  STOCK_TOKENS,
  UNISWAP_HOME,
} from '@/chain/robinhood-chain';

export const STOCK_TOKEN_COUNT = Object.keys(STOCK_TOKENS).filter(symbol => symbol !== 'USDG').length;

export interface HomeFeature {
  title: string;
  body: string;
  to: string;
  cta: string;
}

export const HOME_FEATURES: HomeFeature[] = [
  {
    title: 'Stock tokens',
    body: `${STOCK_TOKEN_COUNT} tokenized equities on Robinhood Chain (NVDA, TSLA, AAPL, and more). Prices from DexPaprika.`,
    to: '/stocks',
    cta: 'View markets',
  },
  {
    title: 'Premium / discount',
    body: 'See whether the on-chain price is higher or lower than the last NYSE/NASDAQ reference. Unique to HoodFolio.',
    to: '/stocks',
    cta: 'Compare prices',
  },
  {
    title: 'Wallet portfolio',
    body: 'Read-only ERC-20 balances via viem multicall on chain 4663. Nothing is stored. USDG uses 6 decimals, not 18.',
    to: '/portfolio',
    cta: 'Open portfolio',
  },
  {
    title: 'Top pools',
    body: 'Uniswap pools on Robinhood Chain ranked by 24h volume from DexPaprika. No fake meme-coin balances.',
    to: '/memecoins',
    cta: 'See pools',
  },
  {
    title: 'USDG yield',
    body: 'Live USDG balance from chain. Advertised Morpho APY is labeled as advertised — not a vault TVL read.',
    to: '/yield',
    cta: 'USDG yield',
  },
  {
    title: 'Chain analytics',
    body: 'DEX volume, pool liquidity, and transaction counts aggregated from DexPaprika. Retry if the API is down.',
    to: '/analytics',
    cta: 'Open analytics',
  },
];

export interface HomeStep {
  n: string;
  title: string;
  body: string;
}

export const HOME_STEPS: HomeStep[] = [
  {
    n: '01',
    title: 'Add Robinhood Chain',
    body: `Chain ID ${ROBINHOOD_CHAIN_ID}. RPC ${ROBINHOOD_RPC}. Explorer ${ROBINHOOD_EXPLORER}. ETH gas on an Arbitrum L2.`,
  },
  {
    n: '02',
    title: 'Connect a wallet (read-only)',
    body: 'MetaMask or another injected wallet. HoodFolio never asks you to sign unless you leave to trade on Uniswap.',
  },
  {
    n: '03',
    title: 'See holdings and premium',
    body: 'Stock tokens with balance > 0, USD value from DexPaprika, and premium/discount vs the reference NYSE/NASDAQ price.',
  },
  {
    n: '04',
    title: 'Swap or earn',
    body: `Buy stock tokens on Uniswap (${UNISWAP_HOME}). Deposit USDG on Morpho (${MORPHO_HOME}) if you want yield.`,
  },
];

export interface HomeFaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: HomeFaqItem[] = [
  {
    q: 'What is Robinhood Chain?',
    a: `An EVM chain (ID ${ROBINHOOD_CHAIN_ID}) where tokenized US stocks and USDG trade 24/7. HoodFolio only reads this chain.`,
  },
  {
    q: 'Are these real NYSE stocks?',
    a: 'They are on-chain tokens that track listed names. Legal wrapper and redemption rules are defined by the issuer — HoodFolio does not custody or issue them.',
  },
  {
    q: 'What does premium / discount mean?',
    a: 'On-chain DexPaprika price versus a static NYSE/NASDAQ reference from our last check. Positive = more expensive on-chain (premium). Negative = cheaper on-chain (discount). Not a live traditional-market feed.',
  },
  {
    q: 'Is HoodFolio part of Robinhood Inc.?',
    a: 'No. It is an independent, open-source dashboard forked from rotki for Robinhood Chain. Not affiliated with Robinhood Markets.',
  },
  {
    q: 'How do I add the chain and find token addresses?',
    a: `Add network ${ROBINHOOD_CHAIN_ID} with RPC ${ROBINHOOD_RPC}. Explorer: ${ROBINHOOD_EXPLORER}. Stock token and USDG contracts are on the markets page; USDG uses 6 decimals.`,
  },
  {
    q: 'Why does USDG use 6 decimals?',
    a: 'Stock tokens use 18 decimals. USDG uses 6 (like USDC). HoodFolio divides USDG by 10^6. Using 18 would show amounts a trillion times too small or too large.',
  },
  {
    q: 'Is this tax software?',
    a: 'No. HoodFolio does not compute cost basis or file taxes. It is a read-only portfolio and market viewer. Not financial advice.',
  },
];

export const HOME_TRUST: { title: string; body: string }[] = [
  { title: 'No accounts', body: 'No email, no signup, no cloud profile. Connect a wallet or browse public chain stats.' },
  { title: 'No custody', body: 'We never hold keys or tokens. Trades happen on Uniswap, not inside HoodFolio.' },
  { title: 'No stored balances', body: 'Reads go to chain 4663 (viem) and DexPaprika. Refresh the page and the data is fetched again.' },
  { title: 'Open source', body: 'AGPL-3.0 fork of rotki. You can inspect how every number is fetched.' },
];

export const NETWORK_RECIPE = {
  name: 'Robinhood Chain',
  chainId: ROBINHOOD_CHAIN_ID,
  rpc: ROBINHOOD_RPC,
  explorer: ROBINHOOD_EXPLORER,
  uniswap: UNISWAP_HOME,
  morpho: MORPHO_HOME,
  currency: 'ETH',
};
