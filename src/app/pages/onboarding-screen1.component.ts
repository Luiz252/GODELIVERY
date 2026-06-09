import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-screen1',
  standalone: true,
  template: `
    <div
      class="w-full min-h-screen flex flex-col justify-between px-6 relative overflow-hidden"
      style="background-color: var(--gd-bg)"
    >
      <div class="w-full max-w-md mx-auto flex flex-col justify-between min-h-screen">
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
              <rect x="60" y="80" width="160" height="180" rx="8" fill="var(--gd-border)" />
              <rect x="100" y="160" width="80" height="100" fill="var(--gd-text)" />
              <circle cx="175" cy="210" r="4" fill="var(--gd-accent)" />
              <rect x="90" y="110" width="40" height="40" rx="4" fill="var(--gd-surface)" />
              <rect x="150" y="110" width="40" height="40" rx="4" fill="var(--gd-surface)" />
              <circle cx="200" cy="140" r="20" fill="var(--gd-accent)" />
              <rect x="185" y="160" width="30" height="50" rx="8" fill="var(--gd-accent)" />
              <rect x="180" y="200" width="15" height="30" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="205" y="200" width="15" height="30" rx="4" fill="var(--gd-accent-dark)" />
              <rect x="165" y="165" width="20" height="10" rx="5" fill="var(--gd-accent-dark)" />
              <rect x="215" y="165" width="20" height="10" rx="5" fill="var(--gd-accent-dark)" />
              <rect x="230" y="155" width="35" height="35" rx="4" fill="var(--gd-text)" />
              <path d="M 230 172 L 265 172" stroke="var(--gd-accent)" stroke-width="2" />
              <path d="M 247.5 155 L 247.5 190" stroke="var(--gd-accent)" stroke-width="2" />
              <ellipse cx="140" cy="250" rx="80" ry="10" fill="var(--gd-border)" opacity="0.5" />
              <g opacity="0.8">
                <circle cx="50" cy="100" r="8" fill="var(--gd-accent)" />
                <circle cx="230" cy="90" r="6" fill="var(--gd-accent-dark)" />
                <circle cx="45" cy="180" r="7" fill="var(--gd-accent)" />
              </g>
            </svg>
          </div>

          <div class="flex flex-col items-center max-w-[280px]">
            <h1 class="text-2xl font-bold text-center mb-3" style="color: var(--gd-text)">Peça sua comida favorita</h1>
            <p class="text-base text-center leading-relaxed" style="color: var(--gd-text-secondary)">
              Escolha entre centenas de restaurantes perto de você
            </p>
          </div>
        </div>

        <div class="pb-12 flex flex-col items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="h-2 rounded-full transition-all" style="width: 24px; background-color: var(--gd-accent)"></div>
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
          </div>

          <button
            type="button"
            (click)="router.navigateByUrl('/onboarding-2')"
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
export class OnboardingScreen1Component {
  router = inject(Router);
}