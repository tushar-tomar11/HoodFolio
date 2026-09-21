import { describe, expect, it } from 'vitest';
import { getStockMarketRows } from '@/chain/stock-markets';

describe('getStockMarketRows', () => {
  it('omits traditional market price and premium without quotes', () => {
    const onChain = new Map([['NVDA', 141.88]]);
    const [row] = getStockMarketRows(onChain).filter(item => item.symbol === 'NVDA');
    expect(row.marketPrice).toBeNull();
    expect(Number.isFinite(row.premium)).toBe(false);
  });

  it('computes premium when a traditional quote exists', () => {
    const onChain = new Map([['NVDA', 143]]);
    const traditional = new Map([['NVDA', 142]]);
    const [row] = getStockMarketRows(onChain, {}, { traditionalPrices: traditional })
      .filter(item => item.symbol === 'NVDA');
    expect(row.marketPrice).toBe(142);
    expect(row.premium).toBeCloseTo(((143 - 142) / 142) * 100);
  });

  it('passes through DexPaprika 24h change', () => {
    const onChain = new Map([['NVDA', 141.88]]);
    const change = new Map([['NVDA', -0.4]]);
    const [row] = getStockMarketRows(onChain, {}, { change24hBySymbol: change })
      .filter(item => item.symbol === 'NVDA');
    expect(row.change24hPct).toBe(-0.4);
  });
});
