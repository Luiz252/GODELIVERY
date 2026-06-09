import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideArrowLeft, LucideMoon, LucideSun } from '@lucide/angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings-screen',
  standalone: true,
  imports: [FormsModule, LucideArrowLeft, LucideMoon, LucideSun],
  template: `
    <div class="w-full min-h-screen flex flex-col bg-gd-bg">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen pb-8">
        <div class="px-6 pt-12 pb-4">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="router.navigateByUrl('/profile')"
              class="w-10 h-10 rounded-full bg-gd-surface flex items-center justify-center active:scale-90 transition-transform shadow-gd-sm"
            >
              <svg lucideArrowLeft class="w-5 h-5 text-gd-text"></svg>
            </button>
            <h1 class="text-2xl font-bold text-gd-text">Configurações</h1>
          </div>
        </div>

        <div class="px-6 space-y-4">
          <div class="bg-gd-surface rounded-2xl overflow-hidden shadow-gd">
            <div class="p-4 flex items-center justify-between border-b border-gd-border">
              <div>
                <p class="font-medium text-gd-text">Notificações push</p>
                <p class="text-xs text-gd-text-secondary">Status do pedido e promoções</p>
              </div>
              <button
                type="button"
                (click)="pushEnabled = !pushEnabled"
                class="w-12 h-7 rounded-full transition-colors relative"
                [style.background-color]="pushEnabled ? 'var(--gd-accent)' : 'var(--gd-border)'"
              >
                <span
                  class="absolute top-1 w-5 h-5 bg-gd-surface rounded-full transition-all"
                  [style.left]="pushEnabled ? '26px' : '4px'"
                ></span>
              </button>
            </div>
            <div class="p-4 flex items-center justify-between border-b border-gd-border">
              <div>
                <p class="font-medium text-gd-text">E-mails promocionais</p>
                <p class="text-xs text-gd-text-secondary">Ofertas e cupons exclusivos</p>
              </div>
              <button
                type="button"
                (click)="emailPromo = !emailPromo"
                class="w-12 h-7 rounded-full transition-colors relative"
                [style.background-color]="emailPromo ? 'var(--gd-accent)' : 'var(--gd-border)'"
              >
                <span
                  class="absolute top-1 w-5 h-5 bg-gd-surface rounded-full transition-all"
                  [style.left]="emailPromo ? '26px' : '4px'"
                ></span>
              </button>
            </div>
            <div class="p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                @if (theme.isDark()) {
                  <svg lucideMoon class="w-5 h-5 text-gd-accent"></svg>
                } @else {
                  <svg lucideSun class="w-5 h-5 text-gd-accent"></svg>
                }
                <div>
                  <p class="font-medium text-gd-text">Modo escuro</p>
                  <p class="text-xs text-gd-text-secondary">
                    {{ theme.isDark() ? 'Tema escuro ativado' : 'Tema claro ativado' }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                (click)="theme.toggle()"
                class="w-12 h-7 rounded-full transition-colors relative"
                [style.background-color]="theme.isDark() ? 'var(--gd-accent)' : 'var(--gd-border)'"
                aria-label="Alternar modo escuro"
              >
                <span
                  class="absolute top-1 w-5 h-5 bg-gd-surface rounded-full transition-all"
                  [style.left]="theme.isDark() ? '26px' : '4px'"
                ></span>
              </button>
            </div>
          </div>

          <div class="bg-gd-surface rounded-2xl p-4 shadow-gd">
            <p class="font-medium mb-1 text-gd-text">Idioma</p>
            <select
              [(ngModel)]="language"
              class="w-full h-12 px-4 bg-gd-surface rounded-xl border-2 border-gd-border outline-none text-sm text-gd-text"
              style="background-color: var(--gd-input-bg)"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <p class="text-center text-xs pt-4 text-gd-text-secondary">GoDelivery v1.0.0</p>
        </div>
      </div>
    </div>
  `,
})
export class SettingsScreenComponent {
  router = inject(Router);
  theme = inject(ThemeService);
  pushEnabled = true;
  emailPromo = false;
  language = 'pt-BR';
}