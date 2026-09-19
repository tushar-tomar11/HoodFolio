<script setup lang="ts">
import { type MarketSortKey, type StockMarketRow, uniswapTokenUrl } from '@/chain/stock-markets';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';
import StockTokenCell from '@/components/stocks/StockTokenCell.vue';
import { formatPercent, formatUSD } from '@/utils/formatting';

const {
  rows,
  sortKey,
  sortDir,
  compact = false,
} = defineProps<{
  rows: StockMarketRow[];
  sortKey?: MarketSortKey;
  sortDir?: 'asc' | 'desc';
  compact?: boolean;
}>();

const emit = defineEmits<{
  sort: [key: MarketSortKey];
}>();

function onSort(key: MarketSortKey): void {
  if (compact)
    return;
  emit('sort', key);
}

function ariaSort(key: MarketSortKey): 'ascending' | 'descending' | 'none' {
  if (sortKey !== key)
    return 'none';
  return sortDir === 'asc' ? 'ascending' : 'descending';
}

function changeUp(pct: number): boolean {
  return pct >= 0;
}
</script>

<template>
  <div class="st-wrap">
    <table class="data-table st">
      <thead>
        <tr>
          <th
            v-if="!compact"
            class="st-num"
          >
            #
          </th>
          <th
            class="st-token"
            :aria-sort="ariaSort('symbol')"
          >
            <button
              type="button"
              class="st-sort"
              @click="onSort('symbol')"
            >
              Token
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('onChainPrice')"
          >
            <button
              type="button"
              class="st-sort"
              @click="onSort('onChainPrice')"
            >
              On-Chain Price
            </button>
          </th>
          <th
            class="col-right st-market"
            :aria-sort="ariaSort('marketPrice')"
          >
            <button
              type="button"
              class="st-sort"
              @click="onSort('marketPrice')"
            >
              Market Price
            </button>
          </th>
          <th
            class="col-right st-prem-h"
            :aria-sort="ariaSort('premium')"
          >
            <button
              type="button"
              class="st-sort st-sort--prem"
              @click="onSort('premium')"
            >
              Premium / Discount
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('change24hPct')"
          >
            <button
              type="button"
              class="st-sort"
              @click="onSort('change24hPct')"
            >
              24h Change
            </button>
          </th>
          <th
            v-if="!compact"
            class="col-right"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="row.symbol"
          class="st-row"
        >
          <td
            v-if="!compact"
            class="st-num num"
          >
            {{ index + 1 }}
          </td>
          <td>
            <StockTokenCell
              :symbol="row.symbol"
              :name="row.name"
              :logo-domain="row.logoDomain"
            />
          </td>
          <td class="col-right mono num">
            {{ formatUSD(row.onChainPrice) }}
          </td>
          <td class="col-right mono num st-market">
            {{ formatUSD(row.marketPrice) }}
          </td>
          <td class="col-right">
            <HfPremiumBadge :premium="row.premium" />
          </td>
          <td
            class="col-right num st-chg"
            :class="changeUp(row.change24hPct) ? 'price-up' : 'price-down'"
          >
            {{ changeUp(row.change24hPct) ? '▲' : '▼' }}{{ formatPercent(Math.abs(row.change24hPct), false) }}
          </td>
          <td
            v-if="!compact"
            class="col-right"
          >
            <a
              class="st-trade"
              :href="uniswapTokenUrl(row.tokenAddress)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trade ↗
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.st-wrap {
  overflow-x: auto;
}

.st {
  width: 100%;
}

.st th,
.st td {
  padding: 12px 10px;
  vertical-align: middle;
}

.st-num {
  width: 36px;
  color: var(--hf-ink-4);
  font-size: 12px;
}

.st-token {
  text-align: left;
}

.st-sort {
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.st-prem-h {
  background: var(--hf-amber-bg);
  border-radius: 8px;
}

.st-sort--prem {
  color: var(--hf-amber-text);
  font-weight: 700;
}

.st-row {
  transition: background-color 150ms ease;
}

.st-row:hover {
  background: var(--hf-surface-2);
}

.st-chg {
  font-weight: 700;
  font-size: 13px;
}

.st-trade {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  color: var(--hf-ink-3);
  text-decoration: none;
  opacity: 0.65;
  transition: opacity 150ms ease, color 150ms ease;
}

.st-row:hover .st-trade {
  opacity: 1;
  color: var(--hf-green);
}

@media (max-width: 767px) {
  .st-market {
    display: none;
  }
}
</style>
