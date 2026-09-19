import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { getStockMarketRows, type MarketSortKey, type SectorFilter, type StockMarketRow } from '@/chain/stock-markets';

export const SECTOR_FILTERS: { id: SectorFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'US Tech' },
  { id: 'finance', label: 'Finance' },
  { id: 'etf', label: 'ETFs' },
];

export const SORT_OPTIONS: { id: MarketSortKey; label: string }[] = [
  { id: 'marketCapUSD', label: 'Market Cap' },
  { id: 'volume24hUSD', label: 'Volume' },
  { id: 'premium', label: 'Premium' },
  { id: 'change24hPct', label: '24h Change' },
];

export interface StockMarketsModel {
  rows: ComputedRef<StockMarketRow[]>;
  searchInput: DeepReadonly<Ref<string>>;
  sector: DeepReadonly<Ref<SectorFilter>>;
  clearSearch: () => void;
  setDropdownSort: (key: MarketSortKey) => void;
  setSearch: (value: string) => void;
  setSector: (id: SectorFilter) => void;
  setSort: (key: MarketSortKey) => void;
  sortDir: DeepReadonly<Ref<'asc' | 'desc'>>;
  sortKey: DeepReadonly<Ref<MarketSortKey>>;
}

export function compareMarketRows(
  left: StockMarketRow,
  right: StockMarketRow,
  key: MarketSortKey,
  dir: 'asc' | 'desc',
): number {
  const mul = dir === 'asc' ? 1 : -1;
  if (key === 'symbol')
    return mul * left.symbol.localeCompare(right.symbol);
  return mul * (left[key] - right[key]);
}

function matchesSearch(row: StockMarketRow, query: string): boolean {
  if (!query)
    return true;
  return row.symbol.toLowerCase().includes(query) || row.name.toLowerCase().includes(query);
}

export function useStockMarkets(): StockMarketsModel {
  const searchInput = shallowRef('');
  const search = shallowRef('');
  const sector = shallowRef<SectorFilter>('all');
  const sortKey = shallowRef<MarketSortKey>('marketCapUSD');
  const sortDir = shallowRef<'asc' | 'desc'>('desc');
  let searchTimer: ReturnType<typeof setTimeout> | undefined;

  watch(searchInput, (value) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      search.value = value.trim().toLowerCase();
    }, 200);
  });

  onUnmounted(() => {
    clearTimeout(searchTimer);
  });

  const filtered = computed(() => {
    const query = search.value;
    const sectorId = sector.value;
    return getStockMarketRows().filter((row) => {
      if (sectorId !== 'all' && row.sector !== sectorId)
        return false;
      return matchesSearch(row, query);
    });
  });

  const rows = computed(() =>
    [...filtered.value].sort((left, right) =>
      compareMarketRows(left, right, sortKey.value, sortDir.value),
    ),
  );

  function setSearch(value: string): void {
    searchInput.value = value;
  }

  function clearSearch(): void {
    searchInput.value = '';
    search.value = '';
  }

  function setSector(id: SectorFilter): void {
    sector.value = id;
  }

  function setSort(key: MarketSortKey): void {
    if (sortKey.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
      return;
    }
    sortKey.value = key;
    sortDir.value = key === 'symbol' ? 'asc' : 'desc';
  }

  function setDropdownSort(key: MarketSortKey): void {
    sortKey.value = key;
    sortDir.value = 'desc';
  }

  return {
    rows,
    searchInput: readonly(searchInput),
    sector: readonly(sector),
    clearSearch,
    setDropdownSort,
    setSearch,
    setSector,
    setSort,
    sortDir: readonly(sortDir),
    sortKey: readonly(sortKey),
  };
}
