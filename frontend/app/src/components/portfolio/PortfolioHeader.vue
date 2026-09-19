<script setup lang="ts">
import HfAddressChip from '@/components/hf/HfAddressChip.vue';
import { formatPercent, formatUSD, timeAgo } from '@/utils/formatting';

const {
  totalValueUsd,
  change24hUsd,
  change24hPct,
  address,
  lastUpdated,
  stockCount = 0,
  usdgYieldUsd = 0,
  memeCount = 0,
} = defineProps<{
  totalValueUsd: number;
  change24hUsd: number;
  change24hPct: number;
  address: string;
  lastUpdated: Date;
  stockCount?: number;
  usdgYieldUsd?: number;
  memeCount?: number;
}>();

const up = computed(() => change24hUsd >= 0);

const changeLine = computed(() => {
  const sign = up.value ? '+' : '−';
  return `${sign}${formatUSD(Math.abs(change24hUsd))} (${formatPercent(change24hPct)} today)`;
});
</script>

<template>
  <section class="ph">
    <div class="ph__left">
      <p class="ph__label">
        Total Portfolio Value
      </p>
      <p class="ph__value num">
        {{ formatUSD(totalValueUsd) }}
      </p>
      <p
        class="ph__chg num"
        :class="up ? 'price-up' : 'price-down'"
      >
        {{ changeLine }}
      </p>
      <div class="ph__addr">
        <HfAddressChip
          :address="address"
        />
        <span class="ph__ago">Updated {{ timeAgo(lastUpdated) }}</span>
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
          USDG Yield
        </p>
        <p class="ph__stat-v num price-up">
          +{{ formatUSD(usdgYieldUsd) }}
        </p>
      </div>
      <div class="ph__stat">
        <p class="ph__stat-l">
          Meme Coins
        </p>
        <p class="ph__stat-v num">
          {{ memeCount }}
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
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hf-ink-3);
  margin-bottom: 8px;
}

.ph__value {
  font-weight: 700;
  font-size: 42px;
  line-height: 1.1;
  color: var(--hf-ink);
  font-variant-numeric: tabular-nums;
}

.ph__chg {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
}

.ph__addr {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.ph__ago {
  font-size: 12px;
  color: var(--hf-ink-4);
}

.ph__stats {
  display: none;
  gap: 12px;
  align-self: flex-start;
}

.ph__stat {
  min-width: 140px;
  padding: 12px 14px;
  background: var(--hf-surface);
  border: 1px solid var(--hf-border);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
}

.ph__stat-l {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hf-ink-3);
  margin-bottom: 6px;
}

.ph__stat-v {
  font-weight: 600;
  font-size: 15px;
  color: var(--hf-ink);
}

@media (min-width: 900px) {
  .ph__stats {
    display: flex;
  }
}
</style>
