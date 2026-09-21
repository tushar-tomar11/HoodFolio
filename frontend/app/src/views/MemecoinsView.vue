<script setup lang="ts">
import { ROBINHOOD_EXPLORER, symbolForAddress } from '@/chain/robinhood-chain';
import HfStatusCard from '@/components/hf/HfStatusCard.vue';
import { useChainAnalytics } from '@/composables/use-chain-analytics';
import { usePageMeta } from '@/composables/use-page-meta';
import { formatUSDCompact } from '@/utils/formatting';

usePageMeta(
  'Meme Coin Leaderboard | HoodFolio',
  'Top Uniswap pools on Robinhood Chain by 24h volume from DexPaprika.',
);

const { topPools, isLoading, error, refresh } = useChainAnalytics();

function pairLabel(pool: { tokens?: readonly { id?: string; symbol?: string }[] }): string {
  const tokens = pool.tokens ?? [];
  return `${symbolForAddress(tokens[0]?.id ?? '')}/${symbolForAddress(tokens[1]?.id ?? '')}`;
}
</script>

<template>
  <div class="mc">
    <header class="mc-head">
      <h1 class="mc-h">
        Top pools on Robinhood Chain
      </h1>
      <p class="mc-sub">
        Real DexPaprika pool volume. Individual meme-token holdings need an indexer.
      </p>
    </header>

    <HfStatusCard
      v-if="error"
      title="Couldn't load pools"
      :body="error"
      action-label="Retry"
      @action="refresh()"
    />
    <p
      v-else-if="isLoading"
      class="mc-sub"
    >
      Loading DexPaprika pools…
    </p>

    <div class="card mc-table">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Pair</th>
            <th class="col-right">
              24h Volume
            </th>
            <th class="col-right">
              Liquidity
            </th>
            <th>DEX</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pool, index) in topPools"
            :key="pool.id"
          >
            <td class="num">
              {{ index + 1 }}
            </td>
            <td>
              <a
                :href="`${ROBINHOOD_EXPLORER}/address/${pool.id}`"
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
            <td>{{ pool.dex_name ?? pool.dex_id }}</td>
          </tr>
        </tbody>
      </table>
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

.mc-table { padding: 8px 12px; overflow-x: auto; }
</style>
