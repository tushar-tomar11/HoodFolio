<script setup lang="ts">
import { NETWORK_RECIPE } from '@/chain/home-content';
import { usePortfolioPage } from '@/composables/use-portfolio-page';
import { useWalletStore } from '@/store/wallet';
import { formatUSD } from '@/utils/formatting';

const wallet = useWalletStore();
const {
  error,
  hasFetched,
  isLoading,
  stockHoldings,
  totalValueUSD,
} = usePortfolioPage();
</script>

<template>
  <section
    class="snap card"
    aria-label="Connected wallet snapshot"
  >
    <h2 class="snap__h">
      Your wallet on chain {{ NETWORK_RECIPE.chainId }}
    </h2>
    <p
      v-if="isLoading || !hasFetched"
      class="snap__s"
    >
      Fetching balances from Robinhood Chain…
    </p>
    <template v-else-if="!error">
      <p class="snap__val num">
        {{ formatUSD(totalValueUSD) }}
      </p>
      <p class="snap__s">
        Stock tokens + USDG priced from DexPaprika. ETH {{ wallet.ethBalance }}.
        {{ stockHoldings.length }} stock holding{{ stockHoldings.length === 1 ? '' : 's' }}.
      </p>
      <p
        v-if="stockHoldings.length === 0"
        class="snap__s"
      >
        No stock tokens yet.
        <a
          :href="NETWORK_RECIPE.uniswap"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy on Uniswap ↗
        </a>
      </p>
      <RouterLink
        class="snap__cta"
        to="/portfolio"
      >
        Open full portfolio →
      </RouterLink>
    </template>
    <p
      v-else
      class="snap__err"
    >
      {{ error }}
    </p>
  </section>
</template>

<style scoped>
.snap {
  padding: 24px 20px;
  margin-bottom: 56px;
}

.snap__h {
  font-family: var(--font-ui);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.snap__val {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.snap__s {
  font-size: 14px;
  line-height: 1.5;
  color: var(--hf-ink-3);
  margin-bottom: 12px;
}

.snap__s a {
  color: var(--hf-green);
  font-weight: 600;
}

.snap__cta {
  font-family: var(--font-ui);
  font-weight: 600;
  color: var(--hf-green);
  text-decoration: none;
}

.snap__err {
  color: var(--hf-red-text);
  font-size: 14px;
}
</style>
