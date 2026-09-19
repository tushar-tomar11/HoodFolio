<script setup lang="ts">
type HfBadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'grey';

const { variant = 'grey' } = defineProps<{
  variant?: HfBadgeVariant;
}>();

defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <span
    class="hf-badge"
    :class="`hf-badge--${variant}`"
  >
    <slot />
  </span>
</template>

<style scoped>
.hf-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 2px 8px;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.4;
  white-space: nowrap;
}

.hf-badge--green {
  color: var(--hf-green-text);
  background: var(--hf-green-bg);
}

.hf-badge--red {
  color: var(--hf-red-text);
  background: var(--hf-red-bg);
}

.hf-badge--amber {
  color: var(--hf-amber-text);
  background: var(--hf-amber-bg);
}

.hf-badge--blue {
  color: var(--hf-blue);
  background: var(--hf-blue-bg);
}

.hf-badge--grey {
  color: var(--hf-ink-3);
  background: var(--hf-surface-2);
}
</style>
