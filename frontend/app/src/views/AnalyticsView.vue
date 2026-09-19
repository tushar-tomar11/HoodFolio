<script setup lang="ts">
import { MOCK_CHAIN_STATS } from '@/chain/mock-chain-stats';
import { getStockMarketRows } from '@/chain/stock-markets';
import TopWalletsTable from '@/components/analytics/TopWalletsTable.vue';
import VolumeChart from '@/components/analytics/VolumeChart.vue';
import HfCard from '@/components/hf/HfCard.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { formatPercent, formatUSDCompact } from '@/utils/formatting';

usePageMeta(
  'Chain Analytics | HoodFolio',
  'Live Robinhood Chain TVL, volume, wallets, and stock token popularity.',
);

const stats = MOCK_CHAIN_STATS;
const memes = stats.topMemeCoins;
const wallets = stats.topWallets;

const popularity = [...getStockMarketRows()]
  .sort((left, right) => right.volume24hUSD - left.volume24hUSD);

const maxVolume = popularity[0]?.volume24hUSD ?? 1;

function barWidth(volume: number): string {
  return `${Math.max(6, (volume / maxVolume) * 100)}%`;
}

function changeUp(pct: number): boolean {
  return pct >= 0;
}
</script>

<template>
  <div class="an">
    <header class="an-head">
      <h1 class="an-h">
        Robinhood Chain Analytics
      </h1>
      <p class="an-sub">
        Live stats for the world's first stock-token Layer 2.
      </p>
    </header>

    <section
      class="an-stats"
      aria-label="Chain stats"
    >
      <HfCard>
        <p class="an-stats__l">
          Total TVL
        </p>
        <p class="an-stats__v num">
          {{ formatUSDCompact(stats.tvlUSD) }}
        </p>
        <p class="an-stats__chg num price-up">
          ▲{{ formatPercent(stats.tvlChangePct, false) }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          24h Volume
        </p>
        <p class="an-stats__v num">
          {{ formatUSDCompact(stats.volume24hUSD) }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          Active Wallets Today
        </p>
        <p class="an-stats__v num">
          {{ stats.activeWallets.toLocaleString('en-US') }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          Total Transactions
        </p>
        <p class="an-stats__v num">
          {{ stats.tx24h.toLocaleString('en-US') }}
        </p>
        <p class="an-stats__hint">
          24h
        </p>
      </HfCard>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Daily volume
      </h2>
      <div class="card an-chart">
        <VolumeChart :points="stats.dailyVolume" />
      </div>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Top meme coins
      </h2>
      <div class="card an-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Token</th>
              <th class="col-right">
                Market Cap
              </th>
              <th class="col-right">
                24h
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in memes"
              :key="row.symbol"
              :class="{ 'an-gold': row.rank === 1 }"
            >
              <td class="num">
                {{ row.rank }}
              </td>
              <td>
                <strong>{{ row.symbol }}</strong>
                <span class="an-muted"> {{ row.name }}</span>
              </td>
              <td class="col-right num">
                {{ formatUSDCompact(row.marketCapUSD) }}
              </td>
              <td
                class="col-right num"
                :class="changeUp(row.change24hPct) ? 'price-up' : 'price-down'"
              >
                {{ formatPercent(row.change24hPct) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Top wallets
      </h2>
      <div class="card an-table-wrap">
        <TopWalletsTable :wallets="wallets" />
      </div>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Stock token popularity
      </h2>
      <div class="card an-bars">
        <div
          v-for="row in popularity"
          :key="row.symbol"
          class="an-bar"
        >
          <span class="an-bar__sym">{{ row.symbol }}</span>
          <div class="an-bar__track">
            <div
              class="an-bar__fill"
              :style="{ width: barWidth(row.volume24hUSD) }"
            />
          </div>
          <span class="an-bar__vol num">{{ formatUSDCompact(row.volume24hUSD) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.an {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.an-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.an-sub {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
}

.an-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 36px;
}

.an-stats__l {
  font-size: 12px;
  color: var(--hf-ink-3);
  margin-bottom: 6px;
}

.an-stats__v {
  font-size: 28px;
  font-weight: 700;
}

.an-stats__chg {
  font-size: 13px;
  font-weight: 600;
  margin-top: 4px;
}

.an-stats__hint {
  font-size: 12px;
  color: var(--hf-ink-4);
  margin-top: 4px;
}

.an-block {
  margin-bottom: 36px;
}

.an-sec {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.an-chart,
.an-table-wrap,
.an-bars {
  padding: 12px 16px;
}

.an-gold {
  box-shadow: inset 3px 0 0 #d4a017;
}

.an-muted {
  color: var(--hf-ink-3);
  font-weight: 400;
}

.an-bar {
  display: grid;
  grid-template-columns: 56px 1fr 72px;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.an-bar__sym {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 13px;
}

.an-bar__track {
  height: 10px;
  border-radius: 9999px;
  background: var(--hf-surface-2);
  overflow: hidden;
}

.an-bar__fill {
  height: 100%;
  background: var(--hf-green);
  border-radius: 9999px;
}

.an-bar__vol {
  font-size: 12px;
  text-align: right;
  color: var(--hf-ink-3);
}

@media (min-width: 900px) {
  .an-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
