<script setup lang="ts">
import { formatPremium } from '@/utils/formatting';

const { premium } = defineProps<{
  premium: number;
}>();

const formatted = computed(() => formatPremium(premium));

const tooltip = computed(() => {
  const n = Math.abs(premium).toFixed(2);
  if (formatted.value.type === 'premium') {
    return `This stock costs more on Robinhood Chain than on NYSE/NASDAQ. You're paying ${n}% extra vs traditional market price.`;
  }
  if (formatted.value.type === 'discount') {
    return `This stock costs less on Robinhood Chain than on NYSE/NASDAQ. You're getting a ${n}% deal vs traditional market price.`;
  }
  return 'This stock is trading in line with its NYSE/NASDAQ price.';
});
</script>

<template>
  <span
    class="hf-premium"
    :class="`badge-${formatted.type}`"
    :title="tooltip"
    data-testid="premium-badge"
  >
    {{ formatted.text }}
  </span>
</template>

<style scoped>
.hf-premium {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 3px 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.3;
  white-space: nowrap;
  cursor: help;
}
</style>
