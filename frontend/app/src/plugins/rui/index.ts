import type { App } from 'vue';
import {
  createRui,
  type RuiOptions,
  ThemeMode,
} from '@rotki/ui-library';
import detectedIcons from 'virtual:rotki-icons';
import { brandIcons } from '@/brand-icons';
import '@rotki/ui-library/style.css';

interface RuiPlugin {
  install: (app: App) => void;
}

function initialRuiMode(): ThemeMode {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
    return ThemeMode.dark;
  return ThemeMode.light;
}

export function createRuiPlugin(defaults: Partial<RuiOptions['defaults']>): RuiPlugin {
  return createRui({
    defaults,
    theme: {
      icons: [...detectedIcons, ...brandIcons],
      mode: initialRuiMode(),
    },
  });
}
