import { DecimalPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideClock,
  LucideCreditCard,
  LucideMapPin,
  LucidePlus,
  LucideSmartphone,
  LucideWallet,
} from '@lucide/angular';
import { CashPaymentModalComponent } from './cash-payment-modal.component';
import { AddressService } from '../services/address.service';
import { FirebaseService } from '../services/firebase.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { navigateWithReturn } from '../utils/navigation.util';

type PaymentMethod = 'credit' | 'pix' | 'cash' | null;

@Component({
  selector: 'app-checkout-screen',
  standalone: true,
  imports: [
    DecimalPipe,
    LucideArrowLeft,
    LucideMapPin,
    LucideClock,
    LucideCreditCard,
    LucideSmartphone,
    LucideWallet,
    LucidePlus,
    CashPaymentModalComponent,
  ],
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
          <h1 class="text-2xl font-bold text-[var(--gd-text)]">Finalizar Pedido</h1>
        </div>
        <div class="flex-1 px-6 pb-32 overflow-y-auto">
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)] mb-4">
            <div class="flex items-start justify-between mb-3">
              <h2 class="font-bold text-[var(--gd-text)]">Endereço de Entrega</h2>
              <button
                type="button"
                class="text-sm font-medium text-[var(--gd-accent)]"
                (click)="goToAddressSelect()"
              >
                Alterar
              </button>
            </div>
            <div class="flex items-start gap-3">
              <svg lucideMapPin class="w-5 h-5 text-[var(--gd-accent)] mt-0.5 flex-shrink-0"></svg>
              <div class="flex-1">
                @if (addressService.selectedAddress(); as address) {
                  <p class="text-sm text-[var(--gd-text)] font-medium mb-0.5">{{ address.street }}</p>
                  <p class="text-xs text-[var(--gd-text-secondary)]">{{ addressService.detailLabel() }}</p>
                } @else {
                  <p class="text-sm text-[var(--gd-text)] font-medium mb-0.5">Selecione um endereço</p>
                  <p class="text-xs text-[var(--gd-text-secondary)]">Toque em alterar para escolher</p>
                }
              </div>
            </div>
            <div class="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--gd-border)]">
              <svg lucideClock class="w-5 h-5 text-[var(--gd-accent)]"></svg>
              <span class="text-sm text-[var(--gd-text)]">
                Tempo estimado: <span class="font-bold">30-40 min</span>
              </span>
            </div>
          </div>
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)] mb-4">
            <h2 class="font-bold text-[var(--gd-text)] mb-4">Resumo do Pedido</h2>
            <div class="space-y-3">
              @for (item of cart.items(); track item.id) {
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <p class="text-sm text-[var(--gd-text)] font-medium">
                      {{ item.quantity }}x {{ item.name }}
                    </p>
                  </div>
                  <p class="text-sm font-bold text-[var(--gd-text)]">
                    R$ {{ item.price * item.quantity | number: '1.2-2' }}
                  </p>
                </div>
              }
            </div>
          </div>
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)] mb-4">
            <h2 class="font-bold text-[var(--gd-text)] mb-4">Forma de Pagamento</h2>
            <div class="space-y-3">
              <button
                type="button"
                class="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                [style.border]="
                  selectedPayment === 'credit' ? '2px solid var(--gd-accent)' : '2px solid var(--gd-border)'
                "
                [style.backgroundColor]="selectedPayment === 'credit' ? 'var(--gd-bg)' : 'transparent'"
                (click)="selectPayment('credit')"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style="background-color: var(--gd-bg)"
                >
                  <svg lucideCreditCard class="w-5 h-5 text-[var(--gd-accent)]"></svg>
                </div>
                <span class="flex-1 text-left font-medium text-[var(--gd-text)]">Cartão de crédito</span>
                <div class="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  @if (selectedPayment === 'credit') {
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
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                [style.border]="selectedPayment === 'pix' ? '2px solid var(--gd-accent)' : '2px solid var(--gd-border)'"
                [style.backgroundColor]="selectedPayment === 'pix' ? 'var(--gd-bg)' : 'transparent'"
                (click)="selectPayment('pix')"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style="background-color: var(--gd-bg)"
                >
                  <svg lucideSmartphone class="w-5 h-5 text-[var(--gd-accent)]"></svg>
                </div>
                <span class="flex-1 text-left font-medium text-[var(--gd-text)]">PIX</span>
                <div class="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  @if (selectedPayment === 'pix') {
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
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                [style.border]="selectedPayment === 'cash' ? '2px solid var(--gd-accent)' : '2px solid var(--gd-border)'"
                [style.backgroundColor]="selectedPayment === 'cash' ? 'var(--gd-bg)' : 'transparent'"
                (click)="selectPayment('cash')"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style="background-color: var(--gd-bg)"
                >
                  <svg lucideWallet class="w-5 h-5 text-[var(--gd-accent)]"></svg>
                </div>
                <span class="flex-1 text-left font-medium text-[var(--gd-text)]">Dinheiro</span>
                <div class="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  @if (selectedPayment === 'cash') {
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
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.98]"
                style="border: 2px dashed var(--gd-accent)"
                (click)="goToAddPayment()"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style="background-color: var(--gd-bg)"
                >
                  <svg lucidePlus class="w-5 h-5 text-[var(--gd-accent)]"></svg>
                </div>
                <span class="flex-1 text-left font-medium text-[var(--gd-accent)]">Adicionar cartão</span>
              </button>
            </div>
          </div>
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)]">
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-[var(--gd-text-secondary)]">Subtotal</span>
                <span class="font-medium text-[var(--gd-text)]">R$ {{ cart.subtotal() | number: '1.2-2' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-[var(--gd-text-secondary)]">Taxa de entrega</span>
                <span class="font-medium text-[var(--gd-text)]">R$ {{ cart.deliveryFee() | number: '1.2-2' }}</span>
              </div>
              @if (discount > 0) {
                <div class="flex justify-between text-sm">
                  <span class="text-[var(--gd-text-secondary)]">Desconto</span>
                  <span class="font-medium text-green-600"
                    >-R$ {{ discount | number: '1.2-2' }}</span
                  >
                </div>
              }
              <div class="h-px bg-[var(--gd-border)]"></div>
              <div class="flex justify-between">
                <span class="font-bold text-[var(--gd-text)]">Total</span>
                <span class="font-bold text-[var(--gd-accent)] text-lg"
                  >R$ {{ cart.total() | number: '1.2-2' }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="fixed bottom-0 left-0 right-0 bg-gd-surface p-6"
          style="border-top: 2px solid var(--gd-border); max-width: 448px; margin: 0 auto"
        >
          <button
            type="button"
            class="w-full h-14 bg-[var(--gd-accent)] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform text-lg"
            style="box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
            (click)="confirmOrder()"
          >
            Confirmar Pedido • R$ {{ cart.total() | number: '1.2-2' }}
          </button>
        </div>
      </div>
      <app-cash-payment-modal
        [open]="cashModalOpen"
        [totalAmount]="cart.total()"
        (openChange)="cashModalOpen = $event"
        (confirmPayment)="onCashConfirm($event)"
      />
    </div>
  `,
})
export class CheckoutScreenComponent {
  router = inject(Router);
  private location = inject(Location);
  private firebase = inject(FirebaseService);
  cart = inject(CartService);
  addressService = inject(AddressService);
  private orderService = inject(OrderService);

  selectedPayment: PaymentMethod = 'credit';
  cashModalOpen = false;
  cashDetails: { needsChange: boolean; changeFor?: number } | null = null;

  discount = 0;

  goBack(): void {
    this.router.navigateByUrl('/cart');
  }

  goToAddressSelect(): void {
    navigateWithReturn(this.router, '/address-select', 'checkout');
  }

  goToAddPayment(): void {
    navigateWithReturn(this.router, '/add-payment', 'checkout');
  }

  selectPayment(paymentId: PaymentMethod): void {
    this.selectedPayment = paymentId;
    if (paymentId === 'cash') {
      this.cashModalOpen = true;
    }
  }

  onCashConfirm(details: { needsChange: boolean; changeFor?: number }): void {
    this.cashDetails = details;
  }

  async confirmOrder(): Promise<void> {
    if (this.selectedPayment === 'pix') {
      this.router.navigate(['/pix-payment']);
      return;
    }

    await this.saveOrder();
    this.router.navigate(['/order-confirmation']);
  }

  private async saveOrder(): Promise<void> {
    const user = this.firebase.currentUser();
    const cartItems = this.cart.items();
    if (!user || cartItems.length === 0) return;

    const items = cartItems.map((it) => ({
      id: it.id,
      name: it.name,
      price: `R$ ${it.price.toFixed(2).replace('.', ',')}`,
      priceValue: it.price,
      quantity: it.quantity,
    }));

    const total = this.cart.total();
    const firstItem = cartItems[0];
    const paymentLabels: Record<string, string> = {
      credit: 'Cartão de crédito',
      pix: 'PIX',
      cash: 'Dinheiro',
    };

    this.orderService.createOrder({
      userId: user.uid,
      customerName: user.name,
      restaurantId: firstItem?.restaurantId || '2',
      restaurantName: firstItem?.restaurantName || 'Restaurante',
      restaurantImage: firstItem?.image,
      items,
      total,
      address: this.addressService.shortLabel(),
      paymentMethod: paymentLabels[this.selectedPayment ?? 'credit'] ?? 'Cartão',
    });

    try {
      await this.firebase.createOrder({
        userId: user.uid,
        restaurantId: firstItem?.restaurantId || '2',
        restaurantName: firstItem?.restaurantName || 'Restaurante',
        items,
        total,
        status: 'pending',
        address: this.addressService.shortLabel(),
      });
    } catch (e) {
      console.warn('Firebase indisponível — pedido salvo localmente.', e);
    }

    this.cart.clear();
  }
}