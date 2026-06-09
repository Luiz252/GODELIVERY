import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideBike,
  LucideClock,
  LucideHeart,
  LucidePlus,
  LucideShoppingBag,
  LucideStar,
} from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService, Restaurant, Product } from '../services/firebase.service';
import { CartService } from '../services/cart.service';

interface RestaurantReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS_BY_RESTAURANT: Record<string, RestaurantReview[]> = {
  '1': [
    { id: 'r1', author: 'Marina S.', rating: 5, date: 'Há 2 dias', comment: 'Sashimi impecável e entrega rápida. Voltarei com certeza!' },
    { id: 'r2', author: 'Pedro L.', rating: 4, date: 'Há 1 semana', comment: 'Combo 30 peças vale muito a pena. Wasabi bem fresquinho.' },
    { id: 'r3', author: 'Ana C.', rating: 5, date: 'Há 2 semanas', comment: 'Melhor sushi da região. Embalagem mantém tudo gelado.' },
  ],
  '2': [
    { id: 'r4', author: 'João M.', rating: 5, date: 'Há 3 dias', comment: 'Pizza margherita perfeita, massa fina e crocante.' },
    { id: 'r5', author: 'Carla R.', rating: 4, date: 'Há 5 dias', comment: 'Lasanha bolonhesa generosa. Entrega dentro do prazo.' },
    { id: 'r6', author: 'Lucas F.', rating: 5, date: 'Há 1 semana', comment: 'Tiramisù incrível! Restaurante sempre consistente.' },
  ],
  '3': [
    { id: 'r7', author: 'Beatriz A.', rating: 5, date: 'Há 1 dia', comment: 'Tacos autênticos e bem temperados. Adorei o molho picante.' },
    { id: 'r8', author: 'Rafael T.', rating: 4, date: 'Há 4 dias', comment: 'Porção boa e preço justo. Burrito também é excelente.' },
  ],
  '4': [
    { id: 'r9', author: 'Fernanda P.', rating: 5, date: 'Há 2 dias', comment: 'Bowl de quinoa fresquinho e muito saboroso.' },
    { id: 'r10', author: 'Diego H.', rating: 5, date: 'Há 1 semana', comment: 'Opções saudáveis de verdade. Entrega grátis é um plus.' },
  ],
};

const DEFAULT_REVIEWS: RestaurantReview[] = [
  { id: 'd1', author: 'Cliente verificado', rating: 5, date: 'Há 3 dias', comment: 'Comida deliciosa e entrega no horário. Recomendo!' },
  { id: 'd2', author: 'Maria O.', rating: 4, date: 'Há 1 semana', comment: 'Boa experiência geral, embalagem caprichada.' },
];

