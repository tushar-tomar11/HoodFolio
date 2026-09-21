import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { type DexPaprikaDex, type DexPaprikaPool, fetchChainDexStats, fetchTopPools } from '@/services/dex-paprika';

export interface ChainAnalytics {
  dexStats: DeepReadonly<Ref<DexPaprikaDex[]>>;
  topPools: DeepReadonly<Ref<DexPaprikaPool[]>>;
  totalVolume24h: ComputedRef<number>;
  totalTvl: ComputedRef<number>;
  totalTxns24h: ComputedRef<number>;
  totalPools: ComputedRef<number>;
  isLoading: DeepReadonly<Ref<boolean>>;
  error: DeepReadonly<Ref<string | null>>;
  refresh: () => Promise<void>;
}

function ignoreAnalyticsError(error: unknown): void {
  console.error('[HoodFolio] Analytics refresh failed:', error);
}

export function useChainAnalytics(): ChainAnalytics {
  const dexStats = ref<DexPaprikaDex[]>([]);
  const topPools = ref<DexPaprikaPool[]>([]);
  const isLoading = shallowRef(false);
  const error = shallowRef<string | null>(null);

  const totalVolume24h = computed(() =>
    dexStats.value.reduce((sum, dex) => sum + (dex.volume_usd_24h ?? 0), 0),
  );
  const poolTvl = computed(() =>
    topPools.value.reduce((sum, pool) => sum + (pool.liquidity_usd ?? 0), 0),
  );
  const dexTvl = computed(() =>
    dexStats.value.reduce((sum, dex) => sum + (dex.liquidity_usd ?? 0), 0),
  );
  const totalTvl = computed(() => dexTvl.value > 0 ? dexTvl.value : poolTvl.value);
  const totalTxns24h = computed(() =>
    dexStats.value.reduce((sum, dex) => sum + (dex.transactions_24h ?? dex.txns_24h ?? 0), 0),
  );
  const totalPools = computed(() =>
    dexStats.value.reduce((sum, dex) => sum + (dex.pools_count ?? 0), 0),
  );

  async function refresh(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const [dexes, pools] = await Promise.all([fetchChainDexStats(), fetchTopPools(25)]);
      dexStats.value = dexes;
      topPools.value = pools;
    }
    catch (error_: unknown) {
      error.value = error_ instanceof Error ? error_.message : 'Failed to fetch analytics from DexPaprika';
    }
    finally {
      isLoading.value = false;
    }
  }

  let interval: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    refresh().catch(ignoreAnalyticsError);
    interval = setInterval(() => {
      refresh().catch(ignoreAnalyticsError);
    }, 60_000);
  });
  onUnmounted(() => {
    if (interval)
      clearInterval(interval);
  });

  return {
    dexStats: readonly(dexStats),
    topPools: readonly(topPools),
    totalVolume24h,
    totalTvl,
    totalTxns24h,
    totalPools,
    isLoading: readonly(isLoading),
    error: readonly(error),
    refresh,
  };
}
