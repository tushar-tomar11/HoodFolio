import type { ComputedRef, Ref } from 'vue';
import { defineStore } from 'pinia';

export type HoodTheme = 'light' | 'dark';

export const HOOD_THEME_KEY = 'hoodfolio-theme';

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function readStoredTheme(): HoodTheme {
  const stored = localStorage.getItem(HOOD_THEME_KEY);
  if (stored === 'dark' || stored === 'light')
    return stored;
  return prefersDark() ? 'dark' : 'light';
}

export function applyHoodTheme(theme: HoodTheme): void {
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
  html.dataset.theme = theme;
  html.style.colorScheme = theme;
  localStorage.setItem(HOOD_THEME_KEY, theme);
}

interface ThemeStore {
  hydrate: () => void;
  isDark: ComputedRef<boolean>;
  theme: Ref<HoodTheme>;
  toggleTheme: () => void;
}

function initialTheme(): HoodTheme {
  if (typeof document === 'undefined')
    return 'light';
  if (document.documentElement.classList.contains('dark'))
    return 'dark';
  const attr = document.documentElement.dataset.theme;
  if (attr === 'dark' || attr === 'light')
    return attr;
  return 'light';
}

export const useThemeStore = defineStore('hoodfolio/theme', (): ThemeStore => {
  const theme = ref<HoodTheme>(initialTheme());
  const isDark = computed(() => theme.value === 'dark');

  function setTheme(next: HoodTheme): void {
    theme.value = next;
    applyHoodTheme(next);
  }

  function hydrate(): void {
    setTheme(readStoredTheme());
  }

  function toggleTheme(): void {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  }

  return { hydrate, isDark, theme, toggleTheme };
});
