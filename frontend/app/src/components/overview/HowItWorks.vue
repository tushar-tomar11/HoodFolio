<script setup lang="ts">
const STEPS = [
  {
    n: '01',
    title: 'Connect your wallet',
    body: 'Connect MetaMask or Rabby to Robinhood Chain. HoodFolio reads your balance directly from the chain — no accounts or sign-ups needed.',
  },
  {
    n: '02',
    title: 'See your portfolio like a brokerage account',
    body: 'Your NVDA, TSLA, and SPY holdings displayed exactly like a stock brokerage statement. Every position shows real-time P&L and the premium/discount vs NYSE price.',
  },
  {
    n: '03',
    title: 'Track premium/discount on every trade',
    body: 'Is AAPL cheaper on Robinhood Chain than the Apple Nasdaq price? HoodFolio tells you in real time. No other tool does this.',
  },
];
</script>

<template>
  <section class="hiw">
    <div
      v-for="step in STEPS"
      :key="step.n"
      class="card hiw__card"
    >
      <p class="hiw__n num">
        {{ step.n }}
      </p>
      <h3 class="hiw__t">
        {{ step.title }}
      </h3>
      <p class="hiw__b">
        {{ step.body }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.hiw {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 56px;
}

.hiw__card {
  padding: 22px 20px;
}

.hiw__n {
  font-size: 28px;
  font-weight: 700;
  color: var(--hf-green);
  margin-bottom: 8px;
}

.hiw__t {
  font-family: var(--font-ui);
  font-size: 17px;
  font-weight: 700;
  color: var(--hf-ink);
  margin-bottom: 8px;
}

.hiw__b {
  font-size: 14px;
  line-height: 1.55;
  color: var(--hf-ink-3);
}

@media (min-width: 900px) {
  .hiw {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
