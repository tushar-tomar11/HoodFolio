<script setup lang="ts">
import HfAddressChip from '@/components/hf/HfAddressChip.vue';
import { formatUSD, timeAgo } from '@/utils/formatting';

const {
  totalValueUsd,
  address,
  lastUpdated = null,
  stockCount = 0,
  usdgBalance = '0.00',
} = defineProps<{
  totalValueUsd: number;
  address: string;
  lastUpdated?: Date | null;
  stockCount?: number;
  usdgBalance?: string;
}>();
</script>

<template>
  <section
    class="ph"
    data-testid="portfolio-header"
  >
    <div class="ph__left">
      <p class="ph__label">
        Total Portfolio Value
      </p>
      <p class="ph__value num">
        {{ formatUSD(totalValueUsd) }}
      </p>
      <div class="ph__addr">
        <HfAddressChip :address="address" />
        <span
          v-if="lastUpdated"
          class="ph__ago"
        >
          Updated {{ timeAgo(lastUpdated) }}
        </span>
      </div>
    </div>
    <div class="ph__stats">
      <div class="ph__stat">
        <p class="ph__stat-l">
          Stocks
        </p>
        <p class="ph__stat-v num">
          {{ stockCount }} positions
        </p>
      </div>
      <div class="ph__stat">
        <p class="ph__stat-l">
          USDG
        </p>
        <p class="ph__stat-v num">
          {{ usdgBalance }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ph {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.ph__label {
  font-size: 12px;
  color: var(--hf-ink-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.ph__value {
  font-size: 42px;
  font-weight: 700;
  margin: 4px 0 8px;
}

.ph__addr {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.ph__ago {
  font-size: 12px;
  color: var(--hf-ink-4);
}

.ph__stats {
  display: flex;
  gap: 20px;
}

.ph__stat-l {
  font-size: 12px;
  color: var(--hf-ink-3);
}

.ph__stat-v {
  font-weight: 700;
  font-size: 18px;
}
</style>
