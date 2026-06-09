import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideCheckCircle2, LucideClock, LucideMapPin, LucidePackage } from '@lucide/angular';

@Component({
  selector: 'app-order-confirmation-screen',
  standalone: true,
  imports: [LucideCheckCircle2, LucidePackage, LucideMapPin, LucideClock],
  template: `
    <div class="w-full min-h-screen bg-[var(--gd-bg)] flex flex-col">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div
            class="transition-all duration-500"
            [class.scale-100]="showAnimation"
            [class.opacity-100]="showAnimation"
            [class.scale-50]="!showAnimation"
            [class.opacity-0]="!showAnimation"
          >
            <div
              class="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style="background-color: var(--gd-bg); box-shadow: 0 4px 20px rgba(249, 115, 22, 0.15)"
            >
              <svg lucideCheckCircle2 class="w-14 h-14 text-[var(--gd-accent)]" [strokeWidth]="2.5"></svg>
            </div>
          </div>
          <h1 class="text-2xl font-bold text-[var(--gd-text)] mb-2 text-center">Pedido Confirmado!</h1>
          <p class="text-sm text-[var(--gd-text-secondary)] text-center mb-8">Seu pedido foi realizado com sucesso</p>
          <div class="w-full bg-gd-surface rounded-2xl p-6 border-2 border-[var(--gd-border)] mb-6">
            <div class="text-center">
              <p class="text-xs text-[var(--gd-text-secondary)] mb-2">Número do pedido</p>
              <p class="text-3xl font-bold text-[var(--gd-accent)]">#{{ orderNumber }}</p>
            </div>
          </div>
          <div class="w-full bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)] mb-6 space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style="background-color: var(--gd-bg)"
              >
                <svg lucidePackage class="w-5 h-5 text-[var(--gd-accent)]"></svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-[var(--gd-text)]">Status</p>
                <p class="text-xs text-[var(--gd-text-secondary)]">Preparando pedido</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style="background-color: var(--gd-bg)"
              >
                <svg lucideMapPin class="w-5 h-5 text-[var(--gd-accent)]"></svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-[var(--gd-text)]">Entregar em</p>
                <p class="text-xs text-[var(--gd-text-secondary)]">Rua das Flores, 123 - Jardim Primavera</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style="background-color: var(--gd-bg)"
              >
                <svg lucideClock class="w-5 h-5 text-[var(--gd-accent)]"></svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-[var(--gd-text)]">Tempo estimado</p>
                <p class="text-xs text-[var(--gd-text-secondary)]">30-40 minutos</p>
              </div>
            </div>
          </div>
          <p class="text-xs text-center text-[var(--gd-text-secondary)] mb-8 px-4">
            Você pode acompanhar o status do seu pedido na tela de Pedidos
          </p>
        </div>
        <div class="px-6 pb-6 space-y-3">
          <button
            type="button"
            class="w-full h-14 bg-[var(--gd-accent)] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
            style="box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            (click)="router.navigate(['/home'])"
          >
            Ir para Home
          </button>
          <button
            type="button"
            class="w-full h-14 bg-transparent border-2 border-[var(--gd-accent)] text-[var(--gd-accent)] font-bold rounded-2xl active:scale-[0.98] transition-transform"
            (click)="router.navigate(['/orders'])"
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    </div>
  `,
})
export class OrderConfirmationScreenComponent implements OnInit {
  router = inject(Router);

  orderNumber = Math.floor(100000 + Math.random() * 900000);
  showAnimation = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.showAnimation = true;
    }, 100);
  }
}