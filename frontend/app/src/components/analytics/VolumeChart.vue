<script setup lang="ts">
import { symbolForAddress } from '@/chain/robinhood-chain';
import { formatUSDCompact } from '@/utils/formatting';

const { pools } = defineProps<{
  pools: readonly {
    id: string;
    volume_usd_24h?: number;
    tokens?: readonly { id?: string; symbol?: string }[];
  }[];
}>();

const maxVolume = computed(() =>
  Math.max(1, ...pools.map(pool => pool.volume_usd_24h ?? 0)),
);

function pairLabel(pool: { tokens?: readonly { id?: string; symbol?: string }[] }): string {
  const tokens = pool.tokens ?? [];
  const a = tokens[0]?.symbol ?? symbolForAddress(tokens[0]?.id ?? '');
  const b = tokens[1]?.symbol ?? symbolForAddress(tokens[1]?.id ?? '');
  return `${a}/${b}`;
}

function barWidth(volume: number): string {
  return `${Math.max(4, (volume / maxVolume.value) * 100)}%`;
}
</script>

<template>
  <div class="vc">
    <div
      v-for="pool in pools"
      :key="pool.id"
      class="vc-row"
    >
      <span class="vc-pair">{{ pairLabel(pool) }}</span>
      <div class="vc-track">
        <div
          class="vc-fill"
          :style="{ width: barWidth(pool.volume_usd_24h ?? 0) }"
        />
      </div>
      <span class="vc-vol num">{{ formatUSDCompact(pool.volume_usd_24h ?? 0) }}</span>
    </div>
  </div>
</template>

<style scoped>
.vc-row {
  display: grid;
  grid-template-columns: minmax(72px, 120px) 1fr 72px;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.vc-pair {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vc-track {
  height: 12px;
  border-radius: 9999px;
  background: var(--hf-surface-2);
  overflow: hidden;
}

.vc-fill {
  height: 100%;
  background: var(--hf-green);
  border-radius: 9999px;
}

.vc-vol {
  font-size: 12px;
  text-align: right;
  color: var(--hf-ink-3);
}
</style>
