<script setup lang="ts">
import { getTickerTokens } from '@/chain/mock-data';
import TickerItem from '@/components/layout/TickerItem.vue';

const tokens = getTickerTokens();
const paused = ref(false);
</script>

<template>
  <div
    class="chain-ticker"
    role="marquee"
    aria-hidden="true"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <div class="chain-ticker__lead">
      <div class="chain-ticker__label">
        <span>HOOD CHAIN</span>
        <span class="live-dot chain-ticker__pulse" />
      </div>
      <div class="chain-ticker__fade" />
    </div>
    <div
      class="ticker-track chain-ticker__track"
      :style="{ animationPlayState: paused ? 'paused' : 'running' }"
    >
      <!-- First copy -->
      <TickerItem
        v-for="token in tokens"
        :key="`a-${token.symbol}`"
        v-bind="token"
      />
      <!-- Second copy — identical, makes the loop seamless -->
      <TickerItem
        v-for="token in tokens"
        :key="`b-${token.symbol}`"
        v-bind="token"
      />
    </div>
  </div>
</template>

<style scoped>
.chain-ticker {
  position: sticky;
  top: 0;
  z-index: 60;
  width: 100%;
  height: 28px;
  overflow: hidden;
  background: var(--hf-ticker-bg);
}

.chain-ticker__lead {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  height: 100%;
  pointer-events: none;
}

.chain-ticker__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 12px;
  background: var(--hf-green);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
  width: auto;
  min-width: fit-content;
}

.chain-ticker__pulse {
  background: #fff;
}

.chain-ticker__fade {
  width: 24px;
  height: 100%;
  background: linear-gradient(to right, var(--hf-ticker-bg), transparent);
}

.chain-ticker__track {
  height: 100%;
  padding-left: 148px;
}
</style>
