<script setup lang="ts">
type HfCardPadding = 'none' | 'sm' | 'md' | 'lg';

const {
  padding = 'md',
  hover = false,
  onClick,
} = defineProps<{
  padding?: HfCardPadding;
  hover?: boolean;
  onClick?: () => void;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <div
    class="card"
    :class="[
      `hf-card--pad-${padding}`,
      { 'card-hover': hover },
    ]"
    :role="hover || onClick ? 'button' : undefined"
    :tabindex="hover || onClick ? 0 : undefined"
    @click="onClick?.(); emit('click', $event)"
  >
    <slot />
  </div>
</template>

<style scoped>
.hf-card--pad-none { padding: 0; }
.hf-card--pad-sm { padding: var(--sp-3); }
.hf-card--pad-md { padding: var(--sp-4); }
.hf-card--pad-lg { padding: var(--sp-6); }
</style>
