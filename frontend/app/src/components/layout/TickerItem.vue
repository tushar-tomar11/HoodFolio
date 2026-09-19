<script setup lang="ts">
import { calcPremium } from '@/chain/mock-data';

defineOptions({ inheritAttrs: false });

const {
  symbol,
  onChainPrice,
  traditionalPrice,
} = defineProps<{
  symbol: string;
  onChainPrice: number;
  traditionalPrice: number;
}>();

const premium = computed(() => calcPremium(onChainPrice, traditionalPrice));

const premiumText = computed(() => {
  const n = Math.abs(premium.value).toFixed(2);
  if (premium.value > 0)
    return `▲${n}% PREMIUM`;
  if (premium.value < 0)
    return `▼${n}% DISCOUNT`;
  return 'PAR';
});

const premiumClass = computed(() => {
  if (premium.value > 0)
    return 'ticker-item__prem--up';
  if (premium.value < 0)
    return 'ticker-item__prem--down';
  return 'ticker-item__prem--flat';
});

const priceText = computed(() => `$${onChainPrice.toFixed(onChainPrice >= 10 ? 2 : 3)}`);
</script>

<template>
  <span class="ticker-item">
    <span class="ticker-item__sym">{{ symbol }}</span>
    <span class="ticker-item__price">{{ priceText }}</span>
    <span
      class="ticker-item__prem"
      :class="premiumClass"
    >
      {{ premiumText }}
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
  gap: 8px;
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
