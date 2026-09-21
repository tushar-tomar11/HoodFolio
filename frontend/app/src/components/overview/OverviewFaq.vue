<script setup lang="ts">
import { HOME_FAQ } from '@/chain/home-content';

const openId = shallowRef<string | null>(HOME_FAQ[0]?.q ?? null);

function toggle(question: string): void {
  openId.value = openId.value === question ? null : question;
}
</script>

<template>
  <section
    id="faq"
    class="faq"
    aria-label="Frequently asked questions"
  >
    <h2 class="faq__h">
      FAQ
    </h2>
    <div class="faq__list">
      <article
        v-for="item in HOME_FAQ"
        :key="item.q"
        class="card faq__item"
      >
        <button
          type="button"
          class="faq__q"
          :aria-expanded="openId === item.q"
          @click="toggle(item.q)"
        >
          {{ item.q }}
        </button>
        <p
          v-if="openId === item.q"
          class="faq__a"
        >
          {{ item.a }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.faq { margin-bottom: 24px; }

.faq__h {
  font-family: var(--font-ui);
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 16px;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq__item { padding: 0; overflow: hidden; }

.faq__q {
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 16px 18px;
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 600;
  color: var(--hf-ink);
  cursor: pointer;
}

.faq__a {
  padding: 0 18px 16px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--hf-ink-3);
  overflow-wrap: anywhere;
}
</style>
