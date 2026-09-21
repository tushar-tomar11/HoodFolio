import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref, type Ref } from 'vue';
import { REFERENCE_MARKET_PRICES } from '@/chain/reference-prices';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import { type DexPaprikaDex, type DexPaprikaPool, fetchAllStockPrices, fetchChainDexStats, fetchTopPools } from '@/services/dex-paprika';

export { REFERENCE_MARKET_PRICES };

interface PriceStore {
  onChainPrices: Ref<Map<string, number>>;
  premiumDiscount: ComputedRef<Record<string, number>>;
  chainVolume24h: Ref<number>;
  chainTvl: Ref<number>;
  chainTxns24h: Ref<number>;
  topPools: Ref<DexPaprikaPool[]>;
  dexStats: Ref<DexPaprikaDex[]>;
  isLoadingPrices: Ref<boolean>;
  isLoadingChainStats: Ref<boolean>;
  priceError: Ref<string | null>;
  chainStatsError: Ref<string | null>;
  chainStatsFetched: Ref<boolean>;
  lastUpdated: Ref<Date | null>;
  refreshPrices: () => Promise<void>;
  refreshChainStats: () => Promise<void>;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
}

export const usePriceStore = defineStore('hoodfolio/prices', (): PriceStore => {
  const onChainPrices = ref<Map<string, number>>(new Map());
  const chainVolume24h = ref(0);
  const chainTvl = ref(0);
  const chainTxns24h = ref(0);
  const topPools = ref<DexPaprikaPool[]>([]);
  const dexStats = ref<DexPaprikaDex[]>([]);
  const isLoadingPrices = ref(false);
  const isLoadingChainStats = ref(true);
  const priceError = ref<string | null>(null);
  const chainStatsError = ref<string | null>(null);
  const chainStatsFetched = ref(false);
  const lastUpdated = ref<Date | null>(null);

  const premiumDiscount = computed(() => {
    const result: Record<string, number> = {};
    for (const [symbol, referencePrice] of Object.entries(REFERENCE_MARKET_PRICES)) {
      const onChain = onChainPrices.value.get(symbol);
      if (onChain !== undefined && referencePrice > 0)
        result[symbol] = ((onChain - referencePrice) / referencePrice) * 100;
    }
    return result;
  });

  async function refreshPrices(): Promise<void> {
    isLoadingPrices.value = true;
    priceError.value = null;
    try {
      const addrMap = Object.fromEntries(
        Object.entries(STOCK_TOKENS).map(([symbol, token]) => [symbol, token.address]),
      );
      onChainPrices.value = await fetchAllStockPrices(addrMap);
      lastUpdated.value = new Date();
    }
    catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch prices from DexPaprika';
      priceError.value = message;
      console.error('[HoodFolio] Price fetch error:', error);
    }
    finally {
      isLoadingPrices.value = false;
    }
  }

  async function refreshChainStats(): Promise<void> {
    if (!chainStatsFetched.value)
      isLoadingChainStats.value = true;
    chainStatsError.value = null;
    try {
      const [dexes, pools] = await Promise.all([fetchChainDexStats(), fetchTopPools(25)]);
      dexStats.value = dexes;
      topPools.value = pools;
      const totals = dexes.reduce((acc, dex) => ({
        volume: acc.volume + (dex.volume_usd_24h ?? 0),
        tvl: acc.tvl + (dex.liquidity_usd ?? 0),
        txns: acc.txns + (dex.transactions_24h ?? dex.txns_24h ?? 0),
      }), { volume: 0, tvl: 0, txns: 0 });
      const poolLiq = pools.reduce((sum, pool) => sum + (pool.liquidity_usd ?? 0), 0);
      chainVolume24h.value = totals.volume;
      chainTvl.value = totals.tvl > 0 ? totals.tvl : poolLiq;
      chainTxns24h.value = totals.txns;
      chainStatsFetched.value = true;
    }
    catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch chain stats from DexPaprika';
      chainStatsError.value = message;
      console.error('[HoodFolio] Chain stats fetch error:', error);
    }
    finally {
      isLoadingChainStats.value = false;
    }
  }

  let refreshInterval: ReturnType<typeof setInterval> | undefined;

  function ignoreRefreshError(error: unknown): void {
    console.error('[HoodFolio] Background price refresh failed:', error);
  }

  function startAutoRefresh(): void {
    if (refreshInterval)
      return;
    refreshPrices().catch(ignoreRefreshError);
    refreshChainStats().catch(ignoreRefreshError);
    refreshInterval = setInterval(() => {
      refreshPrices().catch(ignoreRefreshError);
    }, 30_000);
  }

  function stopAutoRefresh(): void {
    if (!refreshInterval)
      return;
    clearInterval(refreshInterval);
    refreshInterval = undefined;
  }

  return {
    onChainPrices,
    premiumDiscount,
    chainVolume24h,
    chainTvl,
    chainTxns24h,
    topPools,
    dexStats,
    isLoadingPrices,
    isLoadingChainStats,
    priceError,
    chainStatsError,
    chainStatsFetched,
    lastUpdated,
    refreshPrices,
    refreshChainStats,
    startAutoRefresh,
    stopAutoRefresh,
  };
});
