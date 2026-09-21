<script setup lang="ts">
import { HOME_STEPS } from '@/chain/home-content';
</script>

<template>
  <section
    class="hiw"
    aria-label="How HoodFolio works"
  >
    <h2 class="hiw__h">
      How it works
    </h2>
    <div class="hiw__grid">
      <article
        v-for="step in HOME_STEPS"
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
      </article>
    </div>
  </section>
</template>

<style scoped>
.hiw { margin-bottom: 56px; }

.hiw__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 16px;
}

.hiw__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.hiw__card { padding: 22px 20px; }

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
  overflow-wrap: anywhere;
}

@media (min-width: 700px) {
  .hiw__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1100px) {
  .hiw__grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
