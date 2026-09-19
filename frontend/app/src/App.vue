<script setup lang="ts">
import ChainTicker from '@/components/layout/ChainTicker.vue';
import HoodFooter from '@/components/layout/HoodFooter.vue';
import HoodNavbar from '@/components/layout/HoodNavbar.vue';
import ToastStack from '@/components/ui/ToastStack.vue';
import { useChainData } from '@/composables/use-chain-data';
import { useWalletToasts } from '@/composables/use-wallet-toasts';

const route = useRoute();
useChainData();
useWalletToasts();
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

.hf-main {
  min-height: calc(100vh - 28px - 60px);
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
