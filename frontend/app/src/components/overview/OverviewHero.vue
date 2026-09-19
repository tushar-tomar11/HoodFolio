<script setup lang="ts">
import HfButton from '@/components/hf/HfButton.vue';

const emit = defineEmits<{
  connect: [];
}>();
</script>

<template>
  <section class="hero fade-up">
    <h1 class="hero__h fade-up fade-up-delay-1">
      Your Robinhood Chain Portfolio, On-Chain.
    </h1>
    <p class="hero__sub fade-up fade-up-delay-2">
      The first dedicated portfolio dashboard for Robinhood Chain.
      Track stock tokens, USDG yield, and meme coins.
      Read directly from the chain — no accounts, no custody, no BS.
    </p>
    <div class="hero__cta fade-up fade-up-delay-3">
      <HfButton
        variant="primary"
        size="lg"
        @click="emit('connect')"
      >
        Connect Wallet →
      </HfButton>
      <RouterLink
        class="hero__sec"
        to="/analytics"
      >
        View Analytics
      </RouterLink>
    </div>
    <p class="hero__trust fade-up fade-up-delay-4">
      📊 Non-custodial · Forked from rotki · Open source · Chain ID 4663
    </p>
  </section>
</template>

<style scoped>
.hero {
  max-width: 880px;
  margin: 0 auto 48px;
  text-align: center;
  padding-top: 24px;
}

.hero__h {
  font-family: var(--font-ui);
  font-size: clamp(28px, 6vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  color: var(--hf-ink);
  margin-bottom: 16px;
}

.hero__sub {
  font-family: var(--font-num);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--hf-ink-3);
  margin-bottom: 28px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
}

.hero__sec {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid var(--hf-border);
  background: var(--hf-surface);
  color: var(--hf-ink);
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
}

.hero__trust {
  font-family: var(--font-num);
  font-size: 12px;
  color: var(--hf-ink-4);
}
</style>
