import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAllStockPrices, fetchTokenPrices, fetchTokenSummary, fetchTopPools } from '@/services/dex-paprika';
import { NVDA } from '../mocks/handlers';
import { server } from '../mocks/server';

describe('dexPaprika Service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchTokenPrices', () => {
    it('returns a map of address to USD price', async () => {
      const map = await fetchTokenPrices([NVDA]);
      expect(map.get(NVDA)).toBe(141.88);
    });

    it('handles empty address array without calling the API', async () => {
      const spy = vi.spyOn(globalThis, 'fetch');
      const map = await fetchTokenPrices([]);
      expect(map.size).toBe(0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('throws on array of more than 10 addresses', async () => {
      const addresses = Array.from({ length: 11 }, (_, i) => `0x${i.toString().padStart(40, '0')}`);
      await expect(fetchTokenPrices(addresses)).rejects.toThrow('10');
    });

    it('throws on API error response (non-200)', async () => {
      server.use(
        http.get('https://api.dexpaprika.com/networks/robinhood/multi/prices', () =>
          HttpResponse.json({ error: 'down' }, { status: 500 })),
      );
      await expect(fetchTokenPrices([NVDA])).rejects.toThrow('DexPaprika price fetch failed: 500');
    });

    it('handles tokens not in response (silently omitted by API)', async () => {
      const unknown = '0x1111111111111111111111111111111111111111';
      const map = await fetchTokenPrices([NVDA, unknown]);
      expect(map.get(NVDA)).toBe(141.88);
      expect(map.has(unknown)).toBe(false);
    });
  });

  describe('fetchAllStockPrices', () => {
    it('splits > 10 tokens into multiple batch requests', async () => {
      const tokens: Record<string, string> = {};
      for (let i = 0; i < 12; i++)
        tokens[`T${i}`] = `0x${i.toString().padStart(40, '0')}`;
      const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify([]), { status: 200 }),
      );
      await fetchAllStockPrices(tokens);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('returns combined results from all batches', async () => {
      const tokens: Record<string, string> = {};
      for (let i = 0; i < 12; i++)
        tokens[`T${i}`] = `0x${(i + 1).toString().padStart(40, 'a')}`;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
        const url = String(input);
        const list = new URL(url).searchParams.get('tokens')?.split(',') ?? [];
        return new Response(JSON.stringify(list.map(id => ({ id, chain: 'robinhood', price_usd: 1 }))), { status: 200 });
      });
      const map = await fetchAllStockPrices(tokens);
      expect(map.size).toBe(12);
    });

    it('continues fetching remaining batches even if one batch fails', async () => {
      const tokens: Record<string, string> = {};
      for (let i = 0; i < 12; i++)
        tokens[`T${i}`] = `0x${(i + 2).toString().padStart(40, 'b')}`;
      let calls = 0;
      vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
        calls += 1;
        if (calls === 1)
          return new Response('nope', { status: 500, statusText: 'ERR' });
        const list = new URL(String(input)).searchParams.get('tokens')?.split(',') ?? [];
        return new Response(JSON.stringify(list.map(id => ({ id, chain: 'robinhood', price_usd: 2 }))), { status: 200 });
      });
      const map = await fetchAllStockPrices(tokens);
      expect(map.size).toBe(2);
    });
  });

  describe('fetchTopPools', () => {
    it('returns array of pool objects with required fields', async () => {
      const pools = await fetchTopPools(5);
      expect(pools.length).toBeGreaterThan(0);
      for (const pool of pools) {
        expect(pool.id).toBeTruthy();
        expect(typeof pool.volume_usd_24h).toBe('number');
        expect(typeof pool.liquidity_usd).toBe('number');
        expect(Array.isArray(pool.tokens)).toBe(true);
      }
    });

    it('pools are sorted by volume_usd_24h descending', async () => {
      const pools = await fetchTopPools(5);
      expect(pools[0].volume_usd_24h).toBeGreaterThanOrEqual(pools[1].volume_usd_24h);
    });
  });

  describe('fetchTokenSummary', () => {
    it('reads on-chain 24h change from DexPaprika token details', async () => {
      const summary = await fetchTokenSummary(NVDA);
      expect(summary.change24hPct).toBe(1.25);
      expect(summary.volumeUsd24h).toBe(50000);
    });
  });
});
