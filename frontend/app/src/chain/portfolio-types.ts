export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  currentValueUSD: number | null;
  change24hPct: number;
  onChainPrice: number | null;
  marketPrice: number;
  premium: number;
  tokenAddress: `0x${string}`;
  logoDomain: string;
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
