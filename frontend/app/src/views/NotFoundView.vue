<script setup lang="ts">
import HfButton from '@/components/hf/HfButton.vue';
import { usePageMeta } from '@/composables/use-page-meta';

usePageMeta(
  '404 — Page Not Found | HoodFolio',
  'This HoodFolio page does not exist.',
);

const router = useRouter();

function goOverview(): void {
  router.push('/').catch(() => undefined);
}

function goPortfolio(): void {
  router.push('/portfolio').catch(() => undefined);
}
</script>

<template>
  <div class="nf">
    <p class="nf__emo">
      📉
    </p>
    <h1 class="nf__h">
      404 — Page Not Found
    </h1>
    <p class="nf__p">
      Even Robinhood Chain can't find this page, ser.
    </p>
    <div class="nf__btns">
      <HfButton
        variant="primary"
        @click="goOverview()"
      >
        Back to Overview
      </HfButton>
      <HfButton
        variant="secondary"
        @click="goPortfolio()"
      >
        View Portfolio
      </HfButton>
    </div>
  </div>
</template>

<style scoped>
.nf {
  min-height: 56vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 16px;
}

.nf__emo {
  font-size: 64px;
  margin-bottom: 12px;
}

.nf__h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.nf__p {
  color: var(--hf-ink-3);
  margin-bottom: 24px;
}

.nf__btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>
