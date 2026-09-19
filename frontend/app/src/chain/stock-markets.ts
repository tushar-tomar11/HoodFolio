import { calcPremium, ONCHAIN_PRICES, TRADITIONAL_MARKET_PRICES } from '@/chain/mock-data';
import { CHANGE_24H_PCT, STOCK_LOGO_DOMAINS } from '@/chain/mock-portfolio';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';

export type EquitySector = 'tech' | 'finance' | 'etf';

export type SectorFilter = 'all' | EquitySector;

export type MarketSortKey =
  | 'symbol'
  | 'onChainPrice'
  | 'marketPrice'
  | 'premium'
  | 'change24hPct'
  | 'marketCapUSD'
  | 'volume24hUSD';

export interface StockMarketRow {
  symbol: string;
  name: string;
  tokenAddress: `0x${string}`;
  logoDomain: string;
  sector: EquitySector;
  onChainPrice: number;
  marketPrice: number;
  premium: number;
  change24hPct: number;
  marketCapUSD: number;
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

/** Mock traditional-market caps used only for explorer sort order. */
const MARKET_CAP_USD: Record<string, number> = {
  NVDA: 4_350_000_000_000,
  AAPL: 3_420_000_000_000,
  MSFT: 3_180_000_000_000,
  GOOGL: 2_210_000_000_000,
  AMZN: 2_080_000_000_000,
  META: 1_480_000_000_000,
  TSLA: 792_000_000_000,
  SPY: 562_000_000_000,
  QQQ: 298_000_000_000,
  COIN: 64_000_000_000,
};

/** Mock 24h on-chain volume. */
const VOLUME_24H_USD: Record<string, number> = {
  NVDA: 48_200_000,
  TSLA: 41_800_000,
  AAPL: 29_400_000,
  SPY: 22_100_000,
  META: 18_600_000,
  MSFT: 16_900_000,
  QQQ: 14_200_000,
  AMZN: 12_400_000,
  GOOGL: 11_100_000,
  COIN: 9_800_000,
};

export const HOME_TABLE_SYMBOLS = ['NVDA', 'TSLA', 'AAPL', 'MSFT', 'SPY', 'META'] as const;

export function getStockMarketRows(): StockMarketRow[] {
  return Object.values(STOCK_TOKENS)
    .filter(token => token.symbol !== 'USDG')
    .map((token) => {
      const onChainPrice = ONCHAIN_PRICES[token.symbol] ?? 0;
      const marketPrice = TRADITIONAL_MARKET_PRICES[token.symbol] ?? onChainPrice;
      return {
        symbol: token.symbol,
        name: token.name,
        tokenAddress: token.address,
        logoDomain: STOCK_LOGO_DOMAINS[token.symbol] ?? '',
        sector: SECTOR_BY_SYMBOL[token.symbol] ?? 'tech',
        onChainPrice,
        marketPrice,
        premium: calcPremium(onChainPrice, marketPrice),
        change24hPct: CHANGE_24H_PCT[token.symbol] ?? 0,
        marketCapUSD: MARKET_CAP_USD[token.symbol] ?? 0,
        volume24hUSD: VOLUME_24H_USD[token.symbol] ?? 0,
      };
    });
}

export function getHomeStockRows(): StockMarketRow[] {
  const bySymbol = new Map(getStockMarketRows().map(row => [row.symbol, row]));
  return HOME_TABLE_SYMBOLS
    .map(symbol => bySymbol.get(symbol))
    .filter((row): row is StockMarketRow => Boolean(row));
}

export function uniswapTokenUrl(address: string): string {
  return `https://app.uniswap.org/swap?outputCurrency=${address}&chain=robinhood`;
}
