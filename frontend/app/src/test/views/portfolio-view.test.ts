import type { StockHolding } from '@/chain/portfolio-types';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, type ComputedRef, reactive, type Ref, ref } from 'vue';
import PortfolioView from '@/views/PortfolioView.vue';

const walletState = reactive({
  isConnected: false,
  ethBalance: '0.0042 ETH',
});
const holdings = ref<StockHolding[]>([]);
const emptyKind = ref<'eth' | 'empty'>('empty');

vi.mock('@/composables/use-page-meta', () => ({
  usePageMeta: (): void => undefined,
}));

vi.mock('@/composables/use-wallet-toasts', () => ({
  useWalletToasts: (): void => undefined,
}));

vi.mock('@/composables/use-chain-data', () => ({
  useChainData: (): {
    tokenPositions: ComputedRef<never[]>;
    isLoading: Ref<boolean>;
    hasFetched: Ref<boolean>;
    error: Ref<null>;
    refresh: () => Promise<void>;
  } => ({
    tokenPositions: computed(() => []),
    isLoading: ref(false),
    hasFetched: ref(true),
    error: ref(null),
    refresh: async () => undefined,
  }),
}));

vi.mock('@/store/wallet', () => ({
  useWalletStore: (): {
    isConnected: boolean;
    address: string;
    ethBalance: string;
    ethBalanceWei: bigint;
  } => ({
    get isConnected(): boolean {
      return walletState.isConnected;
    },
    get address(): string {
      return walletState.isConnected ? '0x1111111111111111111111111111111111111111' : '';
    },
    get ethBalance(): string {
      return walletState.ethBalance;
    },
    get ethBalanceWei(): bigint {
      return walletState.isConnected ? 10n ** 15n : 0n;
    },
  }),
}));

vi.mock('@/composables/use-portfolio-page', () => ({
  usePortfolioPage: (): {
    address: ComputedRef<string>;
    error: Ref<null>;
    ethBalanceWei: ComputedRef<bigint>;
    hasFetched: Ref<boolean>;
    isLoading: Ref<boolean>;
    lastUpdated: ComputedRef<Date>;
    refresh: () => Promise<void>;
    stockHoldings: Ref<StockHolding[]>;
    totalValueUSD: ComputedRef<number>;
    usdgBalance: ComputedRef<number>;
    usdgFormatted: ComputedRef<string>;
    emptyKind: Ref<'eth' | 'empty'>;
  } => ({
    address: computed(() => '0x1111111111111111111111111111111111111111'),
    error: ref(null),
    ethBalanceWei: computed(() => 10n ** 15n),
    hasFetched: ref(true),
    isLoading: ref(false),
    lastUpdated: computed(() => new Date()),
    refresh: async () => undefined,
    stockHoldings: holdings,
    totalValueUSD: computed(() => holdings.value.reduce((sum, row) => sum + (row.currentValueUSD ?? 0), 0)),
    usdgBalance: computed(() => 0),
    usdgFormatted: computed(() => '0.00'),
    emptyKind,
  }),
}));

vi.mock('@/composables/use-toast', () => ({
  useToast: (): {
    show: ReturnType<typeof vi.fn>;
    dismiss: ReturnType<typeof vi.fn>;
    toasts: ComputedRef<never[]>;
  } => ({ show: vi.fn(), dismiss: vi.fn(), toasts: computed(() => []) }),
}));

describe('portfolioView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    walletState.isConnected = false;
    holdings.value = [];
    emptyKind.value = 'empty';
  });

  describe('when wallet is not connected', () => {
    it('shows connect wallet prompt', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      expect(wrapper.find('[data-testid="connect-prompt"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="portfolio-header"]').exists()).toBe(false);
    });
    it('does not show any portfolio numbers', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      expect(wrapper.text()).not.toMatch(/\$\d+/);
    });
  });

  describe('when wallet is connected with zero balances', () => {
    beforeEach(() => {
      walletState.isConnected = true;
      holdings.value = [];
      emptyKind.value = 'empty';
    });
    it('shows empty state (C2 or C3), not an empty table', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      expect(wrapper.find('[data-testid="empty-portfolio"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="stock-holdings-table"]').exists()).toBe(false);
    });
    it('provides a CTA to get stock tokens', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      const link = wrapper.find('a[href*="uniswap"]');
      expect(link.exists()).toBe(true);
    });
  });

  describe('when wallet is connected with real balances', () => {
    beforeEach(() => {
      walletState.isConnected = true;
      holdings.value = [{
        symbol: 'NVDA',
        name: 'NVIDIA',
        shares: 150,
        currentValueUSD: 21282,
        change24hPct: Number.NaN,
        onChainPrice: 141.88,
        marketPrice: 142.18,
        premium: -0.21,
        tokenAddress: '0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC',
        logoDomain: 'nvidia.com',
      }];
    });
    it('only shows tokens with non-zero balances', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      const rows = wrapper.findAll('[data-testid="stock-row"]');
      expect(rows).toHaveLength(1);
      expect(rows[0].text()).toContain('NVDA');
    });
    it('shows USD value computed from real DexPaprika price', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      expect(wrapper.text()).toContain('$21,282');
    });
    it('shows PremiumBadge on each holding row', () => {
      const wrapper = mount(PortfolioView, {
        global: { stubs: { RouterLink: RouterLinkStub, WalletModal: true } },
      });
      const badges = wrapper.findAll('[data-testid="premium-badge"]');
      expect(badges.length).toBeGreaterThan(0);
    });
  });
});
