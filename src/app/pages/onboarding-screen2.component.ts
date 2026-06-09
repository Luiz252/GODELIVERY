import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
  selector: 'app-onboarding-screen2',
  standalone: true,
  imports: [LucideArrowLeft],
  template: `
    <div
      class="w-full min-h-screen flex flex-col justify-between px-6 relative overflow-hidden"
      style="background-color: var(--gd-bg)"
    >
      <div class="w-full max-w-md mx-auto flex flex-col justify-between min-h-screen">
        <button
          type="button"
          (click)="router.navigateByUrl('/onboarding-1')"
          class="absolute top-12 left-6 p-2 rounded-full active:bg-black/5 transition-colors"
          aria-label="Voltar"
        >
          <svg lucideArrowLeft class="w-6 h-6" [style.color]="'var(--gd-text)'"></svg>
        </button>

        <button
          type="button"
          (click)="router.navigateByUrl('/login')"
          class="absolute top-12 right-6 text-sm font-medium transition-opacity active:opacity-70"
          style="color: var(--gd-text-secondary)"
        >
          Pular
        </button>

        <div class="flex-1 flex flex-col items-center justify-center pt-20 pb-8">
          <div class="w-[280px] h-[280px] mb-12 flex items-center justify-center">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="140" cy="230" rx="100" ry="15" fill="var(--gd-border)" opacity="0.6" />
              <circle cx="120" cy="120" r="18" fill="var(--gd-accent)" />
              <rect x="107" y="138" width="26" height="45" rx="8" fill="var(--gd-accent)" />
              <rect x="92" y="145" width="15" height="8" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="133" y="145" width="15" height="8" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="107" y="175" width="11" height="25" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="122" y="175" width="11" height="25" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="95" y="125" width="35" height="40" rx="6" fill="var(--gd-text)" />
              <rect x="102" y="132" width="21" height="26" rx="3" fill="var(--gd-text-secondary)" />
              <path d="M 112.5 125 L 112.5 110" stroke="var(--gd-text)" stroke-width="3" stroke-linecap="round" />
              <g transform="translate(140, 160)">
                <rect x="0" y="20" width="70" height="20" rx="8" fill="var(--gd-accent)" />
                <rect x="10" y="10" width="25" height="15" rx="4" fill="var(--gd-accent-dark)" />
                <circle cx="15" cy="50" r="15" fill="var(--gd-text)" />
                <circle cx="15" cy="50" r="10" fill="var(--gd-text-secondary)" />
                <circle cx="15" cy="50" r="5" fill="var(--gd-border)" />
                <circle cx="55" cy="50" r="15" fill="var(--gd-text)" />
                <circle cx="55" cy="50" r="10" fill="var(--gd-text-secondary)" />
                <circle cx="55" cy="50" r="5" fill="var(--gd-border)" />
                <path d="M 35 15 L 35 25" stroke="var(--gd-text)" stroke-width="3" stroke-linecap="round" />
                <line x1="25" y1="15" x2="45" y2="15" stroke="var(--gd-text)" stroke-width="3" stroke-linecap="round" />
                <rect x="40" y="12" width="20" height="8" rx="4" fill="var(--gd-text)" />
              </g>
              <g opacity="0.4">
                <line x1="30" y1="140" x2="50" y2="140" stroke="var(--gd-accent)" stroke-width="3" stroke-linecap="round" />
                <line x1="20" y1="160" x2="45" y2="160" stroke="var(--gd-accent)" stroke-width="3" stroke-linecap="round" />
                <line x1="25" y1="180" x2="50" y2="180" stroke="var(--gd-accent)" stroke-width="3" stroke-linecap="round" />
              </g>
              <g opacity="0.7">
                <circle cx="60" cy="80" r="8" fill="var(--gd-accent)" />
                <circle cx="220" cy="100" r="6" fill="var(--gd-accent-dark)" />
                <circle cx="240" cy="150" r="7" fill="var(--gd-accent)" />
              </g>
            </svg>
          </div>

          <div class="flex flex-col items-center max-w-[280px]">
            <h1 class="text-2xl font-bold text-center mb-3" style="color: var(--gd-text)">Entrega rápida e segura</h1>
            <p class="text-base text-center leading-relaxed" style="color: var(--gd-text-secondary)">
              Acompanhe seu pedido em tempo real até chegar em você
            </p>
          </div>
        </div>

        <div class="pb-12 flex flex-col items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
            <div class="h-2 rounded-full transition-all" style="width: 24px; background-color: var(--gd-accent)"></div>
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
          </div>

          <button
            type="button"
            (click)="router.navigateByUrl('/onboarding-3')"
            class="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
            style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  `,
})
export class OnboardingScreen2Component {
  router = inject(Router);
}