@Component({
  selector: 'app-restaurant-screen',
  standalone: true,
  imports: [
    LucideArrowLeft,
    LucideHeart,
    LucideStar,
    LucideClock,
    LucideBike,
    LucidePlus,
    LucideShoppingBag,
    ImageWithFallbackComponent,
  ],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="relative w-full h-48 flex-shrink-0">
        <app-image-with-fallback
          [src]="currentRestaurant.image"
          [alt]="currentRestaurant.name"
          className="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <button
          type="button"
          (click)="router.navigateByUrl('/home')"
          class="absolute top-12 left-6 w-10 h-10 rounded-full bg-gd-surface/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Voltar"
        >
          <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
        </button>

        <button
          type="button"
          (click)="toggleFavorite(); $event.stopPropagation()"
          class="absolute top-12 right-6 w-10 h-10 rounded-full bg-gd-surface/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Favoritar"
        >
          <svg
            lucideHeart
            class="w-5 h-5"
            [style.color]="isFavorite ? 'var(--gd-accent)' : 'var(--gd-text)'"
            [style.fill]="isFavorite ? 'var(--gd-accent)' : 'none'"
          ></svg>
        </button>
      </div>

      <div class="bg-gd-surface rounded-t-3xl p-6 shadow-lg -mt-6 flex-1 flex flex-col">
        <div class="flex gap-4 items-start">
          <div
            class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
            style="border: 2px solid var(--gd-border)"
          >
            <app-image-with-fallback
              [src]="currentRestaurant.image"
              [alt]="currentRestaurant.name + ' logo'"
              className="w-full h-full object-cover"
            />
          </div>

          <div class="flex-1 min-w-0">
            <h1 class="text-xl font-bold" style="color: var(--gd-text)">{{ currentRestaurant.name }}</h1>
            <p class="text-sm mt-1" style="color: var(--gd-text-secondary)">{{ (currentRestaurant.categories || []).join(' • ') || 'Restaurante' }}</p>
            <div class="flex items-center gap-1.5 mt-2">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <span class="text-sm font-medium" style="color: #22C55E">Aberto agora</span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between mt-4 py-4"
          style="border-top: 1px solid var(--gd-border); border-bottom: 1px solid var(--gd-border)"
        >
          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-1">
              <svg lucideStar class="w-5 h-5" style="color: var(--gd-accent); fill: var(--gd-accent)"></svg>
              <span class="font-bold" style="color: var(--gd-text)">{{ currentRestaurant.rating || 4.5 }}</span>
            </div>
            <span class="text-xs" style="color: var(--gd-text-secondary)">(234)</span>
          </div>

          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-1">
              <svg lucideClock class="w-5 h-5" style="color: var(--gd-text-secondary)"></svg>
              <span class="font-bold" style="color: var(--gd-text)">{{ (currentRestaurant.deliveryTime || '30-40').replace(' min','') }}</span>
            </div>
            <span class="text-xs" style="color: var(--gd-text-secondary)">min</span>
          </div>

          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center gap-1">
              <svg lucideBike class="w-5 h-5" style="color: #22C55E"></svg>
              <span class="font-bold" style="color: #22C55E">{{ currentRestaurant.deliveryFee || 'R$ 5' }}</span>
            </div>
            <span class="text-xs" style="color: var(--gd-text-secondary)">entrega</span>
          </div>
        </div>

        <div class="flex mt-4">
          @for (tab of tabs; track tab.key) {
            <button
              type="button"
              (click)="activeTab = tab.key"
              class="flex-1 py-3 text-center font-medium transition-colors"
              [style.color]="activeTab === tab.key ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
              [style.border-bottom]="'2px solid ' + (activeTab === tab.key ? 'var(--gd-accent)' : 'transparent')"
            >
              {{ tab.label }}
            </button>
          }
        </div>

        @if (activeTab === 'menu') {
          <div
            class="flex gap-2 overflow-x-auto px-6 py-3 -mx-6 no-scrollbar"
            style="scrollbar-width: none; -ms-overflow-style: none"
          >
            @for (cat of categoryList; track cat) {
              <button
                type="button"
                (click)="activeCategory = cat"
                class="flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors"
                [style]="
                  activeCategory === cat
                    ? { backgroundColor: 'var(--gd-accent)', color: 'var(--gd-on-accent)' }
                    : {
                        backgroundColor: 'var(--gd-surface)',
                        border: '1px solid var(--gd-border)',
                        color: 'var(--gd-text)',
                      }
                "
              >
                {{ cat }}
              </button>
            }
          </div>

          <div
            class="flex-1 overflow-y-auto -mx-6 px-6 pb-24"
            style="scrollbar-width: none; -ms-overflow-style: none"
          >
            @for (product of filteredProducts; track product.id) {
              <div class="flex gap-4 py-4" style="border-bottom: 1px solid var(--gd-border)">
                <div class="flex-1 min-w-0">
                  <p class="text-base font-bold" style="color: var(--gd-text)">{{ product.name }}</p>
                  <p class="text-sm mt-1 line-clamp-2" style="color: var(--gd-text-secondary)">{{ product.description }}</p>
                  <p class="text-base font-bold mt-2" style="color: var(--gd-accent)">{{ product.price }}</p>
                </div>

                <div class="relative flex-shrink-0">
                  <div class="w-24 h-24 rounded-xl overflow-hidden">
                    <app-image-with-fallback
                      [src]="product.image"
                      [alt]="product.name"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    (click)="router.navigateByUrl('/product/' + product.id)"
                    class="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                    style="background-color: var(--gd-accent)"
                    [attr.aria-label]="'Adicionar ' + product.name"
                  >
                    <svg lucidePlus class="w-4 h-4 text-white"></svg>
                  </button>
                </div>
              </div>
            }
          </div>
        }

        @if (activeTab === 'reviews') {
          <div class="flex-1 overflow-y-auto pb-24 space-y-4">
            <div class="flex items-center gap-4 py-2">
              <div class="text-center">
                <p class="text-3xl font-bold" style="color: var(--gd-text)">{{ currentRestaurant.rating || 4.5 }}</p>
                <div class="flex items-center gap-0.5 mt-1">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <svg
                      lucideStar
                      class="w-4 h-4"
                      [style.color]="star <= Math.round(currentRestaurant.rating || 4.5) ? 'var(--gd-accent)' : 'var(--gd-border)'"
                      [style.fill]="star <= Math.round(currentRestaurant.rating || 4.5) ? 'var(--gd-accent)' : 'none'"
                    ></svg>
                  }
                </div>
                <p class="text-xs mt-1" style="color: var(--gd-text-secondary)">{{ reviews.length }} avaliações</p>
              </div>
            </div>

            @for (review of reviews; track review.id) {
              <div class="py-4" style="border-bottom: 1px solid var(--gd-border)">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="font-bold text-sm" style="color: var(--gd-text)">{{ review.author }}</p>
                    <p class="text-xs" style="color: var(--gd-text-secondary)">{{ review.date }}</p>
                  </div>
                  <div class="flex items-center gap-0.5">
                    @for (star of [1, 2, 3, 4, 5]; track star) {
                      <svg
                        lucideStar
                        class="w-3.5 h-3.5"
                        [style.color]="star <= review.rating ? 'var(--gd-accent)' : 'var(--gd-border)'"
                        [style.fill]="star <= review.rating ? 'var(--gd-accent)' : 'none'"
                      ></svg>
                    }
                  </div>
                </div>
                <p class="text-sm mt-2 leading-relaxed" style="color: var(--gd-text-secondary)">{{ review.comment }}</p>
              </div>
            }
          </div>
        }

        @if (activeTab === 'about') {
          <div class="flex-1 overflow-y-auto space-y-4 pb-24">
            <div>
              <p class="font-bold text-sm mb-1" style="color: var(--gd-text)">Sobre o restaurante</p>
              <p class="text-sm leading-relaxed" style="color: var(--gd-text-secondary)">
                {{ currentRestaurant.description || 'Restaurante com ótimas opções de delivery.' }}
              </p>
            </div>
            <div>
              <p class="font-bold text-sm mb-1" style="color: var(--gd-text)">Horário de funcionamento</p>
              <p class="text-sm" style="color: var(--gd-text-secondary)">Segunda a sexta: 11h – 23h</p>
              <p class="text-sm" style="color: var(--gd-text-secondary)">Sábado e domingo: 11h – 00h</p>
            </div>
            <div>
              <p class="font-bold text-sm mb-1" style="color: var(--gd-text)">Endereço</p>
              <p class="text-sm" style="color: var(--gd-text-secondary)">
                {{ currentRestaurant.address || 'Endereço não informado' }}
              </p>
            </div>
          </div>
        }
      </div>

      @if (cartItemCount > 0) {
        <button
          type="button"
          (click)="router.navigateByUrl('/cart')"
          class="fixed bottom-6 left-6 right-6 h-14 rounded-2xl flex items-center justify-between px-6 active:scale-[0.98] transition-transform max-w-md mx-auto"
          style="background-color: var(--gd-accent); box-shadow: 0 8px 16px rgba(249, 115, 22, 0.3)"
        >
          <div class="flex items-center gap-2">
            <svg lucideShoppingBag class="w-5 h-5 text-white"></svg>
            <span class="font-bold text-white">Ver carrinho</span>
            <span class="text-sm text-white/80">({{ cartItemCount }})</span>
          </div>
          <span class="font-bold text-white">R$ {{ cartSubtotal }}</span>
        </button>
      }
    </div>
  `,
})
export class RestaurantScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private firebase = inject(FirebaseService);
  cart = inject(CartService);
  Math = Math;

  restaurantId = '';
  restaurant = signal<Restaurant | null>(null);
  allProducts = signal<Product[]>([]);
  isFavorite = false;
  activeTab: 'menu' | 'reviews' | 'about' = 'menu';
  activeCategory = 'Populares';
  reviews: RestaurantReview[] = [];

  tabs = [
    { key: 'menu' as const, label: 'Cardápio' },
    { key: 'reviews' as const, label: 'Avaliações' },
    { key: 'about' as const, label: 'Sobre' },
  ];

  categoryList = ['Populares', 'Pizzas', 'Massas', 'Bebidas', 'Sobremesas'];

  async ngOnInit(): Promise<void> {
    this.restaurantId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.restaurantId) {
      this.router.navigateByUrl('/home');
      return;
    }

    const rest = await this.firebase.getRestaurantById(this.restaurantId);
    this.restaurant.set(rest);
    this.reviews = REVIEWS_BY_RESTAURANT[this.restaurantId] || DEFAULT_REVIEWS;

    // Carrega produtos do restaurante
    const prods = await this.firebase.getProductsByRestaurant(this.restaurantId);
    this.allProducts.set(prods.length > 0 ? prods : await this.firebase.getProductsByRestaurant('2')); // fallback para Pasta

    // Verifica favorito (se logado)
    const user = this.firebase.currentUser();
    if (user && rest) {
      const favs = await this.firebase.getFavorites(user.uid);
      this.isFavorite = favs.includes(this.restaurantId);
    }
  }

  get filteredProducts(): Product[] {
    const prods = this.allProducts();
    return this.activeCategory === 'Populares'
      ? prods
      : prods.filter((p) => p.category === this.activeCategory);
  }

  async toggleFavorite(): Promise<void> {
    const user = this.firebase.currentUser();
    const r = this.restaurant();
    if (!user || !r) {
      this.router.navigateByUrl('/login');
      return;
    }
    const newState = await this.firebase.toggleFavorite(user.uid, r.id);
    this.isFavorite = newState;
  }

  get currentRestaurant() {
    return this.restaurant() || { name: 'Restaurante', image: '', rating: 4.5, deliveryTime: '30 min', deliveryFee: 'R$ 5' } as any;
  }

  get cartItemCount(): number {
    return this.cart.restaurantItemCount(this.restaurantId);
  }

  get cartSubtotal(): string {
    return this.cart.restaurantSubtotal(this.restaurantId).toFixed(2).replace('.', ',');
  }
}