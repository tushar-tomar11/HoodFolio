<script setup lang="ts">
import HfStatusCard from '@/components/hf/HfStatusCard.vue';
import StockTable from '@/components/stocks/StockTable.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { SECTOR_FILTERS, SORT_OPTIONS, useStockMarkets } from '@/composables/use-stock-markets';

usePageMeta(
  'Stock Token Markets | HoodFolio',
  'Compare on-chain Robinhood Chain stock token prices vs NYSE and NASDAQ.',
);

const {
  rows,
  searchInput,
  sector,
  setDropdownSort,
  setSearch,
  clearSearch,
  setSector,
  setSort,
  sortDir,
  sortKey,
} = useStockMarkets();

function onDropdown(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement))
    return;
  const option = SORT_OPTIONS.find(item => item.id === target.value);
  if (option)
    setDropdownSort(option.id);
}

function onSearch(event: Event): void {
  const target = event.target;
  if (target instanceof HTMLInputElement)
    setSearch(target.value);
}
</script>

<template>
  <div class="sv">
    <header class="sv-head">
      <h1 class="sv-h">
        Stock Token Markets
      </h1>
      <p class="sv-sub">
        All tokenized equities trading 24/7 on Robinhood Chain
      </p>
      <p class="sv-note">
        Prices from Uniswap V4 pools. Market prices from Chainlink Data Feeds (mock).
      </p>
    </header>

    <div class="sv-ctrl">
      <input
        class="sv-search"
        type="search"
        placeholder="Search NVDA, Tesla, Apple..."
        aria-label="Search stock tokens"
        :value="searchInput"
        @input="onSearch($event)"
      />
      <div
        class="sv-sectors"
        role="group"
        aria-label="Sector"
      >
        <button
          v-for="item in SECTOR_FILTERS"
          :key="item.id"
          type="button"
          class="sv-chip"
          :class="{ 'sv-chip--on': sector === item.id }"
          @click="setSector(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
      <label class="sv-sort">
        <span class="sv-sort-l">Sort</span>
        <select
          class="sv-select"
          :value="sortKey"
          @change="onDropdown($event)"
        >
          <option
            v-for="opt in SORT_OPTIONS"
            :key="opt.id"
            :value="opt.id"
          >
            {{ opt.label }}
          </option>
        </select>
      </label>
    </div>

    <div
      v-if="rows.length === 0"
      class="sv-empty"
    >
      <HfStatusCard
        :title="`No tokens match '${searchInput}'`"
        body="Try another symbol or company name."
        action-label="Clear search"
        @action="clearSearch()"
      />
    </div>
    <div
      v-else
      class="card sv-table"
    >
      <StockTable
        :rows="rows"
        :sort-key="sortKey"
        :sort-dir="sortDir"
        @sort="setSort($event)"
      />
    </div>

    <div class="card sv-help">
      <p class="sv-help-h">
        💡 What is Premium/Discount?
      </p>
      <p class="sv-help-p">
        When you buy a stock token on Robinhood Chain, you pay the on-chain price —
        not the NYSE price. If on-chain is $142.18 but NYSE is $142.50, you're getting
        a 0.23% discount. The chain's price may differ due to liquidity, market hours,
        and arbitrage lag.
      </p>
    </div>
  </div>
</template>

<style scoped>
.sv {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.sv-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  color: var(--hf-ink);
  margin-bottom: 8px;
}

.sv-sub {
  font-size: 16px;
  color: var(--hf-ink-2);
  margin-bottom: 6px;
}

.sv-note {
  font-size: 12px;
  color: var(--hf-ink-4);
  margin-bottom: 24px;
}

.sv-ctrl {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.sv-search {
  flex: 1 1 220px;
  min-width: 180px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--hf-ink);
}

.sv-sectors {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sv-chip {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  color: var(--hf-ink-3);
  cursor: pointer;
}

.sv-chip--on {
  color: var(--hf-green);
  background: var(--hf-green-bg);
  border-color: transparent;
  font-weight: 600;
}

.sv-sort {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.sv-sort-l {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hf-ink-3);
}

.sv-select {
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--hf-ink);
}

.sv-table {
  padding: 4px 8px;
  margin-bottom: 20px;
}

.sv-help {
  padding: 18px 20px;
}

.sv-help-h {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
}

.sv-help-p {
  font-size: 14px;
  line-height: 1.55;
  color: var(--hf-ink-3);
}
</style>
