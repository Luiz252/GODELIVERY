import { Location } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideMinus,
  LucidePlus,
  LucideShoppingBag,
  LucideStar,
} from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService, Product } from '../services/firebase.service';
import { CartService } from '../services/cart.service';



@Component({
  selector: 'app-product-screen',
  standalone: true,
  imports: [
    LucideArrowLeft,
    LucideStar,
    LucideMinus,
    LucidePlus,
    LucideShoppingBag,
    ImageWithFallbackComponent,
  ],
  template: `
    @if (!product()) {
      <div
        class="w-full min-h-screen flex items-center justify-center"
        style="background-color: var(--gd-bg)"
      >
        <div class="text-center">
          <p class="font-bold text-xl" style="color: var(--gd-text)">Produto não encontrado</p>
          <button
            type="button"
            (click)="goBack()"
            class="mt-4 px-6 py-2 rounded-full"
            style="background-color: var(--gd-accent); color: white"
          >
            Voltar
          </button>
        </div>
      </div>
    } @else {
      <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
        <div class="relative w-full h-80 flex-shrink-0">
          <app-image-with-fallback
            [src]="product()!.image"
            [alt]="product()!.name"
            className="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          <button
            type="button"
            (click)="goBack()"
            class="absolute top-12 left-6 w-10 h-10 rounded-full bg-gd-surface/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label="Voltar"
          >
            <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
          </button>
        </div>

        <div class="bg-gd-surface rounded-t-3xl p-6 shadow-lg -mt-6 flex-1 flex flex-col">
          <div>
            <div class="flex items-start justify-between gap-4">
              <h1 class="text-2xl font-bold flex-1" style="color: var(--gd-text)">{{ product()!.name }}</h1>
              <div class="flex items-center gap-1 flex-shrink-0">
                <svg lucideStar class="w-5 h-5" style="color: var(--gd-accent); fill: var(--gd-accent)"></svg>
                <span class="font-bold" style="color: var(--gd-text)">{{ product()!.rating }}</span>
                <span class="text-sm" style="color: var(--gd-text-secondary)">({{ product()!.reviews }})</span>
              </div>
            </div>

            <p class="text-base mt-3 leading-relaxed" style="color: var(--gd-text-secondary)">{{ product()!.description }}</p>

            <div
              class="flex items-center gap-2 mt-4 pt-4"
              style="border-top: 1px solid var(--gd-border)"
            >
              <span class="text-sm" style="color: var(--gd-text-secondary)">Categoria:</span>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                style="background-color: var(--gd-border); color: var(--gd-text)"
              >
                {{ product()!.category }}
              </span>
            </div>
          </div>

          <div class="flex-1"></div>

          <div class="space-y-4 pt-4" style="border-top: 1px solid var(--gd-border)">
            <div class="flex items-center justify-between">
              <span class="font-bold" style="color: var(--gd-text)">Quantidade</span>
              <div class="flex items-center gap-4">
                <button
                  type="button"
                  (click)="decreaseQuantity()"
                  class="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                  style="background-color: var(--gd-border)"
                  aria-label="Diminuir quantidade"
                >
                  <svg lucideMinus class="w-5 h-5" style="color: var(--gd-text)"></svg>
                </button>
                <span class="text-xl font-bold w-8 text-center" style="color: var(--gd-text)">{{ quantity }}</span>
                <button
                  type="button"
                  (click)="increaseQuantity()"
                  class="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                  style="background-color: var(--gd-accent)"
                  aria-label="Aumentar quantidade"
                >
                  <svg lucidePlus class="w-5 h-5 text-white"></svg>
                </button>
              </div>
            </div>

            <button
              type="button"
              (click)="addToCart()"
              class="w-full h-14 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-transform"
              style="background-color: var(--gd-accent); box-shadow: 0 8px 16px rgba(249, 115, 22, 0.3)"
            >
              <div class="flex items-center gap-2">
                <svg lucideShoppingBag class="w-5 h-5 text-white"></svg>
                <span class="font-bold text-white">Adicionar ao carrinho</span>
              </div>
              <span class="font-bold text-white">R$ {{ totalPrice }}</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProductScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  router = inject(Router);
  private firebase = inject(FirebaseService);
  private cart = inject(CartService);

  product = signal<Product | null>(null);
  restaurantName = '';
  quantity = 1;

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const p = await this.firebase.getProductById(id);
      this.product.set(p);
      if (p?.restaurantId) {
        const rest = await this.firebase.getRestaurantById(p.restaurantId);
        this.restaurantName = rest?.name || 'Restaurante';
      }
    }
  }

  get totalPrice(): string {
    const p = this.product();
    if (!p) return '0,00';
    return (p.priceValue * this.quantity).toFixed(2).replace('.', ',');
  }

  decreaseQuantity(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;

    this.cart.addItem({
      id: p.id,
      name: p.name,
      price: p.priceValue,
      image: p.image,
      restaurantId: p.restaurantId,
      restaurantName: this.restaurantName,
      quantity: this.quantity,
    });

    this.router.navigateByUrl('/cart');
  }

  goBack(): void {
    this.location.back();
  }
}