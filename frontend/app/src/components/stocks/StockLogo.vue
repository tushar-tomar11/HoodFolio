<script setup lang="ts">
import { stockLogo } from '@/chain/stock-logos';

const {
  symbol,
  name = '',
  size = 32,
} = defineProps<{
  symbol: string;
  name?: string;
  size?: number;
}>();

const failed = ref(false);
const meta = computed(() => stockLogo(symbol));

watch(() => symbol, () => {
  failed.value = false;
});

function onError(): void {
  failed.value = true;
}
</script>

<template>
  <div
    class="slo"
    :class="[
      `slo--${meta?.tile ?? 'light'}`,
      { 'slo--invert': Boolean(meta?.invertInDark) },
    ]"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :title="name || symbol"
  >
    <img
      v-if="meta && !failed"
      :src="meta.src"
      :alt="name || symbol"
      @error="onError()"
    />
    <span v-else>{{ symbol.slice(0, 1) }}</span>
  </div>
</template>

<style scoped>
.slo {
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
  background: var(--hf-green-bg);
}

.slo--dark {
  background: #101114;
}

.slo--light {
  background: #ffffff;
  border: 1px solid var(--hf-border);
}

.slo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

:global(html[data-theme="dark"]) .slo--invert {
  background: #101114;
  border-color: transparent;
}

:global(html[data-theme="dark"]) .slo--invert img {
  filter: invert(1);
}

:global(html[data-theme="dark"]) .slo--light:not(.slo--invert) {
  background: var(--hf-surface-2);
}
</style>
