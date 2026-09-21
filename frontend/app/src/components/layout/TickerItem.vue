<script setup lang="ts">
import StockLogo from '@/components/stocks/StockLogo.vue';
import { formatPercent, formatPremium } from '@/utils/formatting';

defineOptions({ inheritAttrs: false });

const {
  symbol,
  onChainPrice = null,
  premium,
  change24hPct,
  hasData = false,
} = defineProps<{
  symbol: string;
  onChainPrice?: number | null;
  premium?: number;
  change24hPct?: number;
  hasData?: boolean;
}>();

const extraLabel = computed(() => {
  if (premium !== undefined && Number.isFinite(premium))
    return formatPremium(premium).text;
  if (change24hPct !== undefined && Number.isFinite(change24hPct))
    return `${change24hPct >= 0 ? '▲' : '▼'}${formatPercent(Math.abs(change24hPct), false)}`;
  return '—';
});

const extraClass = computed(() => {
  if (premium !== undefined && Number.isFinite(premium)) {
    if (premium > 0.1)
      return 'ticker-item__prem--up';
    if (premium < -0.1)
      return 'ticker-item__prem--down';
    return 'ticker-item__prem--flat';
  }
  if (change24hPct !== undefined && Number.isFinite(change24hPct))
    return change24hPct >= 0 ? 'ticker-item__prem--down' : 'ticker-item__prem--up';
  return 'ticker-item__prem--flat';
});

const priceText = computed(() => {
  if (!hasData || onChainPrice === null || onChainPrice === undefined)
    return '---';
  return `$${onChainPrice.toFixed(onChainPrice >= 10 ? 2 : 3)}`;
});
</script>

<template>
  <span class="ticker-item">
    <StockLogo
      :symbol="symbol"
      :size="16"
    />
    <span class="ticker-item__sym">{{ symbol }}</span>
    <span class="ticker-item__price">{{ priceText }}</span>
    <span
      class="ticker-item__prem"
      :class="extraClass"
    >
      {{ extraLabel }}
    </span>
    <span
      class="ticker-item__dot"
      aria-hidden="true"
    >
      ·
    </span>
  </span>
</template>

<style scoped>
.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.ticker-item__sym {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #666;
}

.ticker-item__price {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}

.ticker-item__prem {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.ticker-item__prem--up { color: var(--hf-amber); }
.ticker-item__prem--down { color: var(--hf-green); }
.ticker-item__prem--flat { color: #888; }

.ticker-item__dot {
  color: #333;
  padding: 0 16px;
}
</style>
