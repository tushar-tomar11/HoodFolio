<script setup lang="ts">
import { STOCK_TOKENS } from '@/chain/robinhood-chain';
import HfButton from '@/components/hf/HfButton.vue';
import HfSkeleton from '@/components/hf/HfSkeleton.vue';
import { usePriceStore } from '@/store/prices';
import { formatUSDCompact } from '@/utils/formatting';

const prices = usePriceStore();

const stockCount = Object.keys(STOCK_TOKENS).filter(symbol => symbol !== 'USDG').length;

const showValues = computed(() => prices.chainStatsFetched && !prices.chainStatsError);

const spark = '0,22 8,18 16,20 24,12 32,14 40,8 48,11 56,5 64,7';

const stats = computed(() => [
  { id: 'liq', label: 'Pool liquidity', value: formatUSDCompact(prices.chainTvl) },
  { id: 'vol', label: '24h Volume', value: formatUSDCompact(prices.chainVolume24h) },
  { id: 'tx', label: '24h Txns', value: prices.chainTxns24h.toLocaleString('en-US') },
  { id: 'stk', label: 'Stock tokens', value: String(stockCount) },
]);

function onRetry(): void {
  prices.refreshChainStats().catch(() => undefined);
}
</script>

<template>
  <section
    class="stats"
    aria-label="Chain stats"
  >
    <div
      v-if="prices.chainStatsError"
      class="stats__banner card"
    >
      <p class="stats__err">
        {{ prices.chainStatsError }}
      </p>
      <HfButton
        variant="secondary"
        size="sm"
        :loading="prices.isLoadingChainStats"
        @click="onRetry()"
      >
        Retry
      </HfButton>
    </div>
    <div
      v-for="(stat, index) in stats"
      :key="stat.id"
      class="card stats__box fade-up"
      :class="`fade-up-delay-${index + 1}`"
    >
      <span
        class="stats__icon"
        aria-hidden="true"
      >
        <svg
          v-if="stat.id === 'liq'"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 18h10a5 5 0 0 0 0-10 6 6 0 0 0-11.2 1.6A4.5 4.5 0 0 0 7 18z" />
        </svg>
        <svg
          v-else-if="stat.id === 'vol'"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 14h3v6H4v-6zm6.5-8h3v14h-3V6zM17 10h3v10h-3V10z" />
        </svg>
        <svg
          v-else-if="stat.id === 'tx'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M7 7h10M7 12h10M7 17h4" />
          <path d="m15 15 3 3 3-3" />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
        </svg>
      </span>
      <div class="stats__copy">
        <HfSkeleton
          v-if="prices.isLoadingChainStats && !prices.chainStatsFetched"
          height="28px"
          width="72px"
        />
        <p
          v-else-if="showValues || stat.id === 'stk'"
          class="stats__val num"
        >
          {{ stat.value }}
        </p>
        <p
          v-else
          class="stats__val num stats__val--wait"
        >
          —
        </p>
        <p class="stats__lab">
          {{ stat.label }}
        </p>
      </div>
      <svg
        class="stats__spark"
        viewBox="0 0 64 28"
        aria-hidden="true"
      >
        <polyline
          :points="spark"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stats__banner {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
}

.stats__err {
  color: var(--hf-red-text);
  font-size: 13px;
  margin: 0;
}

.stats__box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.stats__icon {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgb(0 200 5 / 0.14);
  color: var(--hf-green);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.stats__icon svg {
  width: 18px;
  height: 18px;
}

.stats__copy {
  min-width: 0;
  flex: 1;
}

.stats__val {
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 2px;
  line-height: 1.1;
}

.stats__val--wait { color: var(--hf-ink-4); }

.stats__lab {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--hf-ink-3);
}

.stats__spark {
  display: none;
  width: 72px;
  height: 28px;
  color: var(--hf-green);
  flex-shrink: 0;
  opacity: 0.9;
}

@media (min-width: 800px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

:global(html[data-theme="dark"]) .stats__icon {
  display: inline-flex;
}

:global(html[data-theme="dark"]) .stats__spark {
  display: block;
}
</style>
