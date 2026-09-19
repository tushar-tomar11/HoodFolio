<script setup lang="ts">
import { useToast } from '@/composables/use-toast';

const { dismiss, toasts } = useToast();
</script>

<template>
  <div
    class="toast-stack"
    aria-live="polite"
  >
    <div
      v-for="item in toasts"
      :key="item.id"
      class="toast"
      :class="`toast--${item.type}`"
    >
      <p class="toast__msg">
        {{ item.message }}
      </p>
      <button
        type="button"
        class="toast__x"
        aria-label="Dismiss"
        @click="dismiss(item.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 80;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(360px, calc(100vw - 32px));
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 12px 12px 14px;
  background: var(--hf-surface);
  border: 1px solid var(--hf-border);
  border-radius: 10px;
  box-shadow: var(--shadow-raised);
  animation: toast-in 0.22s ease;
}

.toast--success { border-left: 4px solid var(--hf-green); }
.toast--error { border-left: 4px solid var(--hf-red); }
.toast--info { border-left: 4px solid var(--hf-blue); }

.toast__msg {
  flex: 1;
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--hf-ink);
  line-height: 1.4;
}

.toast__x {
  border: 0;
  background: transparent;
  color: var(--hf-ink-3);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
