import { STOCK_LOGO_DOMAINS } from '@/chain/portfolio-types';
import { calcPremium, REFERENCE_MARKET_PRICES } from '@/chain/reference-prices';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';

export type EquitySector = 'tech' | 'finance' | 'etf';

export type SectorFilter = 'all' | EquitySector;

export type MarketSortKey =
  | 'symbol'
  | 'onChainPrice'
  | 'marketPrice'
  | 'premium'
  | 'change24hPct'
  | 'volume24hUSD';

export interface StockMarketRow {
  symbol: string;
  name: string;
  tokenAddress: `0x${string}`;
  logoDomain: string;
  sector: EquitySector;
  onChainPrice: number | null;
  marketPrice: number;
  premium: number;
  change24hPct: number;
  volume24hUSD: number;
}

const SECTOR_BY_SYMBOL: Record<string, EquitySector> = {
  TSLA: 'tech',
  NVDA: 'tech',
  AAPL: 'tech',
  MSFT: 'tech',
  AMZN: 'tech',
  GOOGL: 'tech',
  META: 'tech',
  COIN: 'finance',
  SPY: 'etf',
  QQQ: 'etf',
};

export const HOME_TABLE_SYMBOLS = ['NVDA', 'TSLA', 'AAPL', 'MSFT', 'SPY', 'META'] as const;

export function getStockMarketRows(
  onChainPrices: Map<string, number>,
  volumeBySymbol: Record<string, number> = {},
): StockMarketRow[] {
  return Object.values(STOCK_TOKENS)
    .filter(token => token.symbol !== 'USDG')
    .map((token) => {
      const onChainPrice = onChainPrices.get(token.symbol) ?? null;
      const marketPrice = REFERENCE_MARKET_PRICES[token.symbol] ?? 0;
      return {
        symbol: token.symbol,
        name: token.name,
        tokenAddress: token.address,
        logoDomain: STOCK_LOGO_DOMAINS[token.symbol] ?? '',
        sector: SECTOR_BY_SYMBOL[token.symbol] ?? 'tech',
        onChainPrice,
        marketPrice,
        premium: onChainPrice === null ? Number.NaN : calcPremium(onChainPrice, marketPrice),
        change24hPct: Number.NaN,
        volume24hUSD: volumeBySymbol[token.symbol] ?? 0,
      };
    });
}

export function getHomeStockRows(
  onChainPrices: Map<string, number>,
  volumeBySymbol: Record<string, number> = {},
): StockMarketRow[] {
  const bySymbol = new Map(getStockMarketRows(onChainPrices, volumeBySymbol).map(row => [row.symbol, row]));
  return HOME_TABLE_SYMBOLS
    .map(symbol => bySymbol.get(symbol))
    .filter((row): row is StockMarketRow => Boolean(row));
}

export function uniswapTokenUrl(address: string): string {
  return `https://app.uniswap.org/swap?outputCurrency=${address}&chain=robinhood`;
}
