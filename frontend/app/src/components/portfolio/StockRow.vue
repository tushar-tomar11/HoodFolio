<script setup lang="ts">
import type { StockHolding } from '@/chain/mock-portfolio';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';
import { formatPercent, formatUSD } from '@/utils/formatting';

const { holding } = defineProps<{
  holding: StockHolding;
}>();

const logoFailed = ref(false);
const logoSrc = computed(() =>
  holding.logoDomain ? `https://logo.clearbit.com/${holding.logoDomain}` : '',
);

const up = computed(() => holding.change24hPct >= 0);

const uniswapHref = computed(() =>
  `https://app.uniswap.org/swap?outputCurrency=${holding.tokenAddress}&chain=robinhood`,
);

const sharesLabel = computed(() => {
  const formatted = holding.shares.toLocaleString('en-US', { maximumFractionDigits: 4 });
  return `${formatted} shares`;
});

function onLogoError(): void {
  logoFailed.value = true;
}
</script>

<template>
  <div class="srow">
    <div class="srow__name">
      <div
        class="srow__logo"
        :style="{ background: logoFailed || !logoSrc ? 'var(--hf-green-bg)' : 'var(--hf-surface-2)' }"
      >
        <img
          v-if="logoSrc && !logoFailed"
          :src="logoSrc"
          :alt="holding.symbol"
          @error="onLogoError()"
        />
        <span v-else>{{ holding.symbol.slice(0, 1) }}</span>
      </div>
      <div>
        <p class="srow__sym">
          {{ holding.symbol }}
        </p>
        <p class="srow__co">
          {{ holding.name }}
        </p>
      </div>
    </div>

    <div class="srow__num col-right">
      <p class="srow__main num">
        {{ sharesLabel }}
      </p>
      <p class="srow__sub num">
        Avg {{ formatUSD(holding.avgCostUSD) }}
      </p>
    </div>

    <div class="srow__num col-right">
      <p class="srow__px num">
        {{ formatUSD(holding.onChainPrice) }}
      </p>
      <p class="srow__sub num">
        NYSE {{ formatUSD(holding.marketPrice) }}
      </p>
    </div>

    <div class="srow__num col-right">
      <p class="srow__val num">
        {{ formatUSD(holding.currentValueUSD) }}
      </p>
    </div>

    <div class="srow__num col-right">
      <p
        class="srow__chg num"
        :class="up ? 'price-up' : 'price-down'"
      >
        {{ up ? '▲' : '▼' }}{{ formatPercent(Math.abs(holding.change24hPct), false) }}
      </p>
    </div>

    <div class="srow__badge">
      <HfPremiumBadge :premium="holding.premium" />
      <a
        class="srow__trade"
        :href="uniswapHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trade on Uniswap →
      </a>
    </div>
  </div>
</template>

<style scoped>
.srow {
  display: grid;
  grid-template-columns: minmax(160px, 1.5fr) 1fr 0.9fr 1fr 0.8fr minmax(150px, auto);
  gap: 12px;
  align-items: center;
  padding: 14px 12px;
  border-bottom: 1px solid var(--hf-surface-2);
  min-width: 780px;
  transition: background-color 150ms ease;
}

.srow:hover {
  background: var(--hf-surface-2);
}

.srow__name {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.srow__logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 700;
  color: var(--hf-green-text);
}

.srow__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.srow__sym {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 600;
  color: var(--hf-ink);
}

.srow__co {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 400;
  color: var(--hf-ink-3);
}

.srow__main {
  font-weight: 500;
  font-size: 14px;
  color: var(--hf-ink);
}

.srow__sub {
  font-size: 12px;
  color: var(--hf-ink-3);
}

.srow__px {
  font-weight: 600;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
}

.srow__val {
  font-weight: 700;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--hf-ink);
}

.srow__chg {
  font-weight: 700;
  font-size: 14px;
}

.srow__badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.srow__trade {
  font-size: 11px;
  color: var(--hf-green);
  text-decoration: none;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 150ms ease, transform 150ms ease;
}

.srow:hover .srow__trade {
  opacity: 1;
  transform: translateX(0);
}

.col-right {
  text-align: right;
}
</style>
