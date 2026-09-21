import { http, HttpResponse } from 'msw';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { usePriceStore } from '@/store/prices';
import { server } from '../mocks/server';

describe('usePriceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('refreshPrices', () => {
    it('sets isLoadingPrices to true while fetching, false after', async () => {
      const store = usePriceStore();
      const promise = store.refreshPrices();
      expect(store.isLoadingPrices).toBe(true);
      await promise;
      expect(store.isLoadingPrices).toBe(false);
    });

    it('populates onChainPrices with real values after fetch', async () => {
      const store = usePriceStore();
      await store.refreshPrices();
      expect(store.onChainPrices.size).toBeGreaterThan(0);
      for (const [, price] of store.onChainPrices)
        expect(price).toBeGreaterThan(0);
    });

    it('sets priceError on fetch failure', async () => {
      server.use(
        http.get('https://api.dexpaprika.com/networks/robinhood/multi/prices', () =>
          HttpResponse.json({}, { status: 503, statusText: 'Unavailable' })),
      );
      const store = usePriceStore();
      await store.refreshPrices();
      expect(store.priceError).not.toBeNull();
      expect(store.priceError?.toLowerCase()).toContain('failed');
    });

    it('clears priceError on successful retry after failure', async () => {
      server.use(
        http.get('https://api.dexpaprika.com/networks/robinhood/multi/prices', () =>
          HttpResponse.json({}, { status: 503, statusText: 'Unavailable' })),
      );
      const store = usePriceStore();
      await store.refreshPrices();
      expect(store.priceError).not.toBeNull();
      server.resetHandlers();
      await store.refreshPrices();
      expect(store.priceError).toBeNull();
    });
  });

  describe('premiumDiscount computed', () => {
    it('returns positive value when on-chain price > reference price', () => {
      const store = usePriceStore();
      store.onChainPrices.set('NVDA', 143);
      expect(store.premiumDiscount.NVDA).toBeGreaterThan(0);
    });

    it('returns negative value when on-chain price < reference price', () => {
      const store = usePriceStore();
      store.onChainPrices.set('NVDA', 141);
      expect(store.premiumDiscount.NVDA).toBeLessThan(0);
    });

    it('returns empty for symbol with no on-chain price', () => {
      const store = usePriceStore();
      expect(store.premiumDiscount.NVDA).toBeUndefined();
    });

    it('premium calculation is mathematically correct', () => {
      const store = usePriceStore();
      store.onChainPrices.set('NVDA', 142.68);
      expect(store.premiumDiscount.NVDA).toBeCloseTo(0.352, 1);
    });
  });
});
