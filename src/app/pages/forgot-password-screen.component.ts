import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideArrowLeft, LucideMail } from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-forgot-password-screen',
  standalone: true,
  imports: [FormsModule, LucideArrowLeft, LucideMail, GoLogoComponent],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="relative flex items-center justify-center px-6 pt-12 pb-6">
          <button
            type="button"
            (click)="router.navigateByUrl('/login')"
            class="absolute left-6 top-12 p-2 rounded-full active:bg-black/5 transition-colors"
          >
            <svg lucideArrowLeft class="w-6 h-6" [style.color]="'var(--gd-text)'"></svg>
          </button>

          <div class="flex flex-col items-center">
            <app-go-logo [size]="48" className="mb-2" />
            <h1 class="text-2xl font-bold tracking-tight" style="color: var(--gd-accent)">GoDelivery</h1>
          </div>
        </div>

        <div class="flex-1 flex flex-col px-6 pt-8 pb-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-3" style="color: var(--gd-text)">Recuperar senha</h2>
            <p class="text-sm leading-relaxed" style="color: var(--gd-text-secondary)">
              Digite seu e-mail para receber as instruções de redefinição de senha.
            </p>
          </div>

          <form (submit)="handleSubmit($event)" class="flex flex-col gap-6">
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucideMail class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                type="email"
                placeholder="E-mail"
                [(ngModel)]="email"
                name="email"
                class="w-full h-14 pl-12 pr-4 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
              />
            </div>

            <button
              type="submit"
              [disabled]="isLoading"
              class="w-full h-14 rounded-2xl font-bold text-white text-lg transition-all active:scale-98 disabled:opacity-70"
              style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            >
              {{ isLoading ? 'Enviando...' : 'Enviar instruções' }}
            </button>
            @if (message) {
              <p class="text-sm text-center mt-2" style="color: #16A34A">{{ message }}</p>
            }

            <div class="text-center mt-2">
              <span class="text-sm" style="color: var(--gd-text)">
                Lembrou sua senha?
                <button
                  type="button"
                  (click)="router.navigateByUrl('/login')"
                  class="font-bold"
                  style="color: var(--gd-accent-dark)"
                >
                  Entrar
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordScreenComponent {
  router = inject(Router);
  private firebase = inject(FirebaseService);
  email = '';
  isLoading = false;
  message = '';

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.message = '';
    if (!this.email) return;
    this.isLoading = true;
    try {
      await this.firebase.resetPassword(this.email);
      this.message = 'E-mail de redefinição enviado! Verifique sua caixa de entrada.';
      // Após alguns segundos vai para login (OTP é fluxo demo)
      setTimeout(() => this.router.navigateByUrl('/login'), 2200);
    } catch (e: any) {
      this.message = 'Erro ao enviar. Verifique o e-mail ou tente mais tarde.';
    } finally {
      this.isLoading = false;
    }
  }
}