<script setup lang="ts">
import { HOME_FEATURES, HOME_STEPS, STOCK_TOKEN_COUNT } from '@/chain/home-content';
import {
  MORPHO_HOME,
  ROBINHOOD_CHAIN_ID,
  ROBINHOOD_EXPLORER,
  ROBINHOOD_RPC,
  UNISWAP_HOME,
} from '@/chain/robinhood-chain';
import HfCard from '@/components/hf/HfCard.vue';
import { usePageMeta } from '@/composables/use-page-meta';

usePageMeta(
  'Documentation | HoodFolio',
  'How HoodFolio reads Robinhood Chain 4663: wallets, stock tokens, premium/discount, and USDG.',
);

const facts = [
  { label: 'Chain ID', value: String(ROBINHOOD_CHAIN_ID) },
  { label: 'RPC', value: ROBINHOOD_RPC },
  { label: 'Explorer', value: ROBINHOOD_EXPLORER },
  { label: 'Stock tokens', value: String(STOCK_TOKEN_COUNT) },
];
</script>

<template>
  <div class="dv">
    <header class="dv-head">
      <h1 class="dv-h">
        Documentation
      </h1>
      <p class="dv-sub">
        HoodFolio is a read-only portfolio for Robinhood Chain. It never
        custodies assets. Prices come from DexPaprika. Balances come from
        viem multicall. USDG uses 6 decimals.
      </p>
    </header>

    <section class="dv-sec">
      <h2 class="dv-h2">
        Quick start
      </h2>
      <ol class="dv-steps">
        <li
          v-for="step in HOME_STEPS"
          :key="step.n"
        >
          <span class="dv-n">{{ step.n }}</span>
          <div>
            <p class="dv-step-t">
              {{ step.title }}
            </p>
            <p class="dv-step-b">
              {{ step.body }}
            </p>
          </div>
        </li>
      </ol>
    </section>

    <section class="dv-sec">
      <h2 class="dv-h2">
        Network
      </h2>
      <HfCard padding="md">
        <dl class="dv-facts">
          <template
            v-for="fact in facts"
            :key="fact.label"
          >
            <dt>{{ fact.label }}</dt>
            <dd class="num">
              {{ fact.value }}
            </dd>
          </template>
        </dl>
      </HfCard>
    </section>

    <section class="dv-sec">
      <h2 class="dv-h2">
        Product guides
      </h2>
      <div class="dv-grid">
        <HfCard
          v-for="feature in HOME_FEATURES"
          :key="feature.to"
          padding="md"
          hover
        >
          <h3 class="dv-card-t">
            {{ feature.title }}
          </h3>
          <p class="dv-card-b">
            {{ feature.body }}
          </p>
          <RouterLink
            class="dv-cta"
            :to="feature.to"
          >
            {{ feature.cta }} →
          </RouterLink>
        </HfCard>
      </div>
    </section>

    <section class="dv-sec">
      <h2 class="dv-h2">
        Trade and yield (external)
      </h2>
      <p class="dv-sub">
        HoodFolio does not submit swaps. These links leave the app.
      </p>
      <p>
        <a
          class="dv-ext"
          :href="UNISWAP_HOME"
          target="_blank"
          rel="noopener noreferrer"
        >Uniswap on chain 4663 ↗</a>
        <a
          class="dv-ext"
          :href="MORPHO_HOME"
          target="_blank"
          rel="noopener noreferrer"
        >Morpho ↗</a>
        <a
          class="dv-ext"
          :href="ROBINHOOD_EXPLORER"
          target="_blank"
          rel="noopener noreferrer"
        >Blockscout ↗</a>
      </p>
    </section>
  </div>
</template>

<style scoped>
.dv {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.dv-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.dv-sub {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
  max-width: 62ch;
}

.dv-sec {
  margin-bottom: 40px;
}

.dv-h2 {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.dv-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.dv-steps li {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
}

.dv-n {
  font-family: var(--font-mono);
  color: var(--hf-green);
  font-weight: 700;
}

.dv-step-t {
  font-weight: 600;
  margin-bottom: 4px;
}

.dv-step-b {
  color: var(--hf-ink-3);
}

.dv-facts {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 8px 16px;
  margin: 0;
}

.dv-facts dt {
  color: var(--hf-ink-3);
  font-size: 13px;
}

.dv-facts dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.dv-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.dv-card-t {
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.dv-card-b {
  color: var(--hf-ink-3);
  margin-bottom: 12px;
}

.dv-cta,
.dv-ext {
  color: var(--hf-green);
  font-weight: 600;
  text-decoration: none;
}

.dv-ext {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 8px;
}

@media (max-width: 720px) {
  .dv-grid {
    grid-template-columns: 1fr;
  }

  .dv-facts {
    grid-template-columns: 1fr;
  }
}
</style>
