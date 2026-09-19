<script setup lang="ts">
const STATS = [
  { label: 'Total TVL', value: '$315M' },
  { label: '24h Volume', value: '$142M' },
  { label: 'Active Wallets', value: '48,220' },
  { label: 'Stock Tokens', value: '2,000+' },
];
</script>

<template>
  <section
    class="stats"
    aria-label="Chain stats"
  >
    <div
      v-for="(stat, index) in STATS"
      :key="stat.label"
      class="card stats__box fade-up"
      :class="`fade-up-delay-${index + 1}`"
    >
      <p class="stats__val num">
        {{ stat.value }}
      </p>
      <p class="stats__lab">
        {{ stat.label }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 56px;
}

.stats__box {
  padding: 18px 16px;
}

.stats__val {
  font-weight: 700;
  font-size: 28px;
  color: var(--hf-ink);
  margin-bottom: 6px;
}

.stats__lab {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--hf-ink-3);
}

@media (min-width: 800px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
