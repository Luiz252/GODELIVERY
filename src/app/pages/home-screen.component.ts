import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideBell,
  LucideCake,
  LucideClock,
  LucideDollarSign,
  LucideHeart,
  LucidePizza,
  LucideSearch,
  LucideStar,
  LucideUtensilsCrossed,
  LucideWine,
} from '@lucide/angular';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService } from '../services/firebase.service';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  isFavorite: boolean;
}

interface PromoBanner {
  id: string;
  image: string;
  title: string;
}

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    LucideBell,
    LucideSearch,
    LucidePizza,
    LucideUtensilsCrossed,
    LucideWine,
    LucideCake,
    LucideHeart,
    LucideStar,
    LucideClock,
    LucideDollarSign,
    ImageWithFallbackComponent,
    BottomNavComponent,
  ],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="px-6 pt-12 pb-4 space-y-4" style="background-color: var(--gd-bg)">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold" style="color: var(--gd-text)">Olá, {{ userName() }}</h1>
            <button
              type="button"
              class="p-2 rounded-full bg-gd-surface active:bg-gray-50 transition-colors relative"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
              aria-label="Notificações"
              (click)="router.navigateByUrl('/notifications')"
            >
              <svg lucideBell class="w-6 h-6" style="color: var(--gd-accent)"></svg>
              <div class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
          </div>

          <button
            type="button"
            (click)="router.navigateByUrl('/search')"
            class="relative w-full flex items-center h-12 pl-12 pr-4 bg-gd-surface rounded-xl border-2 text-left text-sm transition-all active:scale-[0.98]"
            style="border-color: var(--gd-border); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
          >
            <svg lucideSearch class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--gd-text-secondary)"></svg>
            <span style="color: var(--gd-text-secondary); opacity: 0.6">Busque por pratos ou restaurantes</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto pb-20">
          <div class="px-6 mb-6">
            <div class="flex gap-3 overflow-x-auto no-scrollbar">
              @for (banner of promoBanners; track banner.id) {
                <button
                  type="button"
                  class="flex-shrink-0 relative w-[280px] h-[120px] rounded-2xl overflow-hidden active:scale-95 transition-transform"
                  style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)"
                  (click)="onBannerClick(banner.id)"
                >
                  <app-image-with-fallback [src]="banner.image" [alt]="banner.title" className="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4">
                    <p class="text-white font-bold text-lg">{{ banner.title }}</p>
                  </div>
                </button>
              }
            </div>
          </div>

          <div class="px-6 mb-6">
            <h2 class="text-lg font-bold mb-3" style="color: var(--gd-text)">Categorias</h2>
            <div class="flex gap-3 overflow-x-auto no-scrollbar">
              @for (category of categories; track category.id) {
                <button
                  type="button"
                  class="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-gd-surface rounded-xl active:scale-95 transition-transform min-w-[80px]"
                  style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
                  (click)="onCategoryClick(category.id)"
                >
                  <div class="p-2 rounded-full" style="background-color: var(--gd-bg)">
                    <div style="color: var(--gd-accent)">
                      @switch (category.icon) {
                        @case ('pizza') {
                          <svg lucidePizza class="w-6 h-6"></svg>
                        }
                        @case ('burger') {
                          <svg lucideUtensilsCrossed class="w-6 h-6"></svg>
                        }
                        @case ('wine') {
                          <svg lucideWine class="w-6 h-6"></svg>
                        }
                        @case ('cake') {
                          <svg lucideCake class="w-6 h-6"></svg>
                        }
                      }
                    </div>
                  </div>
                  <span class="text-xs font-medium text-center" style="color: var(--gd-text)">{{ category.name }}</span>
                </button>
              }
            </div>
          </div>

          <div class="px-6">
            <h2 class="text-lg font-bold mb-3" style="color: var(--gd-text)">Restaurantes em destaque</h2>
            <div class="space-y-4">
              @for (restaurant of restaurants; track restaurant.id) {
                <div
                  class="w-full bg-gd-surface rounded-2xl overflow-hidden active:scale-98 transition-transform text-left cursor-pointer"
                  style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
                  (click)="router.navigateByUrl('/restaurant/' + restaurant.id)"
                >
                  <div class="relative h-[140px]">
                    <app-image-with-fallback
                      [src]="restaurant.image"
                      [alt]="restaurant.name"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      (click)="toggleFavorite(restaurant.id); $event.stopPropagation()"
                      class="absolute top-3 right-3 p-2 rounded-full bg-gd-surface/90 backdrop-blur-sm active:scale-90 transition-transform"
                      aria-label="Favoritar"
                    >
                      <svg
                        lucideHeart
                        class="w-5 h-5"
                        [style.color]="restaurant.isFavorite ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
                        [style.fill]="restaurant.isFavorite ? 'var(--gd-accent)' : 'none'"
                      ></svg>
                    </button>
                  </div>
                  <div class="p-4">
                    <h3 class="font-bold text-base mb-2" style="color: var(--gd-text)">{{ restaurant.name }}</h3>
                    <div class="flex items-center gap-4 text-sm">
                      <div class="flex items-center gap-1">
                        <svg lucideStar class="w-4 h-4" style="color: var(--gd-accent); fill: var(--gd-accent)"></svg>
                        <span class="font-medium" style="color: var(--gd-text)">{{ restaurant.rating }}</span>
                      </div>
                      <div class="flex items-center gap-1" style="color: var(--gd-text-secondary)">
                        <svg lucideClock class="w-4 h-4"></svg>
                        <span>{{ restaurant.deliveryTime }}</span>
                      </div>
                      <div class="flex items-center gap-1" style="color: var(--gd-text-secondary)">
                        <svg lucideDollarSign class="w-4 h-4"></svg>
                        <span>{{ restaurant.deliveryFee }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <app-bottom-nav [activeTab]="'home'" />
      </div>
    </div>
  `,
})
export class HomeScreenComponent implements OnInit {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  userName = computed(() => {
    const u = this.firebase.currentUser();
    if (!u) return 'Usuário';
    const first = u.name.split(' ')[0];
    return first || u.name;
  });

  categories = [
    { id: '1', name: 'Pizza', icon: 'pizza' as const },
    { id: '2', name: 'Hambúrguer', icon: 'burger' as const },
    { id: '3', name: 'Sushi', icon: 'burger' as const },
    { id: '4', name: 'Bebidas', icon: 'wine' as const },
    { id: '5', name: 'Sobremesas', icon: 'cake' as const },
  ];

  promoBanners: PromoBanner[] = [
    {
      id: '1',
      title: '20% OFF em pizzas hoje!',
      image:
        'https://images.unsplash.com/photo-1563683640683-74f1723873d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHByb21vJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Combo Burger + Batata',
      image:
        'https://images.unsplash.com/photo-1762597151434-cfedca67d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  restaurants: Restaurant[] = [];
  private favoriteIds = new Set<string>();

  async ngOnInit(): Promise<void> {
    // Seed inicial se necessário (só roda uma vez no projeto)
    try {
      await this.firebase.seedInitialDataIfEmpty();
    } catch (e) {
      console.warn('Seed skipped or failed (pode ser permissão ou já populado)', e);
    }

    // Carrega restaurantes
    const list = await this.firebase.loadRestaurants();

    // Carrega favoritos do usuário atual (se logado)
    const user = this.firebase.currentUser();
    if (user) {
      const favs = await this.firebase.getFavorites(user.uid);
      this.favoriteIds = new Set(favs);
    }

    // Enriquece com isFavorite
    this.restaurants = list.map((r) => ({
      ...r,
      isFavorite: this.favoriteIds.has(r.id),
    }));
  }

  async toggleFavorite(id: string): Promise<void> {
    const user = this.firebase.currentUser();
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    const isFav = this.favoriteIds.has(id);
    try {
      const newState = await this.firebase.toggleFavorite(user.uid, id);
      if (newState) {
        this.favoriteIds.add(id);
      } else {
        this.favoriteIds.delete(id);
      }

      this.restaurants = this.restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, isFavorite: newState } : restaurant
      );
    } catch (e) {
      console.error('Erro ao favoritar:', e);
    }
  }

  onBannerClick(id: string): void {
    this.router.navigateByUrl('/promo/' + id);
  }

  onCategoryClick(id: string): void {
    this.router.navigateByUrl('/category/' + id);
  }
}