import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { HOOD_THEME_KEY, useThemeStore } from '@/store/theme';

describe('theme store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark', 'light');
  });

  it('hydrates from localStorage and toggles light and dark', () => {
    localStorage.setItem(HOOD_THEME_KEY, 'dark');
    const store = useThemeStore();
    store.hydrate();
    expect(store.theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    store.toggleTheme();
    expect(store.theme).toBe('light');
    expect(localStorage.getItem(HOOD_THEME_KEY)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
