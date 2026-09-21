import { STOCK_LOGO_DOMAINS } from '@/chain/portfolio-types';
import { calcPremium } from '@/chain/reference-prices';
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
  marketPrice: number | null;
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

export interface MarketRowExtras {
  change24hBySymbol?: Map<string, number>;
  traditionalPrices?: Map<string, number>;
  volumeByTokenSummary?: Map<string, number>;
}

export function getStockMarketRows(
  onChainPrices: Map<string, number>,
  volumeBySymbol: Record<string, number> = {},
  extras: MarketRowExtras = {},
): StockMarketRow[] {
  return Object.values(STOCK_TOKENS)
    .filter(token => token.symbol !== 'USDG')
    .map((token) => {
      const onChainPrice = onChainPrices.get(token.symbol) ?? null;
      const marketPrice = extras.traditionalPrices?.get(token.symbol) ?? null;
      const change24hPct = extras.change24hBySymbol?.get(token.symbol) ?? Number.NaN;
      const summaryVol = extras.volumeByTokenSummary?.get(token.symbol) ?? 0;
      return {
        symbol: token.symbol,
        name: token.name,
        tokenAddress: token.address,
        logoDomain: STOCK_LOGO_DOMAINS[token.symbol] ?? '',
        sector: SECTOR_BY_SYMBOL[token.symbol] ?? 'tech',
        onChainPrice,
        marketPrice,
        premium: onChainPrice === null || marketPrice === null
          ? Number.NaN
          : calcPremium(onChainPrice, marketPrice),
        change24hPct,
        volume24hUSD: volumeBySymbol[token.symbol] || summaryVol,
      };
    });
}

export function getHomeStockRows(
  onChainPrices: Map<string, number>,
  volumeBySymbol: Record<string, number> = {},
  extras: MarketRowExtras = {},
): StockMarketRow[] {
  const bySymbol = new Map(getStockMarketRows(onChainPrices, volumeBySymbol, extras).map(row => [row.symbol, row]));
  return HOME_TABLE_SYMBOLS
    .map(symbol => bySymbol.get(symbol))
    .filter((row): row is StockMarketRow => Boolean(row));
}

export function uniswapTokenUrl(address: string): string {
  return `https://app.uniswap.org/swap?outputCurrency=${address}&chain=robinhood`;
}
