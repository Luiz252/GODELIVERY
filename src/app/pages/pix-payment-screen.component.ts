import { DecimalPipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowLeft, LucideCheck, LucideClock, LucideCopy } from '@lucide/angular';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';
import { FirebaseService } from '../services/firebase.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-pix-payment-screen',
  standalone: true,
  imports: [DecimalPipe, LucideArrowLeft, LucideCopy, LucideCheck, LucideClock],
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
          <h1 class="text-2xl font-bold text-[var(--gd-text)]">Pagar com PIX</h1>
        </div>
        <div class="flex-1 px-6 pb-6 overflow-y-auto">
          <div class="flex justify-center mb-6">
            <div
              class="w-20 h-20 rounded-2xl flex items-center justify-center"
              style="background-color: #32bcad"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.05 2L3 6.05L7.05 10.1L9.1 8.05L7.05 6L9.1 3.95L7.05 2ZM16.95 2L14.9 3.95L16.95 6L14.9 8.05L16.95 10.1L21 6.05L16.95 2ZM7.05 13.9L3 17.95L7.05 22L9.1 19.95L7.05 17.9L9.1 15.85L7.05 13.9ZM16.95 13.9L14.9 15.85L16.95 17.9L14.9 19.95L16.95 22L21 17.95L16.95 13.9ZM12 8.5L9.5 11L12 13.5L14.5 11L12 8.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div class="text-center mb-6">
            <p class="text-sm text-[var(--gd-text-secondary)] mb-1">Valor a pagar</p>
            <p class="text-4xl font-bold text-[var(--gd-text)]">R$ {{ totalAmount | number: '1.2-2' }}</p>
          </div>
          <div class="bg-gd-surface rounded-2xl p-6 border-2 border-[var(--gd-border)] mb-4 flex justify-center">
            <div class="bg-gd-surface p-4 rounded-xl">
              <img [src]="qrCodeUrl" alt="QR Code PIX" width="220" height="220" class="block" />
            </div>
          </div>
          <p class="text-center text-sm text-[var(--gd-text)] mb-4">
            Escaneie o QR Code ou copie o código abaixo
          </p>
          <div class="bg-gd-surface rounded-2xl border-2 border-[var(--gd-border)] mb-4 overflow-hidden">
            <div class="p-4 bg-[var(--gd-bg)] border-b-2 border-[var(--gd-border)]">
              <p class="text-xs font-medium text-[var(--gd-text)] mb-2">Código PIX copia e cola</p>
              <div class="bg-gd-surface rounded-lg p-3 border border-[var(--gd-border)]">
                <p class="text-xs text-[var(--gd-text-secondary)] font-mono break-all leading-relaxed">
                  {{ pixCode }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="w-full h-14 flex items-center justify-center gap-2 bg-gd-surface active:bg-[var(--gd-bg)] transition-colors"
              (click)="copyCode()"
            >
              @if (copied) {
                <svg lucideCheck class="w-5 h-5 text-green-600"></svg>
                <span class="font-bold text-green-600">Código copiado!</span>
              } @else {
                <svg lucideCopy class="w-5 h-5 text-[var(--gd-accent)]"></svg>
                <span class="font-bold text-[var(--gd-accent)]">Copiar código PIX</span>
              }
            </button>
          </div>
          <div
            class="bg-gd-surface rounded-2xl p-4 border-2 mb-4 flex items-center justify-center gap-3"
            [style.borderColor]="isTimeWarning ? '#DC2626' : 'var(--gd-border)'"
            [style.backgroundColor]="isTimeWarning ? '#FEE2E2' : 'var(--gd-surface)'"
          >
            <svg
              lucideClock
              class="w-5 h-5"
              [style.color]="isTimeWarning ? '#DC2626' : 'var(--gd-accent)'"
            ></svg>
            <div>
              <p class="text-xs mb-0.5" [style.color]="isTimeWarning ? '#DC2626' : 'var(--gd-text-secondary)'">
                Este código expira em
              </p>
              <p
                class="text-2xl font-bold font-mono"
                [style.color]="isTimeWarning ? '#DC2626' : 'var(--gd-text)'"
              >
                {{ formatTime(timeLeft) }}
              </p>
            </div>
          </div>
          <div class="bg-[#DBEAFE] rounded-2xl p-4 border-2 border-[#BFDBFE] mb-4">
            <p class="text-sm text-[#1E40AF] text-center">
              ✓ Após o pagamento, a confirmação é automática
            </p>
          </div>
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)] mb-6">
            <h3 class="font-bold text-[var(--gd-text)] mb-3">Como pagar:</h3>
            <ol class="space-y-2 text-sm text-[var(--gd-text)]">
              <li class="flex gap-2">
                <span class="font-bold text-[var(--gd-accent)] flex-shrink-0">1.</span>
                <span>Abra o app do seu banco</span>
              </li>
              <li class="flex gap-2">
                <span class="font-bold text-[var(--gd-accent)] flex-shrink-0">2.</span>
                <span>Escolha pagar com PIX</span>
              </li>
              <li class="flex gap-2">
                <span class="font-bold text-[var(--gd-accent)] flex-shrink-0">3.</span>
                <span>Escaneie o QR Code ou cole o código</span>
              </li>
              <li class="flex gap-2">
                <span class="font-bold text-[var(--gd-accent)] flex-shrink-0">4.</span>
                <span>Confirme o pagamento</span>
              </li>
            </ol>
          </div>
          <button
            type="button"
            class="w-full h-14 bg-gd-surface text-[var(--gd-accent)] font-bold rounded-2xl border-2 border-[var(--gd-accent)] active:scale-[0.98] transition-transform"
            (click)="confirmPixPayment()"
          >
            Já fiz o pagamento
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PixPaymentScreenComponent implements OnInit, OnDestroy {
  router = inject(Router);
  private location = inject(Location);
  private cart = inject(CartService);
  private firebase = inject(FirebaseService);
  private orderService = inject(OrderService);
  private addressService = inject(AddressService);

  timeLeft = 900;
  copied = false;
  private timer?: ReturnType<typeof setInterval>;
  private copiedTimeout?: ReturnType<typeof setTimeout>;

  pixCode =
    '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540512.705802BR5925GODELIVERY RESTAURANTES6009SAO PAULO62070503***6304ABC1';

  get totalAmount(): number {
    return this.cart.total();
  }

  get qrCodeUrl(): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(this.pixCode)}`;
  }

  get isTimeWarning(): boolean {
    return this.timeLeft < 300;
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    if (this.copiedTimeout) clearTimeout(this.copiedTimeout);
  }

  goBack(): void {
    this.location.back();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.pixCode);
      this.copied = true;
      this.copiedTimeout = setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  }

  confirmPixPayment(): void {
    const user = this.firebase.currentUser();
    const cartItems = this.cart.items();
    if (user && cartItems.length > 0) {
      const firstItem = cartItems[0];
      this.orderService.createOrder({
        userId: user.uid,
        customerName: user.name,
        restaurantId: firstItem.restaurantId || '2',
        restaurantName: firstItem.restaurantName || 'Restaurante',
        restaurantImage: firstItem.image,
        items: cartItems.map((it) => ({
          id: it.id,
          name: it.name,
          price: `R$ ${it.price.toFixed(2).replace('.', ',')}`,
          priceValue: it.price,
          quantity: it.quantity,
        })),
        total: this.cart.total(),
        address: this.addressService.shortLabel(),
        paymentMethod: 'PIX',
      });
    }
    this.cart.clear();
    this.router.navigate(['/order-confirmation']);
  }
}