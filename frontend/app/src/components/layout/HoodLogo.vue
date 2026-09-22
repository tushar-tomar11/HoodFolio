<script setup lang="ts">
const {
  variant = 'lockup',
  height = '32px',
} = defineProps<{
  variant?: 'lockup' | 'mark';
  height?: string;
}>();
</script>

<template>
  <span
    v-if="variant === 'lockup'"
    class="hood-logo-wrap"
    :style="{ height }"
  >
    <img
      src="/hoodfolio-logo.png"
      alt="HoodFolio"
      class="hood-logo hood-logo--light"
    >
    <img
      src="/hoodfolio-logo-dark.png"
      alt=""
      class="hood-logo hood-logo--dark"
    >
  </span>
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
.hood-logo-wrap {
  display: block;
  line-height: 0;
}

.hood-logo {
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
}

.hood-logo--dark {
  display: none;
}

.hood-logo--mark {
  color: var(--hf-green);
  width: auto;
}
</style>

<style>
html.dark .hood-logo-wrap .hood-logo--light {
  display: none;
}

html.dark .hood-logo-wrap .hood-logo--dark {
  display: block;
}
</style>
