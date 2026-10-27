import { computed, effect, Injectable, signal } from '@angular/core';
import { readStorage, writeStorage } from '../storage';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'hana.theme';
const THEME_COLORS: Record<Theme, string> = { light: '#4A5A4A', dark: '#1C1E1B' };

/** Обрана тема: збережена в localStorage, інакше — системна (prefers-color-scheme). */
function initialTheme(): Theme {
  const saved = readStorage<Theme | null>(THEME_KEY, null);
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersDark = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(initialTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();
      document.documentElement.dataset['theme'] = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
      writeStorage(THEME_KEY, theme);
    });
  }

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
