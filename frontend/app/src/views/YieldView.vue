<script setup lang="ts">
import HfCard from '@/components/hf/HfCard.vue';
import { useChainData } from '@/composables/use-chain-data';
import { usePageMeta } from '@/composables/use-page-meta';
import { STEAKHOUSE_USDG_APP_URL } from '@/services/morpho';
import { usePriceStore } from '@/store/prices';
import { useWalletStore } from '@/store/wallet';
import { formatPercent } from '@/utils/formatting';

usePageMeta(
  'USDG Yield | HoodFolio',
  'USDG yield via Morpho Steakhouse vault on Robinhood Chain.',
);

const wallet = useWalletStore();
const chain = useChainData();
const prices = usePriceStore();
const expanded = shallowRef(false);

const usdg = computed(() =>
  chain.tokenPositions.value.find(position => position.symbol === 'USDG'),
);

const apyLabel = computed(() => {
  if (!Number.isFinite(prices.morphoApyPct))
    return null;
  return formatPercent(prices.morphoApyPct, false);
});

function toggleExplain(): void {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div class="yv">
    <header class="yv-head">
      <h1 class="yv-h">
        USDG Yield
      </h1>
      <p class="yv-sub">
        Steakhouse USDG on Morpho (Robinhood Chain). HoodFolio reads APY from Morpho’s public API.
        Deposits happen on Morpho, not in this app.
      </p>
    </header>

    <HfCard
      class="yv-vault"
      padding="lg"
    >
      <p class="yv-vault__name">
        Steakhouse USDG
      </p>
      <p
        v-if="apyLabel"
        class="yv-apy num"
      >
        {{ apyLabel }}
      </p>
      <p
        v-else
        class="yv-apy yv-apy--wait num"
      >
        —
      </p>
      <p class="yv-dep">
        {{ apyLabel ? 'Net APY from Morpho (excluding rewards). Instant rate, not your personal yield.' : 'Morpho APY unavailable — no estimated rate is shown.' }}
      </p>
      <a
        class="yv-cta"
        :href="STEAKHOUSE_USDG_APP_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Steakhouse USDG on Morpho →
      </a>
      <button
        type="button"
        class="yv-toggle"
        @click="toggleExplain()"
      >
        What is this?
      </button>
      <p
        v-if="expanded"
        class="yv-explain"
      >
        USDG is the chain stablecoin (6 decimals). HoodFolio reads your USDG
        balance via viem multicall. Advertised APY is Morpho’s instant net APY
        for vault 0xBeEff…409dd. Morpho may disable deposits; confirm on their site.
      </p>
    </HfCard>

    <section
      v-if="wallet.isConnected"
      class="yv-pos"
    >
      <h2 class="yv-sec">
        Your USDG balance
      </h2>
      <HfCard>
        <p class="yv-pos__l">
          USDG Balance
        </p>
        <p class="yv-pos__v num">
          {{ usdg?.formattedBalance ?? '0.00' }} USDG
        </p>
        <p class="yv-note">
          Balance read live from Chain 4663 via viem multicall.
        </p>
      </HfCard>
    </section>
  </div>
</template>

<style scoped>
.yv {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.yv-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.yv-sub {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
}

.yv-vault { margin-bottom: 36px; }

.yv-vault__name {
  font-family: var(--font-ui);
  font-size: 20px;
  font-weight: 700;
}

.yv-apy {
  font-weight: 700;
  font-size: 52px;
  color: var(--hf-green);
}

.yv-apy--wait { color: var(--hf-ink-4); }

.yv-dep { margin-bottom: 16px; color: var(--hf-ink-3); }

.yv-cta {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  background: var(--hf-green);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 16px;
}

.yv-toggle {
  display: block;
  background: none;
  border: 0;
  font-weight: 600;
  cursor: pointer;
}

.yv-explain {
  margin-top: 12px;
  color: var(--hf-ink-3);
}

.yv-sec {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.yv-pos__l { font-size: 12px; color: var(--hf-ink-3); }

.yv-pos__v { font-size: 22px; font-weight: 700; }

.yv-note { font-size: 12px; color: var(--hf-ink-4); margin-top: 8px; }
</style>
