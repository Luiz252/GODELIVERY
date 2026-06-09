import { DecimalPipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideMapPin,
  LucideMinus,
  LucidePlus,
  LucideTag,
  LucideTrash2,
} from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';
import { navigateWithReturn } from '../utils/navigation.util';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [
    FormsModule,
    DecimalPipe,
    LucideArrowLeft,
    LucideMapPin,
    LucideMinus,
    LucidePlus,
    LucideTag,
    LucideTrash2,
    ImageWithFallbackComponent,
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
          <h1 class="text-2xl font-bold text-[var(--gd-text)]">Seu carrinho</h1>
        </div>
        <div class="px-6 py-4">
          <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)]">
            <div class="flex items-start gap-3">
              <svg lucideMapPin class="w-5 h-5 text-[var(--gd-accent)] mt-0.5 flex-shrink-0"></svg>
              <div class="flex-1">
                <p class="text-sm font-bold text-[var(--gd-text)] mb-1">Entregar em</p>
                <p class="text-sm text-[var(--gd-text-secondary)]">{{ addressService.shortLabel() }}</p>
                <button
                  type="button"
                  class="text-sm font-medium text-[var(--gd-accent)] mt-1"
                  (click)="goToAddressSelect()"
                >
                  Alterar endereço
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 px-6 pb-6 overflow-y-auto">
          @if (cart.items().length === 0) {
            <div class="flex flex-col items-center justify-center py-20">
              <div class="w-24 h-24 rounded-full bg-[var(--gd-border)] flex items-center justify-center mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M12 12H36L33 30H15L12 12Z"
                    stroke="var(--gd-accent)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="18" cy="36" r="2" fill="var(--gd-accent)" />
                  <circle cx="30" cy="36" r="2" fill="var(--gd-accent)" />
                </svg>
              </div>
              <p class="text-lg font-bold text-[var(--gd-text)] mb-2">Seu carrinho está vazio</p>
              <p class="text-sm text-[var(--gd-text-secondary)] text-center mb-6">
                Adicione itens deliciosos para continuar
              </p>
              <button
                type="button"
                class="h-12 px-8 bg-[var(--gd-accent)] text-white font-bold rounded-xl active:scale-95 transition-transform"
                (click)="router.navigate(['/home'])"
              >
                Ver restaurantes
              </button>
            </div>
          } @else {
            <div class="space-y-4">
              @for (item of cart.items(); track item.id) {
                <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)]">
                  <div class="flex gap-4">
                    <div class="w-20 h-20 rounded-xl overflow-hidden bg-[var(--gd-border)] flex-shrink-0">
                      <app-image-with-fallback
                        [src]="item.image"
                        [alt]="item.name"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-[var(--gd-text)] mb-1">{{ item.name }}</h3>
                      @if (item.extras) {
                        <p class="text-xs text-[var(--gd-text-secondary)] mb-2">{{ item.extras }}</p>
                      }
                      <p class="font-bold text-[var(--gd-accent)]">R$ {{ item.price | number: '1.2-2' }}</p>
                    </div>
                    <button
                      type="button"
                      class="p-2 h-fit rounded-lg active:bg-red-50 transition-colors"
                      aria-label="Remover item"
                      (click)="removeItem(item.id)"
                    >
                      <svg lucideTrash2 class="w-5 h-5 text-red-500"></svg>
                    </button>
                  </div>
                  <div
                    class="flex items-center justify-between mt-4 pt-4 border-t border-[var(--gd-border)]"
                  >
                    <span class="text-sm text-[var(--gd-text)]">Quantidade</span>
                    <div class="flex items-center gap-3">
                      <button
                        type="button"
                        class="w-8 h-8 rounded-lg bg-[var(--gd-border)] flex items-center justify-center active:bg-[var(--gd-border-soft)] transition-colors"
                        aria-label="Diminuir quantidade"
                        (click)="updateQuantity(item.id, -1)"
                      >
                        <svg lucideMinus class="w-4 h-4 text-[var(--gd-accent)]"></svg>
                      </button>
                      <span class="w-8 text-center font-bold text-[var(--gd-text)]">{{
                        item.quantity
                      }}</span>
                      <button
                        type="button"
                        class="w-8 h-8 rounded-lg bg-[var(--gd-accent)] flex items-center justify-center active:bg-[var(--gd-accent-dark)] transition-colors"
                        aria-label="Aumentar quantidade"
                        (click)="updateQuantity(item.id, 1)"
                      >
                        <svg lucidePlus class="w-4 h-4 text-white"></svg>
                      </button>
                    </div>
                  </div>
                </div>
              }
              <div class="bg-gd-surface rounded-2xl p-4 border-2 border-[var(--gd-border)]">
                <div class="flex items-center gap-3">
                  <svg lucideTag class="w-5 h-5 text-[var(--gd-accent)] flex-shrink-0"></svg>
                  <input
                    type="text"
                    [(ngModel)]="couponCode"
                    placeholder="Cupom de desconto"
                    class="flex-1 bg-transparent outline-none text-[var(--gd-text)] placeholder-[var(--gd-border-soft)] text-sm"
                  />
                  <button type="button" class="text-sm font-bold text-[var(--gd-accent)]">Aplicar</button>
                </div>
              </div>
            </div>
          }
        </div>
        @if (cart.items().length > 0) {
          <div class="bg-gd-surface border-t-2 border-[var(--gd-border)] px-6 py-6">
            <div class="space-y-3 mb-4">
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
            <button
              type="button"
              class="w-full h-14 bg-[var(--gd-accent)] text-white font-bold rounded-2xl active:scale-[0.98] transition-transform"
              style="box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
              (click)="goToAddressSelect()"
            >
              Finalizar pedido
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class CartScreenComponent {
  router = inject(Router);
  private location = inject(Location);
  cart = inject(CartService);
  addressService = inject(AddressService);

  couponCode = '';
  discount = 0;

  goBack(): void {
    this.location.back();
  }

  goToAddressSelect(): void {
    navigateWithReturn(this.router, '/address-select', 'cart');
  }

  updateQuantity(id: string, delta: number): void {
    this.cart.updateQuantity(id, delta);
  }

  removeItem(id: string): void {
    this.cart.removeItem(id);
  }
}