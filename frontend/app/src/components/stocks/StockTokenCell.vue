<script setup lang="ts">
const {
  symbol,
  name,
  logoDomain = '',
} = defineProps<{
  symbol: string;
  name: string;
  logoDomain?: string;
}>();

const logoFailed = ref(false);
const logoSrc = computed(() =>
  logoDomain ? `https://logo.clearbit.com/${logoDomain}` : '',
);

function onLogoError(): void {
  logoFailed.value = true;
}
</script>

<template>
  <div class="stc">
    <div
      class="stc__logo"
      :style="{ background: logoFailed || !logoSrc ? 'var(--hf-green-bg)' : 'var(--hf-surface-2)' }"
    >
      <img
        v-if="logoSrc && !logoFailed"
        :src="logoSrc"
        :alt="symbol"
        @error="onLogoError()"
      />
      <span v-else>{{ symbol.slice(0, 1) }}</span>
    </div>
    <div>
      <p class="stc__sym">
        {{ symbol }}
      </p>
      <p class="stc__name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.stc {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.stc__logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 700;
  color: var(--hf-green-text);
}

.stc__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stc__sym {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  color: var(--hf-ink);
}

.stc__name {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 400;
  color: var(--hf-ink-3);
}
</style>
