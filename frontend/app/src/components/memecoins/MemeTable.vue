<script setup lang="ts">
import type { MemeCoinRow } from '@/chain/mock-chain-stats';
import type { MemeSortKey } from '@/composables/use-meme-markets';
import { uniswapTokenUrl } from '@/chain/stock-markets';
import { formatPercent, formatUSDCompact } from '@/utils/formatting';

const {
  rows,
  sortKey,
  sortDir,
} = defineProps<{
  rows: MemeCoinRow[];
  sortKey: MemeSortKey;
  sortDir: 'asc' | 'desc';
}>();

const emit = defineEmits<{
  sort: [key: MemeSortKey];
}>();

function onSort(key: MemeSortKey): void {
  emit('sort', key);
}

function ariaSort(key: MemeSortKey): 'ascending' | 'descending' | 'none' {
  if (sortKey !== key)
    return 'none';
  return sortDir === 'asc' ? 'ascending' : 'descending';
}

function changeUp(pct: number): boolean {
  return pct >= 0;
}
</script>

<template>
  <div class="mt-wrap">
    <table class="data-table mt">
      <thead>
        <tr>
          <th :aria-sort="ariaSort('rank')">
            <button
              type="button"
              class="mt-sort"
              @click="onSort('rank')"
            >
              Rank
            </button>
          </th>
          <th
            class="mt-token"
            :aria-sort="ariaSort('symbol')"
          >
            <button
              type="button"
              class="mt-sort"
              @click="onSort('symbol')"
            >
              Token
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('marketCapUSD')"
          >
            <button
              type="button"
              class="mt-sort"
              @click="onSort('marketCapUSD')"
            >
              Market Cap
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('volume24hUSD')"
          >
            <button
              type="button"
              class="mt-sort"
              @click="onSort('volume24hUSD')"
            >
              24h Volume
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('change24hPct')"
          >
            <button
              type="button"
              class="mt-sort"
              @click="onSort('change24hPct')"
            >
              24h Change
            </button>
          </th>
          <th
            class="col-right"
            :aria-sort="ariaSort('holders')"
          >
            <button
              type="button"
              class="mt-sort"
              @click="onSort('holders')"
            >
              Holders
            </button>
          </th>
          <th class="col-right">
            Trade
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.symbol"
          class="mt-row"
          :class="{ 'mt-row--top': row.rank === 1 }"
        >
          <td class="num mt-rank">
            #{{ row.rank }}
          </td>
          <td>
            <p class="mt-sym">
              {{ row.symbol }}
            </p>
            <p class="mt-name">
              {{ row.name }}
            </p>
          </td>
          <td class="col-right num">
            {{ formatUSDCompact(row.marketCapUSD) }}
          </td>
          <td class="col-right num">
            {{ formatUSDCompact(row.volume24hUSD) }}
          </td>
          <td
            class="col-right num mt-chg"
            :class="changeUp(row.change24hPct) ? 'price-up' : 'price-down'"
          >
            {{ changeUp(row.change24hPct) ? '▲' : '▼' }}{{ formatPercent(Math.abs(row.change24hPct), false) }}
          </td>
          <td class="col-right num">
            {{ row.holders.toLocaleString('en-US') }}
          </td>
          <td class="col-right">
            <a
              class="mt-trade"
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
.mt-wrap {
  overflow-x: auto;
}

.mt {
  width: 100%;
}

.mt th,
.mt td {
  padding: 12px 10px;
  vertical-align: middle;
}

.mt-sort {
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.mt-token {
  text-align: left;
}

.mt-row:hover {
  background: var(--hf-surface-2);
}

.mt-row--top {
  box-shadow: inset 3px 0 0 #d4a017;
}

.mt-rank {
  color: var(--hf-ink-4);
  font-size: 13px;
}

.mt-sym {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 14px;
}

.mt-name {
  font-size: 12px;
  color: var(--hf-ink-3);
}

.mt-chg {
  font-size: 18px;
  font-weight: 700;
}

.mt-trade {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 13px;
  color: var(--hf-green);
  text-decoration: none;
}
</style>
