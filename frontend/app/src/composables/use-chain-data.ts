import type { ComputedRef, DeepReadonly, Ref } from 'vue';
import { formatUnits } from 'viem';
import { ONCHAIN_PRICES } from '@/chain/mock-data';
import { erc20Abi, publicClient, STOCK_TOKENS } from '@/chain/robinhood-chain';
import { useWalletStore } from '@/store/wallet';
import { formatTokenAmount } from '@/utils/formatting';

export interface TokenPosition {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  balance: number;
  formattedBalance: string;
  valueUSD: number;
  rawBalance: bigint;
}

export interface ChainData {
  balances: DeepReadonly<Ref<Record<string, bigint>>>;
  tokenPositions: ComputedRef<TokenPosition[]>;
  totalValueUSD: ComputedRef<number>;
  isLoading: DeepReadonly<Ref<boolean>>;
  error: DeepReadonly<Ref<string | null>>;
  fetchBalances: (walletAddress: `0x${string}`) => Promise<void>;
  refresh: () => Promise<void>;
}

function createChainData(): ChainData {
  const wallet = useWalletStore();
  const balances = ref<Record<string, bigint>>({});
  const isLoading = shallowRef(false);
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

      const newBalances: Record<string, bigint> = {};
      symbols.forEach((symbol, i) => {
        const result = results[i];
        if (result?.status === 'success')
          newBalances[symbol] = result.result;
        else
          newBalances[symbol] = 0n;
      });
      balances.value = newBalances;
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
    if (addr)
      await fetchBalances(addr);
    else
      balances.value = {};
  }, { immediate: true });

  async function refresh(): Promise<void> {
    if (wallet.address)
      await fetchBalances(wallet.address);
  }

  const tokenPositions = computed(() => Object.entries(STOCK_TOKENS).map(([symbol, token]) => {
    const rawBalance = balances.value[symbol] ?? 0n;
    const humanBalance = Number(formatUnits(rawBalance, token.decimals));
    const price = ONCHAIN_PRICES[symbol] ?? 0;
    const valueUSD = humanBalance * price;
    return {
      ...token,
      symbol,
      balance: humanBalance,
      formattedBalance: formatTokenAmount(rawBalance, token.decimals),
      valueUSD,
      rawBalance,
    };
  }).filter(position => position.balance > 0));

  const totalValueUSD = computed(() =>
    tokenPositions.value.reduce((sum, position) => sum + position.valueUSD, 0),
  );

  return {
    balances: readonly(balances),
    tokenPositions,
    totalValueUSD,
    isLoading: readonly(isLoading),
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
