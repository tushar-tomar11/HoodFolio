<script setup lang="ts">
import { MORPHO_HOME_URL, MORPHO_VAULT_URL, YIELD_COMPARISON } from '@/chain/mock-chain-stats';
import { MOCK_PORTFOLIO } from '@/chain/mock-portfolio';
import HfCard from '@/components/hf/HfCard.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { useWalletStore } from '@/store/wallet';
import { formatUSD } from '@/utils/formatting';

usePageMeta(
  'USDG Yield | HoodFolio',
  'USDG yield via the Morpho vault that powers Robinhood Earn.',
);

const wallet = useWalletStore();
const position = MOCK_PORTFOLIO.usdgPosition;
const expanded = shallowRef(false);
const earnedShown = shallowRef(0);

function toggleExplain(): void {
  expanded.value = !expanded.value;
}

onMounted(() => {
  const target = position.earnedUSD;
  const started = performance.now();
  const duration = 900;

  function tick(now: number): void {
    const t = Math.min(1, (now - started) / duration);
    earnedShown.value = target * t;
    if (t < 1)
      requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});
</script>

<template>
  <div class="yv">
    <header class="yv-head">
      <h1 class="yv-h">
        USDG Yield
      </h1>
      <p class="yv-sub">
        The same Morpho vault that powers Robinhood Earn — on-chain, no account.
      </p>
    </header>

    <HfCard
      class="yv-vault"
      padding="lg"
    >
      <div class="yv-vault__top">
        <div>
          <p class="yv-vault__name">
            Robinhood Earn Vault (Steakhouse USDG)
          </p>
          <p class="yv-live">
            <span class="yv-dot" />
            LIVE
          </p>
        </div>
        <p class="yv-apy num">
          7.2%
        </p>
      </div>
      <p class="yv-dep num">
        $42.8M USDG total deposits
      </p>
      <p class="yv-meta">
        Protocol:
        <a
          :href="MORPHO_HOME_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          Morpho Finance
        </a>
        · Curator: Steakhouse Finance
      </p>
      <a
        class="yv-cta"
        :href="MORPHO_VAULT_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        Deposit USDG on Morpho →
      </a>
      <button
        type="button"
        class="yv-toggle"
        @click="toggleExplain()"
      >
        What is this?
      </button>
      <p
        v-if="expanded"
        class="yv-explain"
      >
        This is the same vault that powers Robinhood Earn in the official
        Robinhood app. When you deposit USDG (the chain's stablecoin), you
        earn yield from borrowers on Morpho's lending markets. Accessible
        directly without needing a Robinhood account.
      </p>
    </HfCard>

    <section
      v-if="wallet.isConnected"
      class="yv-pos"
    >
      <h2 class="yv-sec">
        Your position
      </h2>
      <div class="yv-pos__grid">
        <HfCard>
          <p class="yv-pos__l">
            USDG deposited
          </p>
          <p class="yv-pos__v num">
            {{ formatUSD(position.depositedUSD) }}
          </p>
        </HfCard>
        <HfCard>
          <p class="yv-pos__l">
            Total earned
          </p>
          <p class="yv-pos__v num price-up">
            +{{ formatUSD(earnedShown) }}
          </p>
        </HfCard>
        <HfCard>
          <p class="yv-pos__l">
            APY
          </p>
          <p class="yv-pos__v num price-up">
            {{ position.apy.toFixed(1) }}%
          </p>
        </HfCard>
        <HfCard>
          <p class="yv-pos__l">
            Days active
          </p>
          <p class="yv-pos__v num">
            {{ position.daysActive }}
          </p>
        </HfCard>
      </div>
    </section>

    <section class="yv-cmp">
      <h2 class="yv-sec">
        How does 7.2% compare?
      </h2>
      <div class="card yv-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Protocol</th>
              <th class="col-right">
                APY
              </th>
              <th class="col-right">
                Risk
              </th>
              <th class="col-right">
                Lock-up
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in YIELD_COMPARISON"
              :key="row.protocol"
              :class="{ 'yv-row--us': row.apy === 7.2 }"
            >
              <td>{{ row.protocol }}</td>
              <td class="col-right num">
                {{ row.apy.toFixed(1) }}%
              </td>
              <td class="col-right">
                {{ row.risk }}
              </td>
              <td class="col-right">
                {{ row.lockup }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="yv-note">
        Rates as of September 2026. APY varies with market conditions.
      </p>
    </section>
  </div>
</template>

<style scoped>
.yv {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.yv-h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.yv-sub {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
}

.yv-vault {
  margin-bottom: 36px;
}

.yv-vault__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.yv-vault__name {
  font-family: var(--font-ui);
  font-size: 20px;
  font-weight: 700;
}

.yv-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--hf-green);
}

.yv-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hf-green);
  animation: live-pulse 2s ease-in-out infinite;
}

.yv-apy {
  font-weight: 700;
  font-size: 52px;
  line-height: 1;
  color: var(--hf-green);
}

.yv-dep {
  font-size: 16px;
  margin-bottom: 8px;
}

.yv-meta {
  font-size: 14px;
  color: var(--hf-ink-3);
  margin-bottom: 16px;
}

.yv-meta a {
  color: var(--hf-green);
}

.yv-cta {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  background: var(--hf-green);
  color: #fff;
  font-family: var(--font-ui);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 16px;
}

.yv-toggle {
  display: block;
  background: none;
  border: 0;
  padding: 0;
  font-family: var(--font-ui);
  font-weight: 600;
  color: var(--hf-ink-2);
  cursor: pointer;
}

.yv-explain {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--hf-ink-3);
}

.yv-sec {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.yv-pos {
  margin-bottom: 36px;
}

.yv-pos__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.yv-pos__l {
  font-size: 12px;
  color: var(--hf-ink-3);
  margin-bottom: 6px;
}

.yv-pos__v {
  font-size: 22px;
  font-weight: 700;
}

.yv-table-wrap {
  padding: 8px 12px;
  margin-bottom: 10px;
}

.yv-row--us td {
  font-weight: 700;
  color: var(--hf-green-text);
}

.yv-note {
  font-size: 12px;
  color: var(--hf-ink-4);
}

@media (max-width: 700px) {
  .yv-apy {
    font-size: 36px;
  }

  .yv-pos__grid {
    grid-template-columns: 1fr;
  }
}
</style>
