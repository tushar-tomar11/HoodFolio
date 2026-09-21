<script setup lang="ts">
import { ROBINHOOD_EXPLORER, symbolForAddress } from '@/chain/robinhood-chain';
import VolumeChart from '@/components/analytics/VolumeChart.vue';
import HfCard from '@/components/hf/HfCard.vue';
import HfStatusCard from '@/components/hf/HfStatusCard.vue';
import { useChainAnalytics } from '@/composables/use-chain-analytics';
import { usePageMeta } from '@/composables/use-page-meta';
import { formatUSDCompact } from '@/utils/formatting';

usePageMeta(
  'Chain Analytics | HoodFolio',
  'Live Robinhood Chain TVL, volume, and Uniswap pools from DexPaprika.',
);

const {
  topPools,
  totalVolume24h,
  totalTvl,
  totalTxns24h,
  totalPools,
  isLoading,
  error,
  refresh,
} = useChainAnalytics();

function pairLabel(pool: { tokens?: readonly { id?: string; symbol?: string }[] }): string {
  const tokens = pool.tokens ?? [];
  const a = tokens[0]?.symbol ?? symbolForAddress(tokens[0]?.id ?? '');
  const b = tokens[1]?.symbol ?? symbolForAddress(tokens[1]?.id ?? '');
  return `${a}/${b}`;
}

function poolHref(id: string): string {
  return `${ROBINHOOD_EXPLORER}/address/${id}`;
}
</script>

<template>
  <div class="an">
    <header class="an-head">
      <h1 class="an-h">
        Robinhood Chain Analytics
      </h1>
      <p class="an-sub">
        Live DexPaprika stats for Uniswap on Robinhood Chain.
      </p>
    </header>

    <HfStatusCard
      v-if="error"
      title="Couldn't load analytics"
      :body="error"
      action-label="Retry"
      @action="refresh()"
    />

    <p
      v-if="isLoading"
      class="an-sub"
    >
      Loading DexPaprika…
    </p>

    <section
      class="an-stats"
      aria-label="Chain stats"
    >
      <HfCard>
        <p class="an-stats__l">
          Pool liquidity
        </p>
        <p class="an-stats__v num">
          {{ formatUSDCompact(totalTvl) }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          24h Volume
        </p>
        <p class="an-stats__v num">
          {{ formatUSDCompact(totalVolume24h) }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          24h Transactions
        </p>
        <p class="an-stats__v num">
          {{ totalTxns24h.toLocaleString('en-US') }}
        </p>
      </HfCard>
      <HfCard>
        <p class="an-stats__l">
          Pools
        </p>
        <p class="an-stats__v num">
          {{ totalPools.toLocaleString('en-US') }}
        </p>
      </HfCard>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Top pools by 24h volume
      </h2>
      <div class="card an-chart">
        <VolumeChart :pools="topPools.slice(0, 12)" />
      </div>
    </section>

    <section class="an-block">
      <h2 class="an-sec">
        Top pools
      </h2>
      <div class="card an-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Pool pair</th>
              <th class="col-right">
                24h Volume
              </th>
              <th class="col-right">
                Liquidity
              </th>
              <th class="col-right">
                Txns
              </th>
              <th>DEX</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pool in topPools.slice(0, 20)"
              :key="pool.id"
            >
              <td>
                <a
                  :href="poolHref(pool.id)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ pairLabel(pool) }}
                </a>
              </td>
              <td class="col-right num">
                {{ formatUSDCompact(pool.volume_usd_24h ?? 0) }}
              </td>
              <td class="col-right num">
                {{ formatUSDCompact(pool.liquidity_usd ?? 0) }}
              </td>
              <td class="col-right num">
                {{ (pool.transactions_24h ?? 0).toLocaleString('en-US') }}
              </td>
              <td>{{ pool.dex_name ?? pool.dex_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <p class="an-soon">
      Top wallets — coming soon (needs an indexer).
    </p>
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

.an-block { margin-bottom: 36px; }

.an-sec {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.an-chart,
.an-table-wrap { padding: 12px 16px; overflow-x: auto; }

.an-soon {
  color: var(--hf-ink-4);
  font-size: 13px;
}

@media (min-width: 900px) {
  .an-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
