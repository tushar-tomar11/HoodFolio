import { createPublicClient, defineChain, erc20Abi, http, type PublicClient } from 'viem';

export const ROBINHOOD_CHAIN_ID = 4663;

export const ROBINHOOD_RPC = import.meta.env.VITE_ROBINHOOD_RPC ?? 'https://mainnet.rpc.robinhood.com';

export const ROBINHOOD_EXPLORER = import.meta.env.VITE_BLOCK_EXPLORER ?? 'https://robinhoodchain.blockscout.com';

export const robinhoodChain = defineChain({
  id: ROBINHOOD_CHAIN_ID,
  name: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [ROBINHOOD_RPC] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: ROBINHOOD_EXPLORER },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
    },
  },
});

export interface StockToken {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
}

export const STOCK_TOKENS: Record<string, StockToken> = {
  TSLA: { symbol: 'TSLA', name: 'Tesla', address: '0x322F0929c4625eD5bAd873c95208D54E1c003b2d', decimals: 18 },
  NVDA: { symbol: 'NVDA', name: 'NVIDIA', address: '0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC', decimals: 18 },
  AAPL: { symbol: 'AAPL', name: 'Apple', address: '0xaF3D76f1834A1d425780943C99Ea8A608f8a93f9', decimals: 18 },
  MSFT: { symbol: 'MSFT', name: 'Microsoft', address: '0xe93237C50D904957Cf27E7B1133b510C669c2e74', decimals: 18 },
  AMZN: { symbol: 'AMZN', name: 'Amazon', address: '0x12f190a9F9d7D37a250758b26824B97CE941bF54', decimals: 18 },
  GOOGL: { symbol: 'GOOGL', name: 'Alphabet', address: '0x2e0847E8910a9732eB3fb1bb4b70a580ADAD4FE3', decimals: 18 },
  META: { symbol: 'META', name: 'Meta', address: '0xc0D6457C16Cc70d6790Dd43521C899C87ce02f35', decimals: 18 },
  COIN: { symbol: 'COIN', name: 'Coinbase', address: '0x6330D8C3178a418788dF01a47479c0ce7CCF450b', decimals: 18 },
  SPY: { symbol: 'SPY', name: 'S&P 500 ETF', address: '0x117cc2133c37B721F49dE2A7a74833232B3B4C0C', decimals: 18 },
  QQQ: { symbol: 'QQQ', name: 'Nasdaq 100 ETF', address: '0xD5f3879160bc7c32ebb4dC785F8a4F505888de68', decimals: 18 },
  USDG: { symbol: 'USDG', name: 'USD Gold', address: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168', decimals: 18 },
};

export const publicClient: PublicClient = createPublicClient({
  chain: robinhoodChain,
  transport: http(ROBINHOOD_RPC),
});

export { erc20Abi };
