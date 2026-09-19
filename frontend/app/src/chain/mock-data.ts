import { STOCK_TOKENS } from '@/chain/robinhood-chain';

export { STOCK_TOKENS };

/**
 * Mock on-chain last prices (USD) until live Uniswap pricing lands.
 * Deltas vs NYSE are intentional so the ticker shows both PREMIUM and DISCOUNT.
 */
export const ONCHAIN_PRICES: Record<string, number> = {
  TSLA: 248.9,
  NVDA: 176.8,
  AAPL: 228.41,
  MSFT: 428.15,
  AMZN: 196.2,
  GOOGL: 176.05,
  META: 582.4,
  COIN: 248.1,
  SPY: 571.88,
  QQQ: 492.1,
  USDG: 1.002,
};

/** Mock NYSE/NASDAQ reference prices (USD). */
export const TRADITIONAL_MARKET_PRICES: Record<string, number> = {
  TSLA: 248,
  NVDA: 177.17,
  AAPL: 227.9,
  MSFT: 429.4,
  AMZN: 195.55,
  GOOGL: 176.4,
  META: 580.1,
  COIN: 251,
  SPY: 571.2,
  QQQ: 493.8,
  USDG: 1,
};

export interface TickerToken {
  symbol: string;
  name: string;
  address: `0x${string}`;
  onChainPrice: number;
  traditionalPrice: number;
}

export function getTickerTokens(): TickerToken[] {
  return Object.values(STOCK_TOKENS).map(token => ({
    symbol: token.symbol,
    name: token.name,
    address: token.address,
    onChainPrice: ONCHAIN_PRICES[token.symbol] ?? 0,
    traditionalPrice: TRADITIONAL_MARKET_PRICES[token.symbol] ?? 0,
  }));
}

export function calcPremium(onChainPrice: number, traditionalPrice: number): number {
  if (!traditionalPrice)
    return 0;
  return ((onChainPrice - traditionalPrice) / traditionalPrice) * 100;
}
