<script setup lang="ts">
const {
  data,
  width = 60,
  height = 32,
} = defineProps<{
  data: number[];
  width?: number;
  height?: number;
}>();

const barWidth = 4;
const gap = 2;

const normalizedBars = computed(() => {
  const values = data.length > 0 ? data : [4, 8, 6, 10, 7, 12, 9, 14];
  const max = Math.max(...values, 1);
  return values.map(value => Math.max(3, Math.round((value / max) * (height - 2))));
});
</script>

<template>
  <svg
    class="mini-spark"
    :width="width"
    :height="height"
    viewBox="0 0 60 32"
    aria-hidden="true"
  >
    <rect
      v-for="(bar, i) in normalizedBars"
      :key="i"
      :x="i * (barWidth + gap)"
      :y="height - bar"
      :width="barWidth"
      :height="bar"
      fill="var(--hf-green)"
      :opacity="i === normalizedBars.length - 1 ? 1 : 0.4"
      rx="1"
    />
  </svg>
</template>
