<script setup lang="ts">
import type { StockHolding } from '@/chain/portfolio-types';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';
import StockRow from '@/components/portfolio/StockRow.vue';
import { formatUSD } from '@/utils/formatting';

defineProps<{
  holdings: StockHolding[];
}>();
</script>

<template>
  <section class="sh">
    <div class="sh__head">
      <h2 class="sh__title">
        Stock holdings
      </h2>
      <p class="sh__hint">
        {{ holdings.some(row => Number.isFinite(row.premium)) ? 'Premium / discount vs delayed traditional quote' : 'On-chain prices from DexPaprika' }}
      </p>
    </div>
    <div
      v-if="holdings.length > 0"
      class="sh__table card sh__desktop"
      data-testid="stock-holdings-table"
    >
      <div class="sh__cols">
        <span>Symbol</span>
        <span class="col-right">Shares</span>
        <span class="col-right">On-chain</span>
        <span class="col-right">Value</span>
        <span class="col-right">Vs market</span>
      </div>
      <StockRow
        v-for="row in holdings"
        :key="row.symbol"
        :holding="row"
      />
    </div>
    <div class="sh__mobile">
      <article
        v-for="row in holdings"
        :key="`m-${row.symbol}`"
        class="card sh-card"
      >
        <div class="sh-card__top">
          <div>
            <p class="sh-card__sym">
              {{ row.symbol }}
            </p>
            <p class="sh-card__name">
              {{ row.name }}
            </p>
          </div>
          <HfPremiumBadge
            v-if="Number.isFinite(row.premium)"
            :premium="row.premium"
          />
          <span v-else>—</span>
        </div>
        <p class="sh-card__val num">
          {{ row.currentValueUSD === null ? 'Price unavailable' : formatUSD(row.currentValueUSD) }}
        </p>
        <p class="sh-card__meta num">
          {{ row.shares }} shares · {{ row.onChainPrice === null ? '—' : formatUSD(row.onChainPrice) }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.sh {
  margin-bottom: 32px;
}

.sh__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.sh__title {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hf-ink-2);
}

.sh__hint {
  font-size: 12px;
  color: var(--hf-ink-4);
}

.sh__table {
  overflow-x: auto;
}

.sh__cols {
  display: grid;
  grid-template-columns: minmax(160px, 1.5fr) 1fr 0.9fr 1fr minmax(150px, auto);
  gap: 12px;
  padding: 10px 12px;
  min-width: 780px;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hf-ink-3);
  border-bottom: 1px solid var(--hf-border);
}

.col-right {
  text-align: right;
}

.sh__mobile {
  display: grid;
  gap: 10px;
}

.sh__desktop {
  display: none;
}

.sh-card {
  padding: 14px;
}

.sh-card__top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.sh-card__sym {
  font-family: var(--font-ui);
  font-weight: 700;
}

.sh-card__name {
  font-size: 12px;
  color: var(--hf-ink-3);
}

.sh-card__val {
  font-size: 20px;
  font-weight: 700;
}

.sh-card__meta {
  font-size: 12px;
  color: var(--hf-ink-3);
  margin: 4px 0;
}

.sh-card__chg {
  font-weight: 700;
}

@media (min-width: 768px) {
  .sh__desktop {
    display: block;
  }

  .sh__mobile {
    display: none;
  }
}
</style>
