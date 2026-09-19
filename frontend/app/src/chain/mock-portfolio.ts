import { calcPremium, ONCHAIN_PRICES, TRADITIONAL_MARKET_PRICES } from '@/chain/mock-data';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';

export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  avgCostUSD: number;
  currentValueUSD: number;
  change24hPct: number;
  onChainPrice: number;
  marketPrice: number;
  premium: number;
  tokenAddress: `0x${string}`;
  logoDomain: string;
}

export interface MemeHolding {
  symbol: string;
  name: string;
  amount: number;
  valueUSD: number;
  change24hPct: number;
  tokenAddress: `0x${string}`;
}

export interface UsdgPosition {
  depositedUSD: number;
  earnedUSD: number;
  apy: number;
  daysActive: number;
  morphoUrl: string;
}

export const STOCK_LOGO_DOMAINS: Record<string, string> = {
  TSLA: 'tesla.com',
  NVDA: 'nvidia.com',
  AAPL: 'apple.com',
  MSFT: 'microsoft.com',
  AMZN: 'amazon.com',
  GOOGL: 'abc.xyz',
  META: 'meta.com',
  COIN: 'coinbase.com',
  SPY: 'ssga.com',
  QQQ: 'invesco.com',
  USDG: 'robinhood.com',
};

export const CHANGE_24H_PCT: Record<string, number> = {
  TSLA: 1.84,
  NVDA: -0.92,
  AAPL: 0.41,
  MSFT: -0.28,
  AMZN: 1.12,
  GOOGL: 0.67,
  META: 2.04,
  COIN: -1.55,
  SPY: 0.33,
  QQQ: 0.51,
};

function stockHolding(
  symbol: string,
  shares: number,
  avgCostUSD: number,
): StockHolding {
  const token = STOCK_TOKENS[symbol];
  const onChainPrice = ONCHAIN_PRICES[symbol] ?? 0;
  const marketPrice = TRADITIONAL_MARKET_PRICES[symbol] ?? onChainPrice;
  return {
    symbol,
    name: token?.name ?? symbol,
    shares,
    avgCostUSD,
    currentValueUSD: shares * onChainPrice,
    change24hPct: CHANGE_24H_PCT[symbol] ?? 0,
    onChainPrice,
    marketPrice,
    premium: calcPremium(onChainPrice, marketPrice),
    tokenAddress: token?.address ?? '0x0000000000000000000000000000000000000000',
    logoDomain: STOCK_LOGO_DOMAINS[symbol] ?? 'robinhood.com',
  };
}

export const MOCK_PORTFOLIO = {
  stockHoldings: [
    stockHolding('TSLA', 40, 241.2),
    stockHolding('NVDA', 55, 181.4),
    stockHolding('AAPL', 80, 221.05),
    stockHolding('MSFT', 45, 419.8),
    stockHolding('AMZN', 50, 188.6),
  ],
  memeHoldings: [
    {
      symbol: 'PEPE',
      name: 'Pepe',
      amount: 42_000_000,
      valueUSD: 1840.2,
      change24hPct: 12.4,
      tokenAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933' as const,
    },
    {
      symbol: 'WIF',
      name: 'dogwifhat',
      amount: 920,
      valueUSD: 1310.55,
      change24hPct: -4.8,
      tokenAddress: '0x0000000000000000000000000000000000000001' as const,
    },
    {
      symbol: 'BONK',
      name: 'Bonk',
      amount: 18_500_000,
      valueUSD: 976.4,
      change24hPct: 6.1,
      tokenAddress: '0x0000000000000000000000000000000000000002' as const,
    },
  ] satisfies MemeHolding[],
  usdgPosition: {
    depositedUSD: 8000,
    earnedUSD: 490.22,
    apy: 7.2,
    daysActive: 62,
    morphoUrl: 'https://app.morpho.org',
  } satisfies UsdgPosition,
};

export function holdingFromChainPosition(position: {
  symbol: string;
  name: string;
  address: `0x${string}`;
  balance: number;
  valueUSD: number;
}): StockHolding {
  const onChainPrice = ONCHAIN_PRICES[position.symbol] ?? 0;
  const marketPrice = TRADITIONAL_MARKET_PRICES[position.symbol] ?? onChainPrice;
  const avgCostUSD = onChainPrice > 0 ? onChainPrice * 0.97 : 0;
  return {
    symbol: position.symbol,
    name: position.name,
    shares: position.balance,
    avgCostUSD,
    currentValueUSD: position.valueUSD,
    change24hPct: CHANGE_24H_PCT[position.symbol] ?? 0,
    onChainPrice,
    marketPrice,
    premium: calcPremium(onChainPrice, marketPrice),
    tokenAddress: position.address,
    logoDomain: STOCK_LOGO_DOMAINS[position.symbol] ?? 'robinhood.com',
  };
}
