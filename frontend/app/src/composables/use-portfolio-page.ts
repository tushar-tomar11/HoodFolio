import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { holdingFromChainPosition, type MemeHolding, MOCK_PORTFOLIO, type StockHolding, type UsdgPosition } from '@/chain/mock-portfolio';
import { useChainData } from '@/composables/use-chain-data';
import { useWalletStore } from '@/store/wallet';

export interface PortfolioPageModel {
  address: ComputedRef<string>;
  change24hPct: ComputedRef<number>;
  change24hUSD: ComputedRef<number>;
  error: DeepReadonly<Ref<string | null>>;
  isLoading: DeepReadonly<Ref<boolean>>;
  isPreview: ComputedRef<boolean>;
  lastUpdated: ComputedRef<Date>;
  memeHoldings: ComputedRef<MemeHolding[]>;
  refresh: () => Promise<void>;
  stockHoldings: ComputedRef<StockHolding[]>;
  totalValueUSD: ComputedRef<number>;
  usdgPosition: ComputedRef<UsdgPosition>;
}

export function usePortfolioPage(): PortfolioPageModel {
  const wallet = useWalletStore();
  const chain = useChainData();

  const isPreview = computed(() => chain.tokenPositions.value.length === 0);

  const stockHoldings = computed(() => {
    const onChain = chain.tokenPositions.value.filter(position => position.symbol !== 'USDG');
    if (onChain.length > 0)
      return onChain.map(position => holdingFromChainPosition(position));
    return MOCK_PORTFOLIO.stockHoldings;
  });

  const memeHoldings = computed(() => MOCK_PORTFOLIO.memeHoldings);

  const usdgPosition = computed(() => {
    const onChain = chain.tokenPositions.value.find(position => position.symbol === 'USDG');
    if (!onChain)
      return MOCK_PORTFOLIO.usdgPosition;
    return {
      ...MOCK_PORTFOLIO.usdgPosition,
      depositedUSD: onChain.valueUSD,
    };
  });

  const totalValueUSD = computed(() => {
    const stocks = stockHoldings.value.reduce((sum, row) => sum + row.currentValueUSD, 0);
    const memes = memeHoldings.value.reduce((sum, row) => sum + row.valueUSD, 0);
    return stocks + memes + usdgPosition.value.depositedUSD + usdgPosition.value.earnedUSD;
  });

  const change24hUSD = computed(() => {
    const stockDelta = stockHoldings.value.reduce((sum, row) =>
      sum + row.currentValueUSD * (row.change24hPct / 100), 0);
    const memeDelta = memeHoldings.value.reduce((sum, row) =>
      sum + row.valueUSD * (row.change24hPct / 100), 0);
    return stockDelta + memeDelta;
  });

  const change24hPct = computed(() => {
    if (totalValueUSD.value === 0)
      return 0;
    return (change24hUSD.value / totalValueUSD.value) * 100;
  });

  const lastUpdated = computed(() => new Date());

  const address = computed(() => wallet.address ?? '');

  return {
    address,
    change24hPct,
    change24hUSD,
    error: chain.error,
    isLoading: chain.isLoading,
    isPreview,
    lastUpdated,
    memeHoldings,
    refresh: chain.refresh,
    stockHoldings,
    totalValueUSD,
    usdgPosition,
  };
}
