import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
  selector: 'app-onboarding-screen3',
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
          (click)="router.navigateByUrl('/onboarding-2')"
          class="absolute top-12 left-6 p-2 rounded-full active:bg-black/5 transition-colors"
          aria-label="Voltar"
        >
          <svg lucideArrowLeft class="w-6 h-6" [style.color]="'var(--gd-text)'"></svg>
        </button>

        <div class="flex-1 flex flex-col items-center justify-center pt-20 pb-8">
          <div class="w-[280px] h-[280px] mb-12 flex items-center justify-center">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="140" cy="180" rx="90" ry="12" fill="var(--gd-border)" />
              <rect x="60" y="140" width="160" height="40" rx="8" fill="var(--gd-border-soft)" />
              <g transform="translate(105, 80)">
                <circle cx="35" cy="0" r="20" fill="var(--gd-accent)" />
                <rect x="22" y="20" width="26" height="40" rx="8" fill="var(--gd-accent-dark)" />
                <rect x="8" y="30" width="14" height="8" rx="4" fill="var(--gd-accent-dark)" />
                <rect x="48" y="30" width="14" height="8" rx="4" fill="var(--gd-accent-dark)" />
                <rect x="22" y="58" width="10" height="20" rx="4" fill="var(--gd-accent)" />
                <rect x="38" y="58" width="10" height="20" rx="4" fill="var(--gd-accent)" />
              </g>
              <g transform="translate(140, 135)">
                <circle cx="0" cy="0" r="28" fill="#FFEDD5" />
                <circle cx="0" cy="0" r="24" fill="var(--gd-border)" />
                <path d="M -8 -5 L 8 -5 L 0 -20 Z" fill="var(--gd-accent)" />
                <circle cx="-3" cy="-10" r="2" fill="var(--gd-accent-dark)" />
                <circle cx="3" cy="-8" r="2" fill="var(--gd-accent-dark)" />
                <circle cx="0" cy="-13" r="2" fill="var(--gd-accent-dark)" />
                <rect x="-10" y="2" width="20" height="12" rx="6" fill="var(--gd-accent)" />
                <rect x="-9" y="5" width="18" height="3" fill="var(--gd-accent-dark)" />
                <rect x="-9" y="9" width="18" height="2" fill="var(--gd-text)" />
              </g>
              <g transform="translate(190, 145)">
                <rect x="-10" y="0" width="20" height="30" rx="3" fill="var(--gd-accent)" />
                <rect x="-8" y="5" width="16" height="20" rx="2" fill="var(--gd-accent-dark)" />
                <circle cx="0" cy="-5" r="11" fill="var(--gd-accent)" />
                <rect x="5" y="-15" width="3" height="20" rx="1.5" fill="var(--gd-border-soft)" />
              </g>
              <g transform="translate(140, 80)">
                <circle cx="-6" cy="0" r="2.5" fill="var(--gd-text)" />
                <circle cx="6" cy="0" r="2.5" fill="var(--gd-text)" />
                <path
                  d="M -8 4 Q 0 10 8 4"
                  stroke="var(--gd-text)"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />
              </g>
              <g opacity="0.6">
                <path d="M 60 100 L 63 96 L 67 96 L 70 100 L 65 106 Z" fill="var(--gd-accent)" />
                <path d="M 210 90 L 213 86 L 217 86 L 220 90 L 215 96 Z" fill="var(--gd-accent-dark)" />
                <path d="M 230 130 L 232 127 L 235 127 L 237 130 L 234.5 134 Z" fill="var(--gd-accent)" />
              </g>
              <g opacity="0.4">
                <path
                  d="M 130 110 Q 125 100 130 90"
                  stroke="var(--gd-accent)"
                  stroke-width="2"
                  stroke-linecap="round"
                  fill="none"
                />
                <path
                  d="M 140 105 Q 135 95 140 85"
                  stroke="var(--gd-accent)"
                  stroke-width="2"
                  stroke-linecap="round"
                  fill="none"
                />
                <path
                  d="M 150 110 Q 145 100 150 90"
                  stroke="var(--gd-accent)"
                  stroke-width="2"
                  stroke-linecap="round"
                  fill="none"
                />
              </g>
              <g transform="translate(85, 160)">
                <rect x="0" y="0" width="30" height="20" rx="4" fill="var(--gd-text)" />
                <rect x="3" y="3" width="24" height="14" rx="2" fill="var(--gd-text-secondary)" />
                <circle cx="15" cy="10" r="5" fill="var(--gd-border-soft)" />
                <text x="15" y="12" font-size="8" fill="var(--gd-text)" text-anchor="middle" font-weight="bold">%</text>
              </g>
            </svg>
          </div>

          <div class="flex flex-col items-center max-w-[280px]">
            <h1 class="text-2xl font-bold text-center mb-3" style="color: var(--gd-text)">Aproveite sua refeição</h1>
            <p class="text-base text-center leading-relaxed" style="color: var(--gd-text-secondary)">
              Pague online com segurança e ganhe cupons exclusivos
            </p>
          </div>
        </div>

        <div class="pb-12 flex flex-col items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
            <div class="w-2 h-2 rounded-full" style="background-color: var(--gd-border)"></div>
            <div class="h-2 rounded-full transition-all" style="width: 24px; background-color: var(--gd-accent)"></div>
          </div>

          <button
            type="button"
            (click)="handleStart()"
            class="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98"
            style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  `,
})
export class OnboardingScreen3Component {
  router = inject(Router);

  handleStart(): void {
    localStorage.setItem('hasSeenOnboarding', 'true');
    this.router.navigateByUrl('/login');
  }
}