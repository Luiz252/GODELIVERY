import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideWallet } from '@lucide/angular';

@Component({
  selector: 'app-cash-payment-modal',
  standalone: true,
  imports: [FormsModule, DecimalPipe, LucideWallet],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-end justify-center">
        <button
          type="button"
          class="absolute inset-0 bg-black/40"
          aria-label="Fechar"
          (click)="close()"
        ></button>
        <div
          class="relative bg-gd-surface flex flex-col rounded-t-3xl w-full outline-none z-10"
          style="max-width: 448px"
        >
          <div class="flex justify-center pt-4 pb-2">
            <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          <div class="px-6 pb-8">
            <div class="flex items-center gap-3 mb-6 pt-2">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center"
                style="background-color: var(--gd-bg)"
              >
                <svg lucideWallet class="w-6 h-6 text-[var(--gd-accent)]"></svg>
              </div>
              <h2 class="text-2xl font-bold text-[var(--gd-text)]">Pagamento em Dinheiro</h2>
            </div>
            <div class="bg-[var(--gd-bg)] rounded-xl p-4 border-2 border-[var(--gd-border)] mb-6">
              <div class="flex justify-between items-center">
                <span class="text-sm text-[var(--gd-text-secondary)]">Total do pedido:</span>
                <span class="text-2xl font-bold text-[var(--gd-accent)]">
                  R$ {{ totalAmount | number: '1.2-2' }}
                </span>
              </div>
            </div>
            <p class="text-lg font-bold text-[var(--gd-text)] mb-4">Precisa de troco?</p>
            <div class="space-y-3 mb-6">
              <button
                type="button"
                class="w-full flex items-center gap-3 p-4 rounded-xl transition-all active:scale-[0.98]"
                [style.border]="!needsChange ? '2px solid var(--gd-accent)' : '2px solid var(--gd-border)'"
                [style.backgroundColor]="!needsChange ? 'var(--gd-bg)' : 'var(--gd-surface)'"
                (click)="setNoChange()"
              >
                <div class="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  @if (!needsChange) {
                    <div
                      class="w-6 h-6 rounded-full flex items-center justify-center"
                      style="background-color: var(--gd-accent)"
                    >
                      <div class="w-2 h-2 rounded-full bg-gd-surface"></div>
                    </div>
                  } @else {
                    <div class="w-6 h-6 rounded-full" style="border: 2px solid var(--gd-border)"></div>
                  }
                </div>
                <span class="flex-1 text-left font-medium text-[var(--gd-text)]">Não preciso de troco</span>
              </button>
              <button
                type="button"
                class="w-full flex items-start gap-3 p-4 rounded-xl transition-all active:scale-[0.98]"
                [style.border]="needsChange ? '2px solid var(--gd-accent)' : '2px solid var(--gd-border)'"
                [style.backgroundColor]="needsChange ? 'var(--gd-bg)' : 'var(--gd-surface)'"
                (click)="needsChange = true"
              >
                <div class="flex items-center justify-center w-6 h-6 flex-shrink-0 mt-0.5">
                  @if (needsChange) {
                    <div
                      class="w-6 h-6 rounded-full flex items-center justify-center"
                      style="background-color: var(--gd-accent)"
                    >
                      <div class="w-2 h-2 rounded-full bg-gd-surface"></div>
                    </div>
                  } @else {
                    <div class="w-6 h-6 rounded-full" style="border: 2px solid var(--gd-border)"></div>
                  }
                </div>
                <div class="flex-1 text-left">
                  <span class="font-medium text-[var(--gd-text)] block mb-3">Sim, troco para:</span>
                  @if (needsChange) {
                    <div class="relative" (click)="$event.stopPropagation()">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gd-text)] font-medium"
                        >R$</span
                      >
                      <input
                        type="text"
                        [(ngModel)]="changeForValue"
                        (ngModelChange)="onChangeForInput($event)"
                        placeholder="0,00"
                        class="w-full h-12 pl-12 pr-4 bg-gd-surface border-2 border-[var(--gd-border)] rounded-lg text-[var(--gd-text)] font-medium text-lg outline-none focus:border-[var(--gd-accent)] transition-colors"
                      />
                    </div>
                  }
                </div>
              </button>
            </div>
            @if (needsChange && changeFor > totalAmount) {
              <div class="bg-green-50 rounded-xl p-4 border-2 border-green-200 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-green-700">Seu troco será:</span>
                  <span class="text-2xl font-bold text-green-600">
                    R$ {{ changeAmount | number: '1.2-2' }}
                  </span>
                </div>
              </div>
            }
            @if (needsChange && changeForValue && changeFor <= totalAmount) {
              <div class="bg-red-50 rounded-xl p-3 border-2 border-red-200 mb-6">
                <p class="text-sm text-red-600 text-center">
                  O valor deve ser maior que R$ {{ totalAmount | number: '1.2-2' }}
                </p>
              </div>
            }
            <button
              type="button"
              class="w-full h-14 bg-[var(--gd-accent)] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
              style="box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
              (click)="confirm()"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CashPaymentModalComponent {
  @Input() open = false;
  @Input() totalAmount = 0;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() confirmPayment = new EventEmitter<{ needsChange: boolean; changeFor?: number }>();

  needsChange = false;
  changeForValue = '';

  get changeFor(): number {
    return parseFloat(this.changeForValue) || 0;
  }

  get changeAmount(): number {
    return this.changeFor - this.totalAmount;
  }

  close(): void {
    this.openChange.emit(false);
  }

  setNoChange(): void {
    this.needsChange = false;
    this.changeForValue = '';
  }

  onChangeForInput(value: string): void {
    const numbers = value.replace(/\D/g, '');
    if (numbers === '') {
      this.changeForValue = '';
      return;
    }
    const numberValue = parseInt(numbers, 10) / 100;
    this.changeForValue = numberValue.toFixed(2);
  }

  confirm(): void {
    if (this.needsChange) {
      if (this.changeFor <= this.totalAmount) {
        alert('O valor deve ser maior que o total do pedido');
        return;
      }
      this.confirmPayment.emit({ needsChange: true, changeFor: this.changeFor });
    } else {
      this.confirmPayment.emit({ needsChange: false });
    }
    this.needsChange = false;
    this.changeForValue = '';
    this.openChange.emit(false);
  }
}