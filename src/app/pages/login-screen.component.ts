import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideEye, LucideEyeOff, LucideLock, LucideMail } from '@lucide/angular';
import { GoLogoComponent } from '../shared/go-logo.component';
import { UserRole } from '../services/order.service';
import { FirebaseService } from '../services/firebase.service';
import { getRouteForRole } from '../utils/order-status.util';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [FormsModule, LucideMail, LucideLock, LucideEye, LucideEyeOff, GoLogoComponent],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex-1 flex flex-col px-6 pt-16 pb-8">
        <div class="flex flex-col items-center mb-12">
          <app-go-logo [size]="56" className="mb-3" />
          <h1 class="text-3xl font-bold tracking-tight" style="color: var(--gd-accent)">GoDelivery</h1>
        </div>

        <div class="mb-6 text-center">
          <h2 class="text-2xl font-bold mb-2" style="color: var(--gd-text)">Bem-vindo de volta</h2>
          <p class="text-base" style="color: var(--gd-text); opacity: 0.6">Escolha seu perfil e entre</p>
        </div>

        <div class="grid grid-cols-2 gap-2 mb-6">
          @for (role of roles; track role.id) {
            <button
              type="button"
              class="py-3 px-2 rounded-xl text-sm font-bold transition-all active:scale-95"
              [style.backgroundColor]="selectedRole === role.id ? 'var(--gd-accent)' : 'var(--gd-surface)'"
              [style.color]="selectedRole === role.id ? 'white' : 'var(--gd-text)'"
              [style.border]="selectedRole === role.id ? 'none' : '2px solid var(--gd-border)'"
              (click)="selectRole(role.id)"
            >
              {{ role.label }}
            </button>
          }
        </div>

        <form (submit)="handleSubmit($event)" class="flex flex-col gap-4 mb-6">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <svg lucideMail class="w-5 h-5" [style.color]="'var(--gd-accent)'"></svg>
            </div>
            <input
              type="text"
              placeholder="Usuário ou e-mail"
              [(ngModel)]="email"
              name="email"
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

          <div class="flex justify-end">
            <button
              type="button"
              (click)="router.navigateByUrl('/forgot-password')"
              class="text-sm font-medium"
              style="color: var(--gd-accent-dark)"
            >
              Esqueci minha senha?
            </button>
          </div>

          <button
            type="submit"
            [disabled]="isLoading"
            class="w-full h-14 rounded-2xl font-bold text-white text-lg mt-2 transition-all active:scale-98 disabled:opacity-70"
            style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
          >
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>

          <button
            type="button"
            (click)="router.navigateByUrl('/signup')"
            class="w-full h-14 rounded-2xl font-bold text-lg border-2 transition-all active:scale-98"
            style="border-color: var(--gd-accent); color: var(--gd-accent); background-color: transparent"
          >
            Criar conta
          </button>

          @if (errorMessage) {
            <p class="text-sm text-center mt-2" style="color: #EF4444">{{ errorMessage }}</p>
          }

          <p class="text-xs text-center mt-2" style="color: var(--gd-text); opacity: 0.5">
            Teste: <strong>{{ roleHint.user }}</strong> / <strong>{{ roleHint.pass }}</strong>
          </p>
        </form>

        <div class="flex-1 flex items-end justify-center pb-4">
          <p class="text-xs text-center" style="color: var(--gd-text); opacity: 0.5">
            Ao continuar, você concorda com nossos Termos
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginScreenComponent implements OnInit {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  roles: { id: UserRole; label: string; user: string; pass: string }[] = [
    { id: 'customer', label: 'Cliente', user: 'cliente', pass: 'cliente' },
    { id: 'kitchen', label: 'Cozinha', user: 'cozinha', pass: 'cozinha' },
    { id: 'delivery', label: 'Motoboy', user: 'motoboy', pass: 'motoboy' },
    { id: 'owner', label: 'Dono', user: 'dono', pass: 'dono' },
  ];

  selectedRole: UserRole = 'customer';

  showPassword = false;
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  get roleHint() {
    return this.roles.find((r) => r.id === this.selectedRole) ?? this.roles[0];
  }

  ngOnInit(): void {
    this.selectRole('customer');
  }

  selectRole(role: UserRole): void {
    this.selectedRole = role;
    const hint = this.roles.find((r) => r.id === role);
    if (hint) {
      this.email = hint.user;
      this.password = hint.pass;
    }
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;

    try {
      const user = await this.firebase.login(this.email, this.password);
      this.router.navigateByUrl(getRouteForRole(user.role));
    } catch (err: any) {
      console.error('Login error:', err);
      const msg = err?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      this.errorMessage = msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')
        ? 'E-mail ou senha incorretos.'
        : 'Erro ao fazer login. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }
}