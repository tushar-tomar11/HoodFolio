<script setup lang="ts">
import { useThemeStore } from '@/store/theme';

const theme = useThemeStore();
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="theme.isDark ? 'Light mode' : 'Dark mode'"
    @click="theme.toggleTheme()"
  >
    <svg
      v-if="theme.isDark"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
      />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <svg
      v-else
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--hf-border);
  border-radius: 999px;
  background: var(--hf-btn-secondary-bg);
  color: var(--hf-ink-2);
  cursor: pointer;
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--hf-ink);
  background: var(--hf-surface-2);
}
</style>
