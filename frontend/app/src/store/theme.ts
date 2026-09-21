import type { ComputedRef, Ref } from 'vue';
import { ThemeMode, useRotkiTheme } from '@rotki/ui-library';
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

function syncRotkiTheme(theme: HoodTheme): void {
  try {
    const { switchThemeScheme } = useRotkiTheme();
    switchThemeScheme(theme === 'dark' ? ThemeMode.dark : ThemeMode.light);
  }
  catch {
    // Pinia unit tests and pre-plugin boot have no Rui app context.
  }
}

/** VitePress-style: only `html.dark` for dark. Never add `html.light` (rotki paints indigo). */
export function applyHoodTheme(theme: HoodTheme): void {
  const html = document.documentElement;
  html.classList.remove('light', 'dark');
  if (theme === 'dark')
    html.classList.add('dark');
  html.dataset.theme = theme;
  html.style.colorScheme = theme;
  html.style.filter = 'none';
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
    syncRotkiTheme(next);
    // Rui light mode re-adds `html.light` (indigo wash). Restore VitePress-style classes.
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
