<script setup lang="ts">
import ChainTicker from '@/components/layout/ChainTicker.vue';
import HoodFooter from '@/components/layout/HoodFooter.vue';
import HoodNavbar from '@/components/layout/HoodNavbar.vue';
import ToastStack from '@/components/ui/ToastStack.vue';
import { useChainData } from '@/composables/use-chain-data';
import { useWalletToasts } from '@/composables/use-wallet-toasts';
import { usePriceStore } from '@/store/prices';
import { useThemeStore } from '@/store/theme';

const route = useRoute();
useChainData();
useWalletToasts();
const priceStore = usePriceStore();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.hydrate();
  priceStore.startAutoRefresh();
});

onUnmounted(() => {
  priceStore.stopAutoRefresh();
});
</script>

<template>
  <div id="hoodfolio">
    <!-- THE CHAIN TICKER — first thing anyone sees -->
    <!-- Bloomberg-style price bar for Robinhood Chain stock tokens -->
    <ChainTicker />

    <!-- NAVBAR — sticky below ticker -->
    <HoodNavbar />

    <!-- PAGE CONTENT -->
    <main class="hf-main">
      <RouterView #default="{ Component }">
        <Transition
          name="page"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.fullPath"
          />
        </Transition>
      </RouterView>
    </main>

    <!-- FOOTER -->
    <HoodFooter />
    <ToastStack />
  </div>
</template>

<style>
html {
  overflow-y: auto !important;
  max-height: none !important;
}

body {
  margin-top: 0 !important;
  height: auto !important;
  min-height: 100vh;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  background: var(--hf-bg) !important;
  color: var(--hf-ink);
}

#hoodfolio {
  background: var(--hf-bg);
  min-height: 100vh;
  color: var(--hf-ink);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
