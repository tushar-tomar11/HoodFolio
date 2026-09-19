import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { type MemeCoinRow, MOCK_CHAIN_STATS } from '@/chain/mock-chain-stats';

export type MemeFilter = 'all' | 'gainers' | 'losers' | 'trending';

export type MemeSortKey =
  | 'rank'
  | 'symbol'
  | 'marketCapUSD'
  | 'volume24hUSD'
  | 'change24hPct'
  | 'holders';

export const MEME_FILTERS: { id: MemeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'gainers', label: 'Gainers' },
  { id: 'losers', label: 'Losers' },
  { id: 'trending', label: 'Trending' },
];

export interface MemeMarketsModel {
  filter: DeepReadonly<Ref<MemeFilter>>;
  rows: ComputedRef<MemeCoinRow[]>;
  setFilter: (id: MemeFilter) => void;
  setSort: (key: MemeSortKey) => void;
  sortDir: DeepReadonly<Ref<'asc' | 'desc'>>;
  sortKey: DeepReadonly<Ref<MemeSortKey>>;
}

function matchesFilter(row: MemeCoinRow, filter: MemeFilter): boolean {
  if (filter === 'gainers')
    return row.change24hPct > 0;
  if (filter === 'losers')
    return row.change24hPct < 0;
  if (filter === 'trending')
    return row.trending;
  return true;
}

function compareMemeRows(
  left: MemeCoinRow,
  right: MemeCoinRow,
  key: MemeSortKey,
  dir: 'asc' | 'desc',
): number {
  const mul = dir === 'asc' ? 1 : -1;
  if (key === 'symbol')
    return mul * left.symbol.localeCompare(right.symbol);
  return mul * (left[key] - right[key]);
}

export function useMemeMarkets(): MemeMarketsModel {
  const filter = shallowRef<MemeFilter>('all');
  const sortKey = shallowRef<MemeSortKey>('marketCapUSD');
  const sortDir = shallowRef<'asc' | 'desc'>('desc');

  const rows = computed(() => {
    const list = MOCK_CHAIN_STATS.topMemeCoins.filter(row => matchesFilter(row, filter.value));
    return [...list].sort((left, right) =>
      compareMemeRows(left, right, sortKey.value, sortDir.value),
    );
  });

  function setFilter(id: MemeFilter): void {
    filter.value = id;
  }

  function setSort(key: MemeSortKey): void {
    if (sortKey.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
      return;
    }
    sortKey.value = key;
    sortDir.value = key === 'symbol' ? 'asc' : 'desc';
  }

  return {
    filter: readonly(filter),
    rows,
    setFilter,
    setSort,
    sortDir: readonly(sortDir),
    sortKey: readonly(sortKey),
  };
}
