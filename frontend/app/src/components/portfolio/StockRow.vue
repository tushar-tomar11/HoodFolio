<script setup lang="ts">
import type { StockHolding } from '@/chain/portfolio-types';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';
import StockLogo from '@/components/stocks/StockLogo.vue';
import { formatUSD } from '@/utils/formatting';

const { holding } = defineProps<{
  holding: StockHolding;
}>();

const uniswapHref = computed(() =>
  `https://app.uniswap.org/swap?outputCurrency=${holding.tokenAddress}&chain=robinhood`,
);

const sharesLabel = computed(() => {
  const formatted = holding.shares.toLocaleString('en-US', { maximumFractionDigits: 4 });
  return `${formatted} shares`;
});

const valueText = computed(() =>
  holding.currentValueUSD === null ? 'Price unavailable' : formatUSD(holding.currentValueUSD),
);
</script>

<template>
  <div
    class="srow"
    data-testid="stock-row"
  >
    <div class="srow__name">
      <StockLogo
        :symbol="holding.symbol"
        :name="holding.name"
        :size="32"
      />
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
    </div>
    <div class="srow__num col-right">
      <p class="srow__px num">
        {{ holding.onChainPrice === null ? '—' : formatUSD(holding.onChainPrice) }}
      </p>
      <p class="srow__sub num">
        Ref {{ formatUSD(holding.marketPrice) }}
      </p>
    </div>
    <div class="srow__num col-right">
      <p class="srow__val num">
        {{ valueText }}
      </p>
    </div>
    <div class="srow__badge">
      <HfPremiumBadge
        v-if="Number.isFinite(holding.premium)"
        :premium="holding.premium"
      />
      <span v-else>—</span>
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
  grid-template-columns: minmax(160px, 1.5fr) 1fr 0.9fr 1fr minmax(150px, auto);
  gap: 12px;
  align-items: center;
  padding: 14px 12px;
  border-bottom: 1px solid var(--hf-surface-2);
  min-width: 720px;
}

.srow:hover { background: var(--hf-surface-2); }

.srow__name {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.srow__sym {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 600;
}

.srow__co {
  font-size: 12px;
  color: var(--hf-ink-3);
}

.srow__main { font-size: 14px; }

.srow__sub { font-size: 12px; color: var(--hf-ink-3); }

.srow__px { font-weight: 600; }

.srow__val { font-weight: 700; }

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
}

.col-right { text-align: right; }
</style>
