<script setup lang="ts">
import { MOCK_CHAIN_STATS } from '@/chain/mock-chain-stats';
import HfCard from '@/components/hf/HfCard.vue';
import MemeTable from '@/components/memecoins/MemeTable.vue';
import { MEME_FILTERS, useMemeMarkets } from '@/composables/use-meme-markets';
import { usePageMeta } from '@/composables/use-page-meta';
import { formatPercent, formatUSDCompact, timeAgo } from '@/utils/formatting';

usePageMeta(
  'Meme Coin Leaderboard | HoodFolio',
  'Top meme coins on Robinhood Chain by market cap, volume, and 24h change.',
);

const {
  filter,
  rows,
  setFilter,
  setSort,
  sortDir,
  sortKey,
} = useMemeMarkets();

const podium = MOCK_CHAIN_STATS.topMemeCoins.slice(0, 3);
const launches = MOCK_CHAIN_STATS.recentLaunches;

function changeUp(pct: number): boolean {
  return pct >= 0;
}
</script>

<template>
  <div class="mc">
    <header class="mc-head">
      <h1 class="mc-h">
        Meme Coins on Robinhood Chain
      </h1>
      <p class="mc-sub">
        The degen side of the world's first stock-token L2.
      </p>
    </header>

    <section
      class="mc-podium"
      aria-label="Top 3"
    >
      <HfCard
        v-for="(coin, index) in podium"
        :key="coin.symbol"
        class="mc-podium__card"
        :class="{ 'mc-podium__card--gold': index === 0 }"
        hover
      >
        <p
          v-if="index === 0"
          class="mc-crown"
        >
          👑 #1
        </p>
        <p
          v-else
          class="mc-place"
        >
          #{{ coin.rank }}
        </p>
        <p class="mc-podium__sym">
          {{ coin.symbol }}
        </p>
        <p class="mc-podium__name">
          {{ coin.name }}
        </p>
        <p class="mc-podium__cap num">
          {{ formatUSDCompact(coin.marketCapUSD) }}
        </p>
        <p class="mc-podium__vol">
          Vol {{ formatUSDCompact(coin.volume24hUSD) }}
        </p>
        <p
          class="mc-podium__chg num"
          :class="changeUp(coin.change24hPct) ? 'price-up' : 'price-down'"
        >
          {{ changeUp(coin.change24hPct) ? '▲' : '▼' }}{{ formatPercent(Math.abs(coin.change24hPct), false) }}
        </p>
      </HfCard>
    </section>

    <div class="mc-body">
      <div class="mc-main">
        <div
          class="mc-tabs"
          role="group"
          aria-label="Meme filters"
        >
          <button
            v-for="item in MEME_FILTERS"
            :key="item.id"
            type="button"
            class="mc-chip"
            :class="{ 'mc-chip--on': filter === item.id }"
            @click="setFilter(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="card">
          <MemeTable
            :rows="rows"
            :sort-key="sortKey"
            :sort-dir="sortDir"
            @sort="setSort($event)"
          />
        </div>
      </div>

      <aside class="mc-side">
        <h2 class="mc-side__h">
          Newly launched
        </h2>
        <ul class="mc-side__list">
          <li
            v-for="item in launches"
            :key="item.symbol"
            class="mc-side__item"
          >
            <p class="mc-side__sym">
              {{ item.symbol }}
            </p>
            <p class="mc-side__meta">
              {{ timeAgo(item.launchedAt) }} · {{ formatUSDCompact(item.marketCapUSD) }} after {{ item.hoursLive }}h
            </p>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.mc {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.mc-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.mc-sub {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
}

.mc-podium {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 28px;
  align-items: stretch;
}

.mc-podium__card--gold {
  border: 2px solid #d4a017;
  transform: scale(1.02);
}

.mc-crown,
.mc-place {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
}

.mc-podium__sym {
  font-family: var(--font-ui);
  font-size: 22px;
  font-weight: 700;
}

.mc-podium__name {
  color: var(--hf-ink-3);
  margin-bottom: 10px;
}

.mc-podium__cap {
  font-size: 26px;
  font-weight: 700;
}

.mc-podium__vol {
  font-size: 13px;
  color: var(--hf-ink-3);
  margin: 4px 0 8px;
}

.mc-podium__chg {
  font-size: 28px;
  font-weight: 700;
}

.mc-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.mc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.mc-chip {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--hf-ink-3);
  cursor: pointer;
}

.mc-chip--on {
  color: var(--hf-green);
  background: var(--hf-green-bg);
  border-color: transparent;
  font-weight: 600;
}

.mc-side {
  display: none;
}

.mc-side__h {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hf-ink-2);
  margin-bottom: 12px;
}

.mc-side__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mc-side__item {
  padding: 12px 0;
  border-bottom: 1px solid var(--hf-surface-2);
}

.mc-side__sym {
  font-weight: 700;
  font-family: var(--font-ui);
}

.mc-side__meta {
  font-size: 12px;
  color: var(--hf-ink-3);
  margin-top: 4px;
}

@media (min-width: 800px) {
  .mc-podium {
    grid-template-columns: 1.15fr 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .mc-body {
    grid-template-columns: minmax(0, 1fr) 260px;
  }

  .mc-side {
    display: block;
  }
}
</style>
