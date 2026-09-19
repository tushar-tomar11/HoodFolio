<script setup lang="ts">
import { getHomeStockRows } from '@/chain/stock-markets';
import ChainStatsStrip from '@/components/overview/ChainStatsStrip.vue';
import HowItWorks from '@/components/overview/HowItWorks.vue';
import OverviewHero from '@/components/overview/OverviewHero.vue';
import WalletPreview from '@/components/overview/WalletPreview.vue';
import StockTable from '@/components/stocks/StockTable.vue';
import WalletModal from '@/components/wallet/WalletModal.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { useWalletStore } from '@/store/wallet';

usePageMeta(
  'HoodFolio — Robinhood Chain Portfolio Dashboard',
  'The first dedicated portfolio dashboard for Robinhood Chain stock tokens, USDG yield, and meme coins.',
);

const wallet = useWalletStore();
const modalOpen = ref(false);
const homeRows = getHomeStockRows();

function openModal(): void {
  modalOpen.value = true;
}
</script>

<template>
  <div class="ov">
    <OverviewHero @connect="openModal()" />
    <ChainStatsStrip />

    <section class="ov-diff">
      <h2 class="ov-diff__h">
        What makes HoodFolio different
      </h2>
      <p class="ov-diff__s">
        See exactly whether each stock token is cheaper or more expensive
        on Robinhood Chain vs the traditional market.
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

    <WalletPreview
      v-if="!wallet.isConnected"
      @connect="openModal()"
    />

    <WalletModal v-model:open="modalOpen" />
  </div>
</template>

<style scoped>
.ov {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.ov-diff {
  margin-bottom: 56px;
}

.ov-diff__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  color: var(--hf-ink);
  margin-bottom: 8px;
}

.ov-diff__s {
  max-width: 640px;
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
