<script setup lang="ts">
import type { MemeHolding } from '@/chain/mock-portfolio';
import HfCard from '@/components/hf/HfCard.vue';
import { formatPercent, formatUSD } from '@/utils/formatting';

defineProps<{
  holdings: MemeHolding[];
}>();

function compactAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

function uniswapHref(address: string): string {
  return `https://app.uniswap.org/swap?outputCurrency=${address}&chain=robinhood`;
}
</script>

<template>
  <section class="mh">
    <h2 class="mh__title">
      Meme coins
    </h2>
    <div class="mh__grid">
      <HfCard
        v-for="row in holdings"
        :key="row.symbol"
        hover
      >
        <p class="mh__sym">
          {{ row.symbol }}
        </p>
        <p class="mh__name">
          {{ row.name }}
        </p>
        <p class="mh__bal num">
          {{ compactAmount(row.amount) }} {{ row.symbol }}
        </p>
        <p class="mh__val num">
          {{ formatUSD(row.valueUSD) }}
        </p>
        <p
          class="mh__chg num"
          :class="row.change24hPct >= 0 ? 'price-up' : 'price-down'"
        >
          {{ row.change24hPct >= 0 ? '▲' : '▼' }}{{ formatPercent(Math.abs(row.change24hPct), false) }}
        </p>
        <a
          class="mh__trade"
          :href="uniswapHref(row.tokenAddress)"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          Trade on Uniswap →
        </a>
      </HfCard>
    </div>
  </section>
</template>

<style scoped>
.mh {
  margin-bottom: 32px;
}

.mh__title {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hf-ink-2);
  margin-bottom: 12px;
}

.mh__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.mh__sym {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  color: var(--hf-ink);
}

.mh__name {
  font-size: 13px;
  color: var(--hf-ink-3);
  margin-bottom: 12px;
}

.mh__bal {
  font-size: 13px;
  color: var(--hf-ink-3);
  margin-bottom: 4px;
}

.mh__val {
  font-weight: 700;
  font-size: 20px;
  color: var(--hf-ink);
}

.mh__chg {
  font-weight: 700;
  font-size: 22px;
  margin: 8px 0 12px;
}

.mh__trade {
  font-size: 13px;
  color: var(--hf-green);
  text-decoration: none;
  font-family: var(--font-ui);
  font-weight: 600;
}

@media (min-width: 768px) {
  .mh__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
