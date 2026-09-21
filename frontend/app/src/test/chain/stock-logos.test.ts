import { describe, expect, it } from 'vitest';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import { STOCK_LOGOS, stockLogo } from '@/chain/stock-logos';

describe('stock logos', () => {
  it('maps every HoodFolio token to a local logo file', () => {
    for (const symbol of Object.keys(STOCK_TOKENS)) {
      const logo = stockLogo(symbol);
      expect(logo).toBeTruthy();
      expect(logo?.src.startsWith('/stock-logos/')).toBe(true);
    }
    expect(Object.keys(STOCK_LOGOS).length).toBe(Object.keys(STOCK_TOKENS).length);
  });

  it('does not use remote Clearbit URLs', () => {
    for (const logo of Object.values(STOCK_LOGOS))
      expect(logo.src.includes('clearbit')).toBe(false);
  });
});
