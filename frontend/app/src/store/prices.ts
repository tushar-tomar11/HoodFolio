import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref, type Ref } from 'vue';
import { calcPremium } from '@/chain/reference-prices';
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import {
  type DexPaprikaDex,
  type DexPaprikaPool,
  fetchAllStockPrices,
  fetchChainDexStats,
  fetchPoolOhlcvCloses,
  fetchTokenSummaries,
  fetchTopPools,
  primaryPoolIdBySymbol,
} from '@/services/dex-paprika';
import { fetchSteakhouseUsdgApy } from '@/services/morpho';
import { fetchTraditionalQuotes } from '@/services/traditional-quotes';

interface PriceStore {
  onChainPrices: Ref<Map<string, number>>;
  change24hPct: Ref<Map<string, number>>;
  volumeUsd24h: Ref<Map<string, number>>;
  sparklineBySymbol: Ref<Map<string, number[]>>;
  traditionalPrices: Ref<Map<string, number>>;
  traditionalQuoteSource: Ref<string | null>;
  hasTraditionalQuotes: ComputedRef<boolean>;
  premiumDiscount: ComputedRef<Record<string, number>>;
  morphoApyPct: Ref<number>;
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
  refreshTraditionalQuotes: () => Promise<void>;
  refreshMorphoApy: () => Promise<void>;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
}

function tokenAddressMap(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(STOCK_TOKENS).map(([symbol, token]) => [symbol, token.address]),
  );
}

export const usePriceStore = defineStore('hoodfolio/prices', (): PriceStore => {
  const onChainPrices = ref<Map<string, number>>(new Map());
  const change24hPct = ref<Map<string, number>>(new Map());
  const volumeUsd24h = ref<Map<string, number>>(new Map());
  const sparklineBySymbol = ref<Map<string, number[]>>(new Map());
  const traditionalPrices = ref<Map<string, number>>(new Map());
  const traditionalQuoteSource = ref<string | null>(null);
  const morphoApyPct = ref(Number.NaN);
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

  const hasTraditionalQuotes = computed(() => traditionalPrices.value.size > 0);

  const premiumDiscount = computed(() => {
    const result: Record<string, number> = {};
    if (!hasTraditionalQuotes.value)
      return result;
    for (const [symbol, referencePrice] of traditionalPrices.value) {
      const onChain = onChainPrices.value.get(symbol);
      if (onChain !== undefined)
        result[symbol] = calcPremium(onChain, referencePrice);
    }
    return result;
  });

  async function refreshPrices(): Promise<void> {
    isLoadingPrices.value = true;
    priceError.value = null;
    try {
      onChainPrices.value = await fetchAllStockPrices(tokenAddressMap());
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

  async function refreshTokenSummariesAndSparks(): Promise<void> {
    const addrMap = tokenAddressMap();
    const summaries = await fetchTokenSummaries(addrMap);
    const nextChange = new Map<string, number>();
    const nextVol = new Map<string, number>();
    for (const [symbol, summary] of summaries) {
      if (Number.isFinite(summary.change24hPct))
        nextChange.set(symbol, summary.change24hPct);
      if (summary.volumeUsd24h > 0)
        nextVol.set(symbol, summary.volumeUsd24h);
    }
    change24hPct.value = nextChange;
    volumeUsd24h.value = nextVol;

    const poolIds = primaryPoolIdBySymbol(topPools.value, addrMap);
    const spark = new Map<string, number[]>();
    const sparkEntries = [...poolIds.entries()].slice(0, 8);
    const settled = await Promise.allSettled(
      sparkEntries.map(async ([symbol, poolId]) => {
        const closes = await fetchPoolOhlcvCloses(poolId);
        return { symbol, closes };
      }),
    );
    for (const item of settled) {
      if (item.status === 'fulfilled' && item.value.closes.length > 1)
        spark.set(item.value.symbol, item.value.closes);
    }
    sparklineBySymbol.value = spark;
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
      await refreshTokenSummariesAndSparks();
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

  async function refreshTraditionalQuotes(): Promise<void> {
    const result = await fetchTraditionalQuotes();
    traditionalPrices.value = result.quotes;
    traditionalQuoteSource.value = result.source;
  }

  async function refreshMorphoApy(): Promise<void> {
    morphoApyPct.value = await fetchSteakhouseUsdgApy();
  }

  let priceInterval: ReturnType<typeof setInterval> | undefined;
  let slowInterval: ReturnType<typeof setInterval> | undefined;

  function ignoreRefreshError(error: unknown): void {
    console.error('[HoodFolio] Background price refresh failed:', error);
  }

  function startAutoRefresh(): void {
    if (priceInterval)
      return;
    refreshPrices().catch(ignoreRefreshError);
    refreshChainStats().catch(ignoreRefreshError);
    refreshTraditionalQuotes().catch(ignoreRefreshError);
    refreshMorphoApy().catch(ignoreRefreshError);
    priceInterval = setInterval(() => {
      refreshPrices().catch(ignoreRefreshError);
    }, 30_000);
    slowInterval = setInterval(() => {
      refreshChainStats().catch(ignoreRefreshError);
      refreshTraditionalQuotes().catch(ignoreRefreshError);
      refreshMorphoApy().catch(ignoreRefreshError);
    }, 120_000);
  }

  function stopAutoRefresh(): void {
    if (priceInterval) {
      clearInterval(priceInterval);
      priceInterval = undefined;
    }
    if (slowInterval) {
      clearInterval(slowInterval);
      slowInterval = undefined;
    }
  }

  return {
    onChainPrices,
    change24hPct,
    volumeUsd24h,
    sparklineBySymbol,
    traditionalPrices,
    traditionalQuoteSource,
    hasTraditionalQuotes,
    premiumDiscount,
    morphoApyPct,
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
    refreshTraditionalQuotes,
    refreshMorphoApy,
    startAutoRefresh,
    stopAutoRefresh,
  };
});
