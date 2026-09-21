export type StockLogoTile = 'dark' | 'light';

export interface StockLogoMeta {
  src: string;
  tile: StockLogoTile;
  invertInDark?: boolean;
}

export const STOCK_LOGOS: Record<string, StockLogoMeta> = {
  TSLA: { src: '/stock-logos/TSLA.png', tile: 'dark' },
  NVDA: { src: '/stock-logos/NVDA.png', tile: 'dark' },
  AAPL: { src: '/stock-logos/AAPL.svg', tile: 'light', invertInDark: true },
  MSFT: { src: '/stock-logos/MSFT.png', tile: 'dark' },
  AMZN: { src: '/stock-logos/AMZN.png', tile: 'dark' },
  GOOGL: { src: '/stock-logos/GOOGL.png', tile: 'dark' },
  META: { src: '/stock-logos/META.png', tile: 'dark' },
  COIN: { src: '/stock-logos/COIN.png', tile: 'dark' },
  SPY: { src: '/stock-logos/SPY.png', tile: 'dark' },
  QQQ: { src: '/stock-logos/QQQ.png', tile: 'dark' },
  USDG: { src: '/stock-logos/USDG.png', tile: 'dark' },
};

export function stockLogo(symbol: string): StockLogoMeta | null {
  return STOCK_LOGOS[symbol] ?? null;
}
