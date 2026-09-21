<script setup lang="ts">
import { HOME_FEATURES } from '@/chain/home-content';
</script>

<template>
  <section
    class="fg"
    aria-label="Product features"
  >
    <h2 class="fg__h">
      What you can do in HoodFolio
    </h2>
    <p class="fg__s">
      Live Robinhood Chain data — not a tax engine, not a custodian, not Robinhood Inc.
    </p>
    <div class="fg__grid">
      <RouterLink
        v-for="feature in HOME_FEATURES"
        :key="feature.title"
        :to="feature.to"
        class="card fg__card"
      >
        <h3 class="fg__t">
          {{ feature.title }}
        </h3>
        <p class="fg__b">
          {{ feature.body }}
        </p>
        <span class="fg__cta">{{ feature.cta }} →</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.fg { margin-bottom: 56px; }

.fg__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  color: var(--hf-ink);
  margin-bottom: 8px;
}

.fg__s {
  max-width: 640px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--hf-ink-3);
  margin-bottom: 20px;
}

.fg__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.fg__card {
  display: block;
  padding: 20px 18px;
  text-decoration: none;
  color: inherit;
}

.fg__card:hover {
  border-color: var(--hf-green);
}

.fg__t {
  font-family: var(--font-ui);
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
}

.fg__b {
  font-size: 14px;
  line-height: 1.55;
  color: var(--hf-ink-3);
  margin-bottom: 12px;
}

.fg__cta {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  color: var(--hf-green);
}

@media (min-width: 700px) {
  .fg__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1100px) {
  .fg__grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
