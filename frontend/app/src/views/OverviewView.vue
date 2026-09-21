<script setup lang="ts">
import { getHomeStockRows } from '@/chain/stock-markets';
import ChainStatsStrip from '@/components/overview/ChainStatsStrip.vue';
import HomeWalletSnapshot from '@/components/overview/HomeWalletSnapshot.vue';
import HowItWorks from '@/components/overview/HowItWorks.vue';
import NetworkRecipe from '@/components/overview/NetworkRecipe.vue';
import OverviewFaq from '@/components/overview/OverviewFaq.vue';
import OverviewFeatureGrid from '@/components/overview/OverviewFeatureGrid.vue';
import OverviewHero from '@/components/overview/OverviewHero.vue';
import OverviewTrust from '@/components/overview/OverviewTrust.vue';
import StockTable from '@/components/stocks/StockTable.vue';
import WalletModal from '@/components/wallet/WalletModal.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { usePriceStore } from '@/store/prices';
import { useWalletStore } from '@/store/wallet';

usePageMeta(
  'HoodFolio — Robinhood Chain Portfolio Dashboard',
  'Non-custodial portfolio dashboard for Robinhood Chain stock tokens, USDG, and Uniswap pools.',
);

const wallet = useWalletStore();
const prices = usePriceStore();
const modalOpen = ref(false);
const homeRows = computed(() => getHomeStockRows(
  prices.onChainPrices,
  {},
  {
    change24hBySymbol: prices.change24hPct,
    traditionalPrices: prices.traditionalPrices,
    volumeByTokenSummary: prices.volumeUsd24h,
  },
));

function openModal(): void {
  modalOpen.value = true;
}
</script>

<template>
  <div class="ov">
    <div class="ov-stage">
      <OverviewHero @connect="openModal()" />
      <div class="ov-stage__stats">
        <ChainStatsStrip />
      </div>
    </div>

    <div class="ov-rest">
      <OverviewFeatureGrid />

      <section class="ov-diff">
        <h2 class="ov-diff__h">
          Live stock token markets
        </h2>
        <p class="ov-diff__s">
          On-chain prices and 24h change from DexPaprika.
          <template v-if="prices.hasTraditionalQuotes">
            Premium/discount is versus delayed Finnhub last price — not a live NYSE NBBO.
          </template>
          <template v-else>
            Traditional quotes and premium/discount appear only when a live quote API is configured.
          </template>
        </p>
        <div class="card ov-diff__table">
          <StockTable
            :rows="homeRows"
            compact
          />
        </div>
        <RouterLink
          class="ov-diff__all"
          to="/stocks"
        >
          View all stock tokens →
        </RouterLink>
      </section>

      <HowItWorks />

      <HomeWalletSnapshot v-if="wallet.isConnected" />
      <NetworkRecipe
        v-else
        @connect="openModal()"
      />

      <OverviewTrust />
      <OverviewFaq />
    </div>

    <WalletModal v-model:open="modalOpen" />
  </div>
</template>

<style scoped>
.ov {
  padding: 0 0 64px;
}

.ov-stage {
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: var(--hf-hero-image);
  background-size: cover;
  background-position: center;
  padding: 8px 16px 28px;
}

.ov-stage__stats {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.ov-rest {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 16px 0;
}

.ov-diff { margin-bottom: 56px; }

.ov-diff__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  color: var(--hf-ink);
  margin-bottom: 8px;
}

.ov-diff__s {
  max-width: 720px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--hf-ink-3);
  margin-bottom: 16px;
}

.ov-diff__table {
  padding: 4px 8px;
  margin-bottom: 14px;
}

.ov-diff__all {
  font-family: var(--font-ui);
  font-weight: 600;
  color: var(--hf-green);
  text-decoration: none;
}
</style>
