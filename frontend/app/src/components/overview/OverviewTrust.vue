<script setup lang="ts">
import { HOME_TRUST } from '@/chain/home-content';
</script>

<template>
  <section
    class="trust"
    aria-label="Privacy and trust"
  >
    <h2 class="trust__h">
      Privacy as the product
    </h2>
    <p class="trust__s">
      Same idea as rotki — your money data stays with you — applied to a Robinhood Chain web reader.
    </p>
    <div class="trust__grid">
      <article
        v-for="item in HOME_TRUST"
        :key="item.title"
        class="card trust__card"
      >
        <h3 class="trust__t">
          {{ item.title }}
        </h3>
        <p class="trust__b">
          {{ item.body }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.trust { margin-bottom: 56px; }

.trust__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.trust__s {
  max-width: 640px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--hf-ink-3);
  margin-bottom: 20px;
}

.trust__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.trust__card { padding: 18px 16px; }

.trust__t {
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.trust__b {
  font-size: 14px;
  line-height: 1.5;
  color: var(--hf-ink-3);
}

@media (min-width: 800px) {
  .trust__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
