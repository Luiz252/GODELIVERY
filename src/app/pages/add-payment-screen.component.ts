import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideArrowLeft, LucideCreditCard, LucideLock } from '@lucide/angular';
import { ReturnRoute, getReturnPath, parseReturnRoute } from '../utils/navigation.util';

type CardBrand = 'visa' | 'mastercard' | 'elo' | 'amex' | 'unknown';

@Component({
  selector: 'app-add-payment-screen',
  standalone: true,
  imports: [FormsModule, LucideArrowLeft, LucideCreditCard, LucideLock],
  template: `
    <div class="w-full min-h-screen bg-[var(--gd-bg)] flex flex-col">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="flex items-center gap-4 px-6 pt-12 pb-4 bg-[var(--gd-bg)]">
          <button
            type="button"
            class="p-2 rounded-full active:bg-black/5 transition-colors"
            aria-label="Voltar"
            (click)="goBack()"
          >
            <svg lucideArrowLeft class="w-6 h-6 text-[var(--gd-text)]"></svg>
          </button>
          <h1 class="text-2xl font-bold text-[var(--gd-text)]">{{ pageTitle }}</h1>
        </div>
        <div class="flex-1 px-6 pb-32 overflow-y-auto">
          <div class="mb-6">
            <div
              class="w-full h-48 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
              "
            >
              <div class="flex items-start justify-between">
                <div
                  class="w-12 h-10 rounded-lg"
                  style="
                    background: linear-gradient(135deg, #ffd89b 0%, #ffb347 100%);
                    opacity: 0.9;
                  "
                ></div>
                @if (cardBrand === 'visa') {
                  <div class="text-white font-bold text-2xl">VISA</div>
                }
                @if (cardBrand === 'mastercard') {
                  <div class="flex gap-1">
                    <div class="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
                    <div class="w-8 h-8 rounded-full bg-yellow-500 opacity-80 -ml-4"></div>
                  </div>
                }
              </div>
              <div>
                <p class="text-white text-xl font-mono tracking-wider mb-4">
                  {{ cardNumber || '•••• •••• •••• ••••' }}
                </p>
                <div class="flex justify-between items-end">
                  <div>
                    <p class="text-white/60 text-xs mb-1">Nome no cartão</p>
                    <p class="text-white text-sm font-medium">
                      {{ cardName || 'SEU NOME AQUI' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-white/60 text-xs mb-1">Validade</p>
                    <p class="text-white text-sm font-medium">{{ expiryDate || 'MM/AA' }}</p>
                  </div>
                </div>
              </div>
              <div
                class="absolute top-0 right-0 w-32 h-32 rounded-full"
                style="background: rgba(255, 255, 255, 0.1); transform: translate(50%, -50%)"
              ></div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-[var(--gd-text)] mb-2">Número do cartão</label>
              <div class="relative">
                <input
                  type="text"
                  [(ngModel)]="cardNumber"
                  (ngModelChange)="onCardNumberChange($event)"
                  placeholder="1234 5678 9012 3456"
                  class="w-full h-14 px-4 bg-gd-surface border-2 border-[var(--gd-border)] rounded-xl text-[var(--gd-text)] font-mono text-lg outline-none focus:border-[var(--gd-accent)] transition-colors"
                />
                <svg
                  lucideCreditCard
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gd-text-secondary)]"
                ></svg>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[var(--gd-text)] mb-2">Nome no cartão</label>
              <input
                type="text"
                [(ngModel)]="cardName"
                (ngModelChange)="onCardNameChange($event)"
                placeholder="COMO ESTÁ NO CARTÃO"
                class="w-full h-14 px-4 bg-gd-surface border-2 border-[var(--gd-border)] rounded-xl text-[var(--gd-text)] uppercase outline-none focus:border-[var(--gd-accent)] transition-colors"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[var(--gd-text)] mb-2">Validade</label>
                <input
                  type="text"
                  [(ngModel)]="expiryDate"
                  (ngModelChange)="onExpiryChange($event)"
                  placeholder="MM/AA"
                  class="w-full h-14 px-4 bg-gd-surface border-2 border-[var(--gd-border)] rounded-xl text-[var(--gd-text)] font-mono text-lg outline-none focus:border-[var(--gd-accent)] transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--gd-text)] mb-2">CVV</label>
                <input
                  type="text"
                  [(ngModel)]="cvv"
                  (ngModelChange)="onCvvChange($event)"
                  placeholder="123"
                  class="w-full h-14 px-4 bg-gd-surface border-2 border-[var(--gd-border)] rounded-xl text-[var(--gd-text)] font-mono text-lg outline-none focus:border-[var(--gd-accent)] transition-colors"
                />
              </div>
            </div>
            <div class="flex items-center gap-3 pt-2">
              <button
                type="button"
                class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors"
                [style.borderColor]="saveAsMain ? 'var(--gd-accent)' : 'var(--gd-border)'"
                [style.backgroundColor]="saveAsMain ? 'var(--gd-accent)' : 'transparent'"
                (click)="saveAsMain = !saveAsMain"
              >
                @if (saveAsMain) {
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              </button>
              <span class="text-sm text-[var(--gd-text)]">Salvar como cartão principal</span>
            </div>
          </div>
          <div class="mt-6">
            <p class="text-xs text-[var(--gd-text-secondary)] mb-3 text-center">Bandeiras aceitas</p>
            <div class="flex items-center justify-center gap-4">
              <div
                class="w-12 h-8 bg-gd-surface rounded border border-[var(--gd-border)] flex items-center justify-center"
              >
                <span class="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div
                class="w-12 h-8 bg-gd-surface rounded border border-[var(--gd-border)] flex items-center justify-center"
              >
                <div class="flex gap-0.5">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500 -ml-1.5"></div>
                </div>
              </div>
              <div
                class="w-12 h-8 bg-gd-surface rounded border border-[var(--gd-border)] flex items-center justify-center"
              >
                <span class="text-xs font-bold text-gray-700">ELO</span>
              </div>
              <div
                class="w-12 h-8 bg-gd-surface rounded border border-[var(--gd-border)] flex items-center justify-center"
              >
                <span class="text-xs font-bold text-blue-500">AMEX</span>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-center gap-2 mt-6 bg-gd-surface rounded-xl p-3 border border-[var(--gd-border)]"
          >
            <svg lucideLock class="w-4 h-4 text-[var(--gd-accent)]"></svg>
            <p class="text-xs text-[var(--gd-text)]">Seus dados estão protegidos</p>
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 bg-gd-surface p-6"
          style="border-top: 2px solid var(--gd-border); max-width: 448px; margin: 0 auto"
        >
          <button
            type="button"
            class="w-full h-14 bg-[var(--gd-accent)] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
            style="box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            (click)="submit()"
          >
            Adicionar Cartão
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AddPaymentScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  returnTo: ReturnRoute = 'checkout';
  cardNumber = '';
  cardName = '';
  expiryDate = '';
  cvv = '';
  saveAsMain = false;

  ngOnInit(): void {
    this.returnTo = parseReturnRoute(this.route, 'checkout');
  }

  get pageTitle(): string {
    return this.returnTo === 'profile' ? 'Formas de pagamento' : 'Adicionar Cartão';
  }

  get cardBrand(): CardBrand {
    const cleanNumber = this.cardNumber.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    if (cleanNumber.startsWith('636')) return 'elo';
    return 'unknown';
  }

  goBack(): void {
    this.router.navigateByUrl(getReturnPath(this.returnTo));
  }

  onCardNumberChange(value: string): void {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    const groups = limited.match(/.{1,4}/g) || [];
    this.cardNumber = groups.join(' ');
  }

  onCardNameChange(value: string): void {
    this.cardName = value.toUpperCase();
  }

  onExpiryChange(value: string): void {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 4);
    if (limited.length >= 2) {
      this.expiryDate = `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else {
      this.expiryDate = limited;
    }
  }

  onCvvChange(value: string): void {
    this.cvv = value.replace(/\D/g, '').slice(0, 3);
  }

  submit(): void {
    if (!this.cardNumber || !this.cardName || !this.expiryDate || !this.cvv) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    this.goBack();
  }
}