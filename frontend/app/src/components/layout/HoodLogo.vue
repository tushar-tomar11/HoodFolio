<script setup lang="ts">
const {
  variant = 'lockup',
  height = '32px',
} = defineProps<{
  variant?: 'lockup' | 'mark';
  height?: string;
}>();

const lockupSrc = '/hoodfolio-logo.png';
</script>

<template>
  <img
    v-if="variant === 'lockup'"
    :src="lockupSrc"
    alt="HoodFolio"
    class="hood-logo"
    :style="{ height }"
  />
  <svg
    v-else
    class="hood-logo hood-logo--mark"
    :style="{ height }"
    viewBox="0 0 78 80"
    aria-hidden="true"
    focusable="false"
  >
    <polygon
      fill="currentColor"
      points="18,8 46,8 28,80 0,80"
    />
    <polygon
      fill="currentColor"
      points="50,0 78,0 56,80 28,80"
    />
  </svg>
</template>

<style scoped>
.hood-logo {
  display: block;
  width: auto;
  max-width: min(240px, 62vw);
  object-fit: contain;
  object-position: left center;
}

.hood-logo--mark {
  color: var(--hf-green);
  width: auto;
}
</style>
