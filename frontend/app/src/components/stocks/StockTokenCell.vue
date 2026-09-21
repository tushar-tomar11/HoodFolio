<script setup lang="ts">
import StockLogo from '@/components/stocks/StockLogo.vue';

const {
  symbol,
  name,
} = defineProps<{
  symbol: string;
  name: string;
}>();
</script>

<template>
  <div class="stc">
    <StockLogo
      :symbol="symbol"
      :name="name"
      :size="32"
    />
    <div>
      <p class="stc__sym">
        {{ symbol }}
      </p>
      <p class="stc__name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.stc {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.stc__sym {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  color: var(--hf-ink);
}

.stc__name {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 400;
  color: var(--hf-ink-3);
}
</style>
