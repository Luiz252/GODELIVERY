import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideEye,
  LucideEyeOff,
  LucideLock,
  LucideMail,
  LucidePhone,
  LucideUser,
} from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-signup-screen',
  standalone: true,
  imports: [
    FormsModule,
    LucideArrowLeft,
    LucideUser,
    LucideMail,
    LucidePhone,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    GoLogoComponent,
  ],
  template: `
    <div class="w-full min-h-screen overflow-y-auto" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto">
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

        <div class="flex flex-col px-6 pb-8">
          <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold mb-2" style="color: var(--gd-text)">Criar sua conta</h2>
            <p class="text-sm" style="color: var(--gd-text); opacity: 0.6">Preencha seus dados para começar</p>
          </div>

          <form (submit)="handleSubmit($event)" class="flex flex-col gap-4">
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucideUser class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                type="text"
                placeholder="Nome completo"
                [(ngModel)]="name"
                name="name"
                class="w-full h-14 pl-12 pr-4 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
              />
            </div>

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

            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucidePhone class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                [ngModel]="phone"
                (ngModelChange)="handlePhoneChange($event)"
                name="phone"
                class="w-full h-14 pl-12 pr-4 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
              />
            </div>

            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucideLock class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                [type]="showPassword ? 'text' : 'password'"
                placeholder="Senha"
                [(ngModel)]="password"
                name="password"
                class="w-full h-14 pl-12 pr-12 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
              />
              <button
                type="button"
                (click)="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
              >
                @if (showPassword) {
                  <svg lucideEyeOff class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                } @else {
                  <svg lucideEye class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                }
              </button>
            </div>

            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucideLock class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirmar senha"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                class="w-full h-14 pl-12 pr-12 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
              />
              <button
                type="button"
                (click)="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
              >
                @if (showConfirmPassword) {
                  <svg lucideEyeOff class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                } @else {
                  <svg lucideEye class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                }
              </button>
            </div>

            <div class="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                [(ngModel)]="acceptTerms"
                name="acceptTerms"
                class="w-5 h-5 mt-0.5 rounded border-2 cursor-pointer accent-orange-500"
                style="border-color: var(--gd-border)"
                required
              />
              <label for="terms" class="text-sm cursor-pointer" style="color: var(--gd-text)">
                Aceito os
                <span class="font-medium" style="color: var(--gd-accent-dark)"> Termos de Uso </span>
                e
                <span class="font-medium" style="color: var(--gd-accent-dark)"> Política de Privacidade </span>
              </label>
            </div>

            <button
              type="submit"
              [disabled]="isLoading || !acceptTerms"
              class="w-full h-14 rounded-2xl font-bold text-white text-lg mt-4 transition-all active:scale-98 disabled:opacity-70"
              style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            >
              {{ isLoading ? 'Criando conta...' : 'Criar conta' }}
            </button>

            @if (errorMessage) {
              <p class="text-sm text-center mt-2" style="color: #EF4444">{{ errorMessage }}</p>
            }

            <div class="text-center mt-4 mb-4">
              <span class="text-sm" style="color: var(--gd-text)">
                Já tem uma conta?
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
export class SignupScreenComponent {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  showPassword = false;
  showConfirmPassword = false;
  acceptTerms = false;
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }
    if (!this.acceptTerms) {
      this.errorMessage = 'Você precisa aceitar os termos.';
      return;
    }

    this.isLoading = true;
    try {
      await this.firebase.signup(this.email, this.password, this.name, this.phone);
      // Após criar conta, vamos para home (pode integrar OTP real depois)
      this.router.navigateByUrl('/home');
    } catch (err: any) {
      console.error('Signup error:', err);
      const code = err?.code || '';
      if (code.includes('auth/email-already-in-use')) {
        this.errorMessage = 'Este e-mail já está em uso.';
      } else if (code.includes('auth/weak-password')) {
        this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else {
        this.errorMessage = 'Erro ao criar conta. Tente novamente.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  handlePhoneChange(value: string): void {
    let digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      if (digits.length > 6) {
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      } else if (digits.length > 2) {
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length > 0) {
        digits = `(${digits}`;
      }
      this.phone = digits;
    }
  }
}