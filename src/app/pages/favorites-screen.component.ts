import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideClock,
  LucideDollarSign,
  LucideHeart,
  LucideStar,
} from '@lucide/angular';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
}

@Component({
  selector: 'app-favorites-screen',
  standalone: true,
  imports: [
    LucideArrowLeft,
    LucideHeart,
    LucideStar,
    LucideClock,
    LucideDollarSign,
    ImageWithFallbackComponent,
    BottomNavComponent,
  ],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="px-6 pt-12 pb-4" style="background-color: var(--gd-bg)">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="router.navigateByUrl('/home')"
              class="w-10 h-10 rounded-full bg-gd-surface flex items-center justify-center active:scale-90 transition-transform"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
              aria-label="Voltar"
            >
              <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
            </button>
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Favoritos</h1>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 pb-24">
          @if (favoriteRestaurants.length === 0) {
            <div class="flex flex-col items-center justify-center h-full py-12">
              <svg lucideHeart class="w-16 h-16 mb-4" style="color: var(--gd-border)"></svg>
              <p class="font-bold text-lg mb-2" style="color: var(--gd-text)">Nenhum favorito ainda</p>
              <p class="text-center text-sm mb-6" style="color: var(--gd-text-secondary)">
                Adicione restaurantes aos favoritos para vê-los aqui
              </p>
              <button
                type="button"
                (click)="router.navigateByUrl('/home')"
                class="px-6 py-3 rounded-full font-bold text-white active:scale-95 transition-transform"
                style="background-color: var(--gd-accent)"
              >
                Explorar restaurantes
              </button>
            </div>
          } @else {
            <div class="space-y-4">
              @for (restaurant of favoriteRestaurants; track restaurant.id) {
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
                      (click)="removeFavorite(restaurant.id); $event.stopPropagation()"
                      class="absolute top-3 right-3 p-2 rounded-full bg-gd-surface/90 backdrop-blur-sm active:scale-90 transition-transform"
                      aria-label="Remover dos favoritos"
                    >
                      <svg
                        lucideHeart
                        class="w-5 h-5"
                        style="color: var(--gd-accent); fill: var(--gd-accent)"
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
          }
        </div>

        <app-bottom-nav [activeTab]="'favorites'" />
      </div>
    </div>
  `,
})
export class FavoritesScreenComponent {
  router = inject(Router);

  favoriteRestaurants: Restaurant[] = [
    {
      id: '2',
      name: 'Pasta & Vino',
      image:
        'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 5,00',
    },
  ];

  removeFavorite(id: string): void {
    this.favoriteRestaurants = this.favoriteRestaurants.filter((r) => r.id !== id);
  }
}