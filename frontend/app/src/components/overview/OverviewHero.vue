<script setup lang="ts">
import HfButton from '@/components/hf/HfButton.vue';
import HoodLogo from '@/components/layout/HoodLogo.vue';
import { useWalletStore } from '@/store/wallet';

const emit = defineEmits<{
  connect: [];
}>();

const wallet = useWalletStore();
</script>

<template>
  <section class="hero">
    <HoodLogo
      class="hero__logo"
      height="48px"
    />
    <h1 class="hero__h">
      Non-custodial portfolio for
      <span class="hero__h-break">Robinhood Chain</span>
    </h1>
    <p class="hero__sub">
      Track tokenized stocks, USDG, and Uniswap pools on chain 4663.
      Read-only from the chain and DexPaprika. HoodFolio is not Robinhood
      Markets, Inc. No accounts, no custody.
    </p>
    <div class="hero__cta">
      <HfButton
        variant="primary"
        size="lg"
        @click="emit('connect')"
      >
        Connect Wallet
      </HfButton>
      <HfButton
        variant="secondary"
        size="lg"
        :loading="wallet.isSwitching"
        @click="wallet.switchToRobinhood()"
      >
        <template #leftIcon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </template>
        Add Robinhood Chain
      </HfButton>
      <RouterLink
        class="hero__sec"
        to="/analytics"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 4 4 6-6" />
        </svg>
        View Analytics
      </RouterLink>
    </div>
    <p class="hero__trust">
      Non-custodial · Open source AGPL · Chain ID 4663
    </p>
  </section>
</template>

<style scoped>
.hero {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 16px 24px;
}

.hero__logo {
  margin: 0 auto 20px;
  max-width: min(240px, 70vw);
  object-position: center;
}

.hero__h {
  font-family: var(--font-ui);
  font-size: clamp(28px, 5.4vw, 52px);
  font-weight: 700;
  line-height: 1.12;
  color: var(--hf-ink);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.hero__h-break {
  display: block;
}

.hero__sub {
  font-family: var(--font-num);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--hf-ink-3);
  margin: 0 auto 28px;
  max-width: 640px;
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
  gap: 8px;
  height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid var(--hf-btn-secondary-border);
  background: var(--hf-btn-secondary-bg);
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
