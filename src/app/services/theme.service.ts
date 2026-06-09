import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'godelivery_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = signal(this.loadPreference());

  isDark = computed(() => this.darkMode());

  constructor() {
    this.apply(this.darkMode());
  }

  toggle(): void {
    this.setDark(!this.darkMode());
  }

  setDark(enabled: boolean): void {
    this.darkMode.set(enabled);
    this.apply(enabled);
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }

  private apply(dark: boolean): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  }

  private loadPreference(): boolean {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    } catch {
      /* ignore */
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  }
}