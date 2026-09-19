<script setup lang="ts">
type HfButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type HfButtonSize = 'sm' | 'md' | 'lg';

const {
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  type = 'button',
} = defineProps<{
  variant?: HfButtonVariant;
  size?: HfButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>();

defineSlots<{
  default: () => unknown;
  leftIcon: () => unknown;
}>();
</script>

<template>
  <button
    :type="type"
    class="hf-btn"
    :class="[
      `hf-btn--${variant}`,
      `hf-btn--${size}`,
      { 'hf-btn--loading': loading, 'hf-btn--full': fullWidth },
    ]"
    :disabled="disabled || loading"
    :aria-busy="loading"
  >
    <svg
      v-if="loading"
      class="hf-btn__spinner"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="32"
        stroke-dashoffset="10"
      />
    </svg>
    <span
      v-else-if="$slots.leftIcon"
      class="hf-btn__icon"
    >
      <slot name="leftIcon" />
    </span>
    <span class="hf-btn__label">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.hf-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease, transform 150ms ease;
}

.hf-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.hf-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.hf-btn--loading {
  cursor: wait;
}

.hf-btn--full {
  width: 100%;
}

.hf-btn--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
}

.hf-btn--md {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.hf-btn--lg {
  height: 48px;
  padding: 0 20px;
  font-size: 15px;
}

.hf-btn--primary {
  background: var(--hf-green);
  color: #fff;
  box-shadow: var(--shadow-green);
}

.hf-btn--primary:hover:not(:disabled) {
  background: var(--hf-green-2);
}

.hf-btn--secondary {
  background: var(--hf-surface);
  color: var(--hf-ink);
  border-color: var(--hf-border);
}

.hf-btn--secondary:hover:not(:disabled) {
  background: var(--hf-surface-2);
  border-color: var(--hf-border-2);
}

.hf-btn--ghost {
  background: transparent;
  color: var(--hf-ink-2);
}

.hf-btn--ghost:hover:not(:disabled) {
  background: var(--hf-surface-2);
}

.hf-btn--danger {
  background: transparent;
  color: var(--hf-red);
  border-color: var(--hf-red);
}

.hf-btn--danger:hover:not(:disabled) {
  background: var(--hf-red-bg);
}

.hf-btn__icon,
.hf-btn__spinner {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.hf-btn__spinner {
  animation: hf-spin 700ms linear infinite;
}

@keyframes hf-spin {
  to { transform: rotate(360deg); }
}

.hf-btn__label {
  line-height: 1;
}
</style>
