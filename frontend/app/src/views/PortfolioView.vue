<script setup lang="ts">
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import HfButton from '@/components/hf/HfButton.vue';
import HfSkeleton from '@/components/hf/HfSkeleton.vue';
import HfStatusCard from '@/components/hf/HfStatusCard.vue';
import MemeHoldings from '@/components/portfolio/MemeHoldings.vue';
import PortfolioHeader from '@/components/portfolio/PortfolioHeader.vue';
import StockHoldings from '@/components/portfolio/StockHoldings.vue';
import YieldCard from '@/components/portfolio/YieldCard.vue';
import WalletModal from '@/components/wallet/WalletModal.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { usePortfolioPage } from '@/composables/use-portfolio-page';
import { useToast } from '@/composables/use-toast';
import { useWalletStore } from '@/store/wallet';

usePageMeta(
  'My Portfolio | HoodFolio',
  'Track Robinhood Chain stock tokens, USDG yield, and meme coins from your wallet.',
);

type PortfolioTab = 'all' | 'stocks' | 'memes' | 'yield';

const TABS: { id: PortfolioTab; label: string }[] = [
  { id: 'all', label: 'All Holdings' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'memes', label: 'Meme Coins' },
  { id: 'yield', label: 'Yield' },
];

const nvda = STOCK_TOKENS.NVDA;
const NVDA_TRADE = nvda
  ? `https://app.uniswap.org/swap?outputCurrency=${nvda.address}&chain=robinhood`
  : 'https://app.uniswap.org';

const route = useRoute();
const wallet = useWalletStore();
const toast = useToast();
const {
  address,
  change24hPct,
  change24hUSD,
  error,
  isLoading,
  isPreview,
  lastUpdated,
  memeHoldings,
  refresh,
  stockHoldings,
  totalValueUSD,
  usdgPosition,
} = usePortfolioPage();
const selectedTab = ref<PortfolioTab>('all');
const modalOpen = ref(false);

function openModal(): void {
  modalOpen.value = true;
}

function setTab(id: PortfolioTab): void {
  selectedTab.value = id;
}

async function onRefresh(): Promise<void> {
  await refresh();
  toast.show('↻ Portfolio refreshed', 'info');
}

const demoUnlocked = computed(() =>
  import.meta.env.DEV && String(route.query.demo ?? '') === '1',
);

const displayAddress = computed(() =>
  address.value || (demoUnlocked.value ? '0x322F0929c4625eD5bAd873c95208D54E1c003b2d' : ''),
);

const showDashboard = computed(() => wallet.isConnected || demoUnlocked.value);
const showHeader = computed(() => selectedTab.value === 'all' || selectedTab.value === 'stocks');
const showStocks = computed(() => selectedTab.value === 'all' || selectedTab.value === 'stocks');
const showMemes = computed(() => selectedTab.value === 'all' || selectedTab.value === 'memes');
const showYield = computed(() => selectedTab.value === 'all' || selectedTab.value === 'yield');
</script>

<template>
  <div class="pf">
    <template v-if="!showDashboard">
      <div class="pf-gate">
        <p class="pf-gate__lock">
          🔒
        </p>
        <h1 class="pf-gate__h">
          Connect your wallet to see your portfolio
        </h1>
        <p class="pf-gate__p">
          HoodFolio reads directly from Robinhood Chain.
          Your data stays on-chain — we never store anything.
        </p>
        <HfButton
          variant="primary"
          size="lg"
          @click="openModal()"
        >
          Connect Wallet
        </HfButton>
      </div>
    </template>

    <template v-else>
      <div
        v-if="isLoading"
        class="pf-load"
      >
        <HfSkeleton
          height="42px"
          width="240px"
        />
        <HfSkeleton
          height="18px"
          width="180px"
        />
        <HfSkeleton height="220px" />
      </div>

      <HfStatusCard
        v-else-if="error"
        title="Couldn't load balances"
        :body="error"
        action-label="Retry"
        @action="onRefresh()"
      />

      <template v-else>
        <div
          v-if="isPreview"
          class="pf-empty"
        >
          <p class="pf-empty__t">
            You don't have any stock tokens yet.
          </p>
          <a
            class="pf-empty__a"
            :href="NVDA_TRADE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy NVDA, TSLA, or AAPL on Uniswap →
          </a>
          <p class="pf-note">
            This is what it looks like
          </p>
        </div>

        <nav
          class="pf-tabs"
          aria-label="Holdings"
        >
          <button
            v-for="tab in TABS"
            :key="tab.id"
            type="button"
            class="pf-tabs__btn"
            :class="{ 'pf-tabs__btn--on': selectedTab === tab.id }"
            @click="setTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </nav>

        <HfButton
          variant="ghost"
          size="sm"
          @click="onRefresh()"
        >
          Refresh
        </HfButton>

        <PortfolioHeader
          v-if="showHeader"
          :total-value-usd="totalValueUSD"
          :change24h-usd="change24hUSD"
          :change24h-pct="change24hPct"
          :address="displayAddress"
          :last-updated="lastUpdated"
          :stock-count="stockHoldings.length"
          :usdg-yield-usd="usdgPosition.earnedUSD"
          :meme-count="memeHoldings.length"
        />

        <StockHoldings
          v-if="showStocks"
          :holdings="stockHoldings"
        />
        <MemeHoldings
          v-if="showMemes"
          :holdings="memeHoldings"
        />
        <YieldCard
          v-if="showYield"
          :position="usdgPosition"
        />
      </template>
    </template>

    <WalletModal
      v-model:open="modalOpen"
    />
  </div>
</template>

<style scoped>
.pf {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.pf-gate {
  min-height: 56vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 16px;
}

.pf-gate__lock {
  font-size: 56px;
  margin-bottom: 16px;
}

.pf-gate__h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  color: var(--hf-ink);
  max-width: 520px;
  margin-bottom: 12px;
}

.pf-gate__p {
  max-width: 440px;
  font-size: 15px;
  color: var(--hf-ink-3);
  margin-bottom: 24px;
  line-height: 1.55;
}

.pf-load {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pf-empty {
  margin-bottom: 16px;
}

.pf-empty__t {
  font-family: var(--font-ui);
  font-weight: 700;
  margin-bottom: 8px;
}

.pf-empty__a {
  display: inline-block;
  color: var(--hf-green);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 12px;
}

.pf-note {
  background: var(--hf-amber-bg);
  color: var(--hf-amber-text);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  margin-bottom: 20px;
}

.pf-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 24px;
}

.pf-tabs__btn {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 500;
  color: var(--hf-ink-3);
  background: transparent;
  border: 0;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
}

.pf-tabs__btn--on {
  color: var(--hf-green);
  background: var(--hf-green-bg);
  font-weight: 600;
}
</style>
