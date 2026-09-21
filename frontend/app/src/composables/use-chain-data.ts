import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { formatUnits } from 'viem';
import { erc20Abi, publicClient, STOCK_TOKENS } from '@/chain/robinhood-chain';
import { usePriceStore } from '@/store/prices';
import { useWalletStore } from '@/store/wallet';
import { formatTokenAmount } from '@/utils/formatting';

export interface TokenPosition {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  balance: number;
  formattedBalance: string;
  valueUSD: number | null;
  rawBalance: bigint;
}

export interface ChainData {
  balances: DeepReadonly<Ref<Record<string, bigint>>>;
  tokenPositions: ComputedRef<TokenPosition[]>;
  totalValueUSD: ComputedRef<number>;
  isLoading: DeepReadonly<Ref<boolean>>;
  hasFetched: DeepReadonly<Ref<boolean>>;
  error: DeepReadonly<Ref<string | null>>;
  fetchBalances: (walletAddress: `0x${string}`) => Promise<void>;
  refresh: () => Promise<void>;
}

function createChainData(): ChainData {
  const wallet = useWalletStore();
  const prices = usePriceStore();
  const balances = ref<Record<string, bigint>>({});
  const isLoading = shallowRef(false);
  const hasFetched = shallowRef(false);
  const error = shallowRef<string | null>(null);
  const symbols = Object.keys(STOCK_TOKENS);

  async function fetchBalances(walletAddress: `0x${string}`): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      const calls = Object.values(STOCK_TOKENS).map(token => ({
        address: token.address,
        abi: erc20Abi,
        functionName: 'balanceOf' as const,
        args: [walletAddress] as const,
      }));
      const results = await publicClient.multicall({ contracts: calls, allowFailure: true });
      const next: Record<string, bigint> = {};
      symbols.forEach((symbol, i) => {
        const result = results[i];
        next[symbol] = result?.status === 'success' ? result.result : 0n;
      });
      balances.value = next;
      hasFetched.value = true;
    }
    catch (error_: unknown) {
      const message = error_ instanceof Error ? error_.message : 'Failed to fetch balances';
      error.value = message;
      console.error('[HoodFolio] Balance fetch failed:', error_);
    }
    finally {
      isLoading.value = false;
    }
  }

  watch(() => wallet.address, async (addr) => {
    if (addr) {
      hasFetched.value = false;
      await fetchBalances(addr);
      return;
    }
    balances.value = {};
    hasFetched.value = false;
  }, { immediate: true });

  async function refresh(): Promise<void> {
    if (wallet.address)
      await fetchBalances(wallet.address);
  }

  const tokenPositions = computed(() => Object.entries(STOCK_TOKENS).map(([symbol, token]) => {
    const rawBalance = balances.value[symbol] ?? 0n;
    const humanBalance = Number(formatUnits(rawBalance, token.decimals));
    const price = prices.onChainPrices.get(symbol);
    return {
      ...token,
      symbol,
      balance: humanBalance,
      formattedBalance: formatTokenAmount(rawBalance, token.decimals),
      valueUSD: price === undefined ? null : humanBalance * price,
      rawBalance,
    };
  }).filter(position => position.balance > 0));

  const totalValueUSD = computed(() =>
    tokenPositions.value.reduce((sum, position) => sum + (position.valueUSD ?? 0), 0),
  );

  return {
    balances: readonly(balances),
    tokenPositions,
    totalValueUSD,
    isLoading: readonly(isLoading),
    hasFetched: readonly(hasFetched),
    error: readonly(error),
    fetchBalances,
    refresh,
  };
}

let shared: ChainData | undefined;

export function useChainData(): ChainData {
  shared ??= createChainData();
  return shared;
}
