import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="w-full min-h-screen flex items-center justify-center"
      style="background-color: var(--gd-bg)"
    >
      <div class="text-center px-6 max-w-md">
        <div class="text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold mb-2" style="color: var(--gd-text)">Algo deu errado</h1>
        <p class="text-base mb-6" style="color: var(--gd-text-secondary)">
          {{ message || 'Ocorreu um erro inesperado' }}
        </p>
        <a
          routerLink="/"
          class="inline-block px-6 py-3 rounded-full font-bold text-white active:scale-95 transition-transform"
          style="background-color: var(--gd-accent)"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  `,
})
export class ErrorPageComponent {
  private router = inject(Router);

  @Input() message?: string;

  constructor() {
    const nav = this.router.getCurrentNavigation();
    const stateMessage = nav?.extras?.state?.['message'] as string | undefined;
    if (stateMessage) {
      this.message = stateMessage;
    }
  }
}