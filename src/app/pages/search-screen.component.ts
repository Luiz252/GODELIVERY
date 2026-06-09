import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideCake,
  LucideCherry,
  LucideClock,
  LucideFish,
  LucideGrid3x3,
  LucideLeaf,
  LucidePizza,
  LucideSearch,
  LucideStar,
  LucideUtensils,
  LucideUtensilsCrossed,
  LucideWine,
  LucideX,
} from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService, Product, Restaurant } from '../services/firebase.service';

const RECENT_KEY = 'godelivery_recent_searches';
const INITIAL_RECENT = ['Pizza', 'Sushi Premium', 'Hambúrguer', 'Açaí'];

const FILTER_CHIPS = [
  'Entrega grátis',
  'Até 30 min',
  '30-45 min',
  'Melhor avaliados',
  'Mais próximos',
  'Promoções',
];

const CATEGORY_SLUGS: Record<string, string> = {
  '1': 'pizza',
  '2': 'burger',
  '3': 'sushi',
  '4': 'acai',
  '5': 'wine',
  '6': 'cake',
  '7': 'utensils',
  '8': 'leaf',
  '9': 'all',
};

@Component({
  selector: 'app-search-screen',
  standalone: true,
  imports: [
    FormsModule,
    LucideArrowLeft,
    LucideSearch,
    LucideClock,
    LucideX,
    LucidePizza,
    LucideUtensilsCrossed,
    LucideFish,
    LucideCherry,
    LucideWine,
    LucideCake,
    LucideUtensils,
    LucideLeaf,
    LucideGrid3x3,
    LucideStar,
    ImageWithFallbackComponent,
  ],
  template: `
    <div class="w-full min-h-screen bg-[var(--gd-bg)] flex flex-col overflow-hidden">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="pt-12 px-6 pb-4 flex items-center gap-3 bg-[var(--gd-bg)]">
          <button
            type="button"
            (click)="router.navigateByUrl('/home')"
            class="flex items-center justify-center w-10 h-10 shrink-0"
          >
            <svg lucideArrowLeft class="w-6 h-6 text-[var(--gd-text)]"></svg>
          </button>

          <div class="flex-1 h-12 bg-gd-surface border-2 border-[var(--gd-border)] rounded-xl flex items-center px-4 gap-3">
            <svg lucideSearch class="w-5 h-5 text-[var(--gd-text-secondary)] shrink-0"></svg>
            <input
              autofocus
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()"
              placeholder="Buscar restaurantes, pratos..."
              class="flex-1 bg-transparent outline-none text-[var(--gd-text)] placeholder-[var(--gd-border-soft)] text-sm"
            />
            @if (searchQuery.length > 0) {
              <button type="button" (click)="clearSearch()">
                <svg lucideX class="w-[18px] h-[18px] text-[var(--gd-text-secondary)]"></svg>
              </button>
            }
          </div>
        </div>

        <div
          class="flex-1 overflow-y-auto px-6 pb-8"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          @if (searchQuery.trim().length > 0) {
            <div class="mt-2">
              @if (isLoading) {
                <p class="text-sm text-center py-8" style="color: var(--gd-text-secondary)">Buscando...</p>
              } @else if (filteredRestaurants.length === 0 && filteredProducts.length === 0) {
                <div class="text-center py-12">
                  <p class="font-bold mb-2" style="color: var(--gd-text)">Nenhum resultado encontrado</p>
                  <p class="text-sm" style="color: var(--gd-text-secondary)">Tente outro termo ou categoria</p>
                </div>
              } @else {
                @if (filteredRestaurants.length > 0) {
                  <p class="text-base text-[var(--gd-text)] mb-3" style="font-weight: 700">
                    Restaurantes ({{ filteredRestaurants.length }})
                  </p>
                  <div class="space-y-3 mb-6">
                    @for (r of filteredRestaurants; track r.id) {
                      <button
                        type="button"
                        (click)="openRestaurant(r)"
                        class="w-full flex gap-3 bg-gd-surface rounded-xl p-3 text-left active:scale-[0.98] transition-transform"
                        style="box-shadow: 0 2px 8px rgba(0,0,0,0.04)"
                      >
                        <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <app-image-with-fallback [src]="r.image" [alt]="r.name" className="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="font-bold text-sm text-[var(--gd-text)]">{{ r.name }}</p>
                          <p class="text-xs text-[var(--gd-text-secondary)] mt-1">{{ (r.categories || []).join(' • ') }}</p>
                          <div class="flex items-center gap-1 mt-1">
                            <svg lucideStar class="w-3.5 h-3.5 text-[var(--gd-accent)]" style="fill: var(--gd-accent)"></svg>
                            <span class="text-xs font-medium text-[var(--gd-text)]">{{ r.rating }}</span>
                          </div>
                        </div>
                      </button>
                    }
                  </div>
                }

                @if (filteredProducts.length > 0) {
                  <p class="text-base text-[var(--gd-text)] mb-3" style="font-weight: 700">
                    Pratos ({{ filteredProducts.length }})
                  </p>
                  <div class="space-y-3">
                    @for (p of filteredProducts; track p.id) {
                      <button
                        type="button"
                        (click)="openProduct(p)"
                        class="w-full flex gap-3 bg-gd-surface rounded-xl p-3 text-left active:scale-[0.98] transition-transform"
                        style="box-shadow: 0 2px 8px rgba(0,0,0,0.04)"
                      >
                        <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <app-image-with-fallback [src]="p.image" [alt]="p.name" className="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="font-bold text-sm text-[var(--gd-text)]">{{ p.name }}</p>
                          <p class="text-xs text-[var(--gd-text-secondary)] mt-1 line-clamp-1">{{ p.description }}</p>
                          <p class="text-sm font-bold text-[var(--gd-accent)] mt-1">{{ p.price }}</p>
                        </div>
                      </button>
                    }
                  </div>
                }
              }
            </div>
          } @else {
            @if (recentSearches.length > 0) {
              <div>
                <div class="flex items-center justify-between mt-4 mb-3">
                  <span class="text-base text-[var(--gd-text)]" style="font-weight: 700">Buscas recentes</span>
                  <button type="button" (click)="clearAll()" class="text-sm text-[var(--gd-accent)]">Limpar</button>
                </div>

                @for (item of recentSearches; track item) {
                  <div class="flex items-center justify-between py-3 border-b border-[var(--gd-border)]">
                    <button
                      type="button"
                      class="flex items-center gap-3 flex-1 text-left"
                      (click)="clickRecent(item)"
                    >
                      <svg lucideClock class="w-[18px] h-[18px] text-[var(--gd-text-secondary)] shrink-0"></svg>
                      <span class="text-sm text-[var(--gd-text)]">{{ item }}</span>
                    </button>
                    <button type="button" (click)="removeRecent(item)">
                      <svg lucideX class="w-[18px] h-[18px] text-[var(--gd-text-secondary)]"></svg>
                    </button>
                  </div>
                }
              </div>
            }

            <div>
              <p class="text-base text-[var(--gd-text)] mt-6 mb-3" style="font-weight: 700">Filtros</p>
              <div
                class="flex gap-2 overflow-x-auto pb-1"
                style="scrollbar-width: none; -ms-overflow-style: none"
              >
                @for (chip of filterChips; track chip) {
                  <button
                    type="button"
                    (click)="toggleFilter(chip)"
                    class="px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 border transition-all"
                    [class]="
                      isFilterActive(chip)
                        ? 'bg-[var(--gd-accent)] text-white border-[var(--gd-accent)]'
                        : 'bg-gd-surface text-[var(--gd-text)] border-[var(--gd-border)]'
                    "
                    [style.font-weight]="isFilterActive(chip) ? 500 : 400"
                  >
                    {{ chip }}
                  </button>
                }
              </div>
            </div>

            <div>
              <p class="text-base text-[var(--gd-text)] mt-6 mb-3" style="font-weight: 700">Categorias</p>
              <div class="grid grid-cols-3 gap-3">
                @for (cat of categories; track cat.id) {
                  <button
                    type="button"
                    (click)="openCategory(cat.id)"
                    class="flex flex-col items-center p-4 bg-gd-surface rounded-xl active:scale-95 transition-transform"
                    style="box-shadow: 0 2px 8px rgba(0,0,0,0.04)"
                  >
                    @switch (cat.icon) {
                      @case ('pizza') {
                        <svg lucidePizza class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('burger') {
                        <svg lucideUtensilsCrossed class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('fish') {
                        <svg lucideFish class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('cherry') {
                        <svg lucideCherry class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('wine') {
                        <svg lucideWine class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('cake') {
                        <svg lucideCake class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('utensils') {
                        <svg lucideUtensils class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('leaf') {
                        <svg lucideLeaf class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                      @case ('grid') {
                        <svg lucideGrid3x3 class="w-8 h-8 text-[var(--gd-accent)]"></svg>
                      }
                    }
                    <span class="text-xs text-[var(--gd-text)] mt-2" style="font-weight: 500">{{ cat.name }}</span>
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class SearchScreenComponent implements OnInit {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  searchQuery = '';
  recentSearches = this.loadRecent();
  activeFilters: string[] = [];
  filterChips = FILTER_CHIPS;
  isLoading = false;

  allRestaurants: Restaurant[] = [];
  allProducts: Product[] = [];
  filteredRestaurants: Restaurant[] = [];
  filteredProducts: Product[] = [];

  categories = [
    { id: '1', name: 'Pizza', icon: 'pizza' as const },
    { id: '2', name: 'Hambúrguer', icon: 'burger' as const },
    { id: '3', name: 'Sushi', icon: 'fish' as const },
    { id: '4', name: 'Açaí', icon: 'cherry' as const },
    { id: '5', name: 'Bebidas', icon: 'wine' as const },
    { id: '6', name: 'Doces', icon: 'cake' as const },
    { id: '7', name: 'Brasileira', icon: 'utensils' as const },
    { id: '8', name: 'Saudável', icon: 'leaf' as const },
    { id: '9', name: 'Ver todos', icon: 'grid' as const },
  ];

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      let restaurants = this.firebase.restaurants();
      if (restaurants.length === 0) {
        restaurants = await this.firebase.loadRestaurants();
      }
      this.allRestaurants = restaurants;
      this.allProducts = await this.firebase.getAllProducts();
    } finally {
      this.isLoading = false;
    }
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredRestaurants = [];
    this.filteredProducts = [];
  }

  applyFilters(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.filteredRestaurants = [];
      this.filteredProducts = [];
      return;
    }

    let restaurants = this.allRestaurants.filter((r) => {
      const name = r.name.toLowerCase();
      const cats = (r.categories || []).join(' ').toLowerCase();
      return name.includes(q) || cats.includes(q);
    });

    let products = this.allProducts.filter((p) => {
      const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      return text.includes(q);
    });

    if (this.activeFilters.includes('Entrega grátis')) {
      restaurants = restaurants.filter((r) => (r.deliveryFee || '').toLowerCase().includes('grátis'));
    }
    if (this.activeFilters.includes('Melhor avaliados')) {
      restaurants = [...restaurants].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (this.activeFilters.includes('Até 30 min')) {
      restaurants = restaurants.filter((r) => {
        const t = r.deliveryTime || '';
        return t.includes('15') || t.includes('20') || t.includes('25') || t.includes('30');
      });
    }
    if (this.activeFilters.includes('30-45 min')) {
      restaurants = restaurants.filter((r) => (r.deliveryTime || '').includes('30-') || (r.deliveryTime || '').includes('35') || (r.deliveryTime || '').includes('40'));
    }

    this.filteredRestaurants = restaurants;
    this.filteredProducts = products;
  }

  openRestaurant(r: Restaurant): void {
    this.saveRecent(r.name);
    this.router.navigateByUrl('/restaurant/' + r.id);
  }

  openProduct(p: Product): void {
    this.saveRecent(p.name);
    this.router.navigateByUrl('/product/' + p.id);
  }

  openCategory(id: string): void {
    const slug = CATEGORY_SLUGS[id] || id;
    if (slug === 'all') {
      this.router.navigateByUrl('/home');
      return;
    }
    const cat = this.categories.find((c) => c.id === id);
    if (cat) this.saveRecent(cat.name);
    this.router.navigateByUrl('/category/' + slug);
  }

  removeRecent(item: string): void {
    this.recentSearches = this.recentSearches.filter((s) => s !== item);
    this.persistRecent();
  }

  clearAll(): void {
    this.recentSearches = [];
    this.persistRecent();
  }

  clickRecent(item: string): void {
    this.searchQuery = item;
    this.applyFilters();
  }

  isFilterActive(chip: string): boolean {
    return this.activeFilters.includes(chip);
  }

  toggleFilter(chip: string): void {
    this.activeFilters = this.activeFilters.includes(chip)
      ? this.activeFilters.filter((f) => f !== chip)
      : [...this.activeFilters, chip];
    if (this.searchQuery.trim()) {
      this.applyFilters();
    }
  }

  private saveRecent(term: string): void {
    const next = [term, ...this.recentSearches.filter((s) => s !== term)].slice(0, 8);
    this.recentSearches = next;
    this.persistRecent();
  }

  private persistRecent(): void {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(this.recentSearches));
    } catch {
      /* ignore */
    }
  }

  private loadRecent(): string[] {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* ignore */
    }
    return [...INITIAL_RECENT];
  }
}