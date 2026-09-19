<script setup lang="ts">
import { MOCK_PORTFOLIO } from '@/chain/mock-portfolio';
import HfButton from '@/components/hf/HfButton.vue';
import HfPremiumBadge from '@/components/hf/HfPremiumBadge.vue';
import { formatUSD } from '@/utils/formatting';

const emit = defineEmits<{
  connect: [];
}>();

const rows = MOCK_PORTFOLIO.stockHoldings.slice(0, 5);
const previewTotal = rows.reduce((sum, row) => sum + row.currentValueUSD, 0);
</script>

<template>
  <section class="prev">
    <h2 class="prev__h">
      Your brokerage-style portfolio
    </h2>
    <div class="prev__frame">
      <div
        class="prev__blur"
        aria-hidden="true"
      >
        <p class="prev__total num">
          {{ formatUSD(previewTotal) }}
        </p>
        <div
          v-for="row in rows"
          :key="row.symbol"
          class="prev__row"
        >
          <span class="prev__sym">{{ row.symbol }}</span>
          <span class="prev__val num">{{ formatUSD(row.currentValueUSD) }}</span>
          <HfPremiumBadge :premium="row.premium" />
        </div>
      </div>
      <div class="prev__overlay">
        <HfButton
          variant="primary"
          size="lg"
          @click="emit('connect')"
        >
          Connect Wallet
        </HfButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prev {
  margin-bottom: 48px;
}

.prev__h {
  font-family: var(--font-ui);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
}

.prev__frame {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  min-height: 280px;
}

.prev__blur {
  filter: blur(7px);
  pointer-events: none;
  user-select: none;
  padding: 24px;
  background: var(--hf-surface);
  border: 1px solid var(--hf-border);
  border-radius: 12px;
}

.prev__total {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
}

.prev__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--hf-surface-2);
}

.prev__sym {
  font-family: var(--font-ui);
  font-weight: 600;
  width: 64px;
}

.prev__val {
  flex: 1;
  font-weight: 600;
}

.prev__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.35);
}
</style>
