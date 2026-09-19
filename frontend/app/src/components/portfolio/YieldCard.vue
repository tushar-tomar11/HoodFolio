<script setup lang="ts">
import type { UsdgPosition } from '@/chain/mock-portfolio';
import HfCard from '@/components/hf/HfCard.vue';
import { formatUSD } from '@/utils/formatting';

const { position } = defineProps<{
  position: UsdgPosition;
}>();

const progressPct = computed(() => {
  const yearly = position.depositedUSD * (position.apy / 100);
  if (yearly <= 0)
    return 0;
  return Math.min(100, (position.earnedUSD / yearly) * 100);
});
</script>

<template>
  <section class="yc">
    <h2 class="yc__title">
      Yield
    </h2>
    <HfCard padding="lg">
      <div class="yc__top">
        <p class="yc__h">
          USDG Yield via Morpho
        </p>
        <p class="yc__apy num price-up">
          {{ position.apy.toFixed(1) }}% APY
        </p>
      </div>
      <p class="yc__pos num">
        {{ formatUSD(position.depositedUSD) }} deposited
      </p>
      <p class="yc__earn num price-up">
        +{{ formatUSD(position.earnedUSD) }} earned
      </p>
      <p class="yc__days">
        {{ position.daysActive }} days
      </p>
      <div
        class="yc__bar"
        role="progressbar"
        :aria-valuenow="Math.round(progressPct)"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="yc__fill"
          :style="{ width: `${progressPct}%` }"
        />
      </div>
      <a
        class="yc__cta"
        :href="position.morphoUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Morpho →
      </a>
      <p class="yc__note">
        Same vault as Robinhood Earn. Directly accessible on-chain.
      </p>
    </HfCard>
  </section>
</template>

<style scoped>
.yc {
  margin-bottom: 32px;
}

.yc__title {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hf-ink-2);
  margin-bottom: 12px;
}

.yc__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}

.yc__h {
  font-family: var(--font-ui);
  font-size: 18px;
  font-weight: 700;
  color: var(--hf-ink);
}

.yc__apy {
  font-size: 28px;
  font-weight: 700;
}

.yc__pos {
  font-size: 16px;
  color: var(--hf-ink-2);
}

.yc__earn {
  font-size: 22px;
  font-weight: 700;
  margin: 6px 0;
}

.yc__days {
  font-size: 13px;
  color: var(--hf-ink-3);
  margin-bottom: 14px;
}

.yc__bar {
  height: 8px;
  border-radius: 9999px;
  background: var(--hf-surface-2);
  overflow: hidden;
  margin-bottom: 16px;
}

.yc__fill {
  height: 100%;
  background: var(--hf-green);
  border-radius: 9999px;
}

.yc__cta {
  display: inline-block;
  font-family: var(--font-ui);
  font-weight: 600;
  color: var(--hf-green);
  text-decoration: none;
  margin-bottom: 12px;
}

.yc__note {
  font-size: 12px;
  color: var(--hf-ink-4);
}
</style>
