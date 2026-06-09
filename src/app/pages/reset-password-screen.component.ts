import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideArrowLeft, LucideEye, LucideEyeOff, LucideLock } from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';
import { FirebaseService } from '../services/firebase.service';

type PasswordStrength = 'weak' | 'medium' | 'strong';

@Component({
  selector: 'app-reset-password-screen',
  standalone: true,
  imports: [FormsModule, LucideArrowLeft, LucideLock, LucideEye, LucideEyeOff, GoLogoComponent],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="relative flex items-center justify-center px-6 pt-12 pb-6">
          <button
            type="button"
            (click)="router.navigateByUrl('/forgot-password')"
            class="absolute left-6 top-12 p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
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
            <h2 class="text-2xl font-bold mb-3" style="color: var(--gd-text)">Criar nova senha</h2>
            <p class="text-sm leading-relaxed" style="color: var(--gd-text-secondary)">
              Defina uma nova senha segura para sua conta.
            </p>
          </div>

          @if (!oobCode) {
            <div class="bg-gd-surface rounded-xl p-4 border-2" style="border-color: var(--gd-border)">
              <p class="text-sm" style="color: var(--gd-text-secondary)">
                Abra o link de redefinição enviado ao seu e-mail ou conclua a verificação do código OTP.
              </p>
              <button
                type="button"
                (click)="router.navigateByUrl('/forgot-password')"
                class="mt-4 text-sm font-bold"
                style="color: var(--gd-accent)"
              >
                Solicitar novo link
              </button>
            </div>
          }

          <form (submit)="handleSubmit($event)" class="flex flex-col gap-4" [class.mt-4]="!oobCode">
            <div class="flex flex-col gap-2">
              <div class="relative">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <svg lucideLock class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                </div>
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  placeholder="Nova senha"
                  [(ngModel)]="password"
                  name="password"
                  class="w-full h-14 pl-12 pr-12 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                  style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                  required
                  minlength="8"
                  [disabled]="!oobCode || isLoading"
                />
                <button
                  type="button"
                  (click)="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  @if (showPassword) {
                    <svg lucideEyeOff class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                  } @else {
                    <svg lucideEye class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                  }
                </button>
              </div>

              @if (password.length > 0) {
                <div class="flex flex-col gap-1.5">
                  <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full transition-all duration-300 rounded-full"
                      [style.width]="getStrengthWidth()"
                      [style.background-color]="getStrengthColor()"
                    ></div>
                  </div>
                  <span class="text-xs font-medium" [style.color]="getStrengthColor()">
                    {{ getStrengthText() }}
                  </span>
                </div>
              }
            </div>

            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg lucideLock class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
              </div>
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirmar nova senha"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                class="w-full h-14 pl-12 pr-12 bg-gd-surface rounded-xl border-2 transition-all outline-none focus:border-opacity-100"
                style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                required
                minlength="8"
                [disabled]="!oobCode || isLoading"
              />
              <button
                type="button"
                (click)="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
                aria-label="Mostrar confirmar senha"
              >
                @if (showConfirmPassword) {
                  <svg lucideEyeOff class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                } @else {
                  <svg lucideEye class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
                }
              </button>
            </div>

            @if (errorMessage) {
              <p class="text-sm text-center" style="color: #DC2626">{{ errorMessage }}</p>
            }

            <button
              type="submit"
              [disabled]="!oobCode || isLoading"
              class="w-full h-14 rounded-2xl font-bold text-white text-lg mt-4 transition-all active:scale-98 disabled:opacity-60"
              style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            >
              {{ isLoading ? 'Salvando...' : 'Redefinir senha' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ResetPasswordScreenComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);

  showPassword = false;
  showConfirmPassword = false;
  password = '';
  confirmPassword = '';
  oobCode = '';
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.oobCode =
      this.route.snapshot.queryParamMap.get('oobCode') ||
      this.route.snapshot.queryParamMap.get('code') ||
      '';
  }

  get passwordStrength(): PasswordStrength {
    if (this.password.length === 0) return 'weak';

    let strength = 0;
    if (this.password.length >= 8) strength++;
    if (/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[^a-zA-Z0-9]/.test(this.password)) strength++;

    if (strength <= 1) return 'weak';
    if (strength === 2 || strength === 3) return 'medium';
    return 'strong';
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';

    if (!this.oobCode) {
      this.errorMessage = 'Link de redefinição inválido ou expirado.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres.';
      return;
    }

    this.isLoading = true;
    try {
      await this.firebase.confirmPasswordReset(this.oobCode, this.password);
      alert('Senha redefinida com sucesso!');
      this.router.navigateByUrl('/login');
    } catch {
      this.errorMessage = 'Não foi possível redefinir a senha. Solicite um novo link.';
    } finally {
      this.isLoading = false;
    }
  }

  getStrengthColor(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'strong':
        return '#10B981';
      default:
        return '#E5E7EB';
    }
  }

  getStrengthWidth(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return '33.33%';
      case 'medium':
        return '66.66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  }

  getStrengthText(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return 'Senha fraca';
      case 'medium':
        return 'Senha média';
      case 'strong':
        return 'Senha forte';
      default:
        return '';
    }
  }
}