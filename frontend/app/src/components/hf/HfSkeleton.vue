<script setup lang="ts">
type HfSkeletonRounded = 'sm' | 'md' | 'full';

const {
  width = '100%',
  height = '16px',
  rounded = 'md',
} = defineProps<{
  width?: string;
  height?: string;
  rounded?: HfSkeletonRounded;
}>();
</script>

<template>
  <div
    class="skeleton hf-skeleton"
    :class="`hf-skeleton--${rounded}`"
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>

<style scoped>
.hf-skeleton--sm { border-radius: 4px; }
.hf-skeleton--md { border-radius: 6px; }
.hf-skeleton--full { border-radius: 9999px; }
</style>
