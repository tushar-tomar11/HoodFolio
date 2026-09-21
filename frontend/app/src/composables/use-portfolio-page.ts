import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { STOCK_LOGO_DOMAINS, type StockHolding } from '@/chain/portfolio-types';
import { type TokenPosition, useChainData } from '@/composables/use-chain-data';
import { usePriceStore } from '@/store/prices';
import { useWalletStore } from '@/store/wallet';

export type PortfolioEmptyKind = 'eth' | 'empty';

export interface PortfolioPageModel {
  address: ComputedRef<string>;
  error: DeepReadonly<Ref<string | null>>;
  ethBalanceWei: ComputedRef<bigint>;
  hasFetched: DeepReadonly<Ref<boolean>>;
  isLoading: DeepReadonly<Ref<boolean>>;
  lastUpdated: ComputedRef<Date | null>;
  refresh: () => Promise<void>;
  stockHoldings: ComputedRef<StockHolding[]>;
  totalValueUSD: ComputedRef<number>;
  usdgBalance: ComputedRef<number>;
  usdgFormatted: ComputedRef<string>;
  emptyKind: ComputedRef<PortfolioEmptyKind>;
}

function toHolding(position: TokenPosition, onChainPrice: number | undefined, premium: number | undefined, marketPrice: number | undefined, change24hPct: number | undefined): StockHolding {
  return {
    symbol: position.symbol,
    name: position.name,
    shares: position.balance,
    currentValueUSD: position.valueUSD,
    change24hPct: change24hPct ?? Number.NaN,
    onChainPrice: onChainPrice ?? null,
    marketPrice: marketPrice ?? null,
    premium: premium ?? Number.NaN,
    tokenAddress: position.address,
    logoDomain: STOCK_LOGO_DOMAINS[position.symbol] ?? '',
  };
}

export function usePortfolioPage(): PortfolioPageModel {
  const wallet = useWalletStore();
  const chain = useChainData();
  const prices = usePriceStore();

  const stockHoldings = computed(() =>
    chain.tokenPositions.value
      .filter(position => position.symbol !== 'USDG')
      .map(position => toHolding(
        position,
        prices.onChainPrices.get(position.symbol),
        prices.premiumDiscount[position.symbol],
        prices.traditionalPrices.get(position.symbol),
        prices.change24hPct.get(position.symbol),
      )),
  );

  const usdgPosition = computed(() =>
    chain.tokenPositions.value.find(position => position.symbol === 'USDG'),
  );

  const usdgBalance = computed(() => usdgPosition.value?.balance ?? 0);
  const usdgFormatted = computed(() => usdgPosition.value?.formattedBalance ?? '0.00');

  const totalValueUSD = computed(() => {
    const stocks = stockHoldings.value.reduce((sum, row) => sum + (row.currentValueUSD ?? 0), 0);
    const usdg = usdgPosition.value?.valueUSD ?? 0;
    return stocks + usdg;
  });

  const emptyKind = computed<PortfolioEmptyKind>(() => {
    if (wallet.ethBalanceWei > 0n || usdgBalance.value > 0)
      return 'eth';
    return 'empty';
  });

  const address = computed(() => wallet.address ?? '');
  const lastUpdated = computed(() => prices.lastUpdated);

  async function refresh(): Promise<void> {
    await Promise.all([chain.refresh(), prices.refreshPrices()]);
  }

  return {
    address,
    error: chain.error,
    ethBalanceWei: computed(() => wallet.ethBalanceWei),
    hasFetched: chain.hasFetched,
    isLoading: chain.isLoading,
    lastUpdated,
    refresh,
    stockHoldings,
    totalValueUSD,
    usdgFormatted,
    usdgBalance,
    emptyKind,
  };
}
