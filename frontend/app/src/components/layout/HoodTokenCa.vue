<script setup lang="ts">
import { HOODFOLIO_TOKEN_ADDRESS } from '@/chain/robinhood-chain';
import HfAddressChip from '@/components/hf/HfAddressChip.vue';

const {
  compact = false,
} = defineProps<{
  compact?: boolean;
}>();
</script>

<template>
  <span
    class="hood-token-ca"
    :class="{ 'hood-token-ca--compact': compact }"
    :title="HOODFOLIO_TOKEN_ADDRESS"
  >
    <span class="hood-token-ca__label">CA</span>
    <HfAddressChip
      :address="HOODFOLIO_TOKEN_ADDRESS"
      :explorer="false"
    />
  </span>
</template>

<style scoped>
.hood-token-ca {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 9999px;
  background: var(--hf-green-bg);
  color: var(--hf-ink-2);
}

.hood-token-ca__label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--hf-green-text);
}

.hood-token-ca :deep(.hf-addr) {
  color: var(--hf-ink-2);
  font-size: 11px;
}

.hood-token-ca--compact {
  width: 100%;
  justify-content: flex-start;
  padding: 10px 12px;
  border-radius: 10px;
}
</style>
