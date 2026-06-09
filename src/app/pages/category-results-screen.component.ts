import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideArrowLeft, LucideClock, LucideDollarSign, LucideStar } from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService, Restaurant } from '../services/firebase.service';

const CATEGORY_MAP: Record<string, { name: string; keywords: string[] }> = {
  '1': { name: 'Pizza', keywords: ['pizza', 'italiana', 'massas'] },
  '2': { name: 'Hambúrguer', keywords: ['hamburguer', 'burger', 'lanche'] },
  '3': { name: 'Sushi', keywords: ['sushi', 'japonesa', 'sashimi'] },
  '4': { name: 'Bebidas', keywords: ['bebida', 'drink', 'vinho'] },
  '5': { name: 'Sobremesas', keywords: ['sobremesa', 'doce', 'doces'] },
  pizza: { name: 'Pizza', keywords: ['pizza', 'italiana', 'massas'] },
  burger: { name: 'Hambúrguer', keywords: ['hamburguer', 'burger'] },
  sushi: { name: 'Sushi', keywords: ['sushi', 'japonesa'] },
  fish: { name: 'Sushi', keywords: ['sushi', 'japonesa', 'peixe'] },
  wine: { name: 'Bebidas', keywords: ['bebida', 'vinho'] },
  cake: { name: 'Sobremesas', keywords: ['sobremesa', 'doce'] },
};

@Component({
  selector: 'app-category-results-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucideStar, LucideClock, LucideDollarSign, ImageWithFallbackComponent],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen pb-8">
        <div class="px-6 pt-12 pb-4">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="router.navigateByUrl('/home')"
              class="w-10 h-10 rounded-full bg-gd-surface flex items-center justify-center active:scale-90 transition-transform"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
            >
              <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold" style="color: var(--gd-text)">{{ categoryName }}</h1>
              <p class="text-sm" style="color: var(--gd-text-secondary)">{{ restaurants.length }} restaurantes</p>
            </div>
          </div>
        </div>

        <div class="px-6 space-y-4">
          @if (restaurants.length === 0) {
            <div class="text-center py-12">
              <p class="font-bold mb-2" style="color: var(--gd-text)">Nenhum restaurante encontrado</p>
              <p class="text-sm" style="color: var(--gd-text-secondary)">Tente outra categoria ou busca</p>
            </div>
          }
          @for (r of restaurants; track r.id) {
            <button
              type="button"
              (click)="router.navigateByUrl('/restaurant/' + r.id)"
              class="w-full bg-gd-surface rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform"
              style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
            >
              <div class="h-[120px]">
                <app-image-with-fallback [src]="r.image" [alt]="r.name" className="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                <p class="font-bold mb-2" style="color: var(--gd-text)">{{ r.name }}</p>
                <div class="flex items-center gap-4 text-sm" style="color: var(--gd-text-secondary)">
                  <span class="flex items-center gap-1">
                    <svg lucideStar class="w-4 h-4" style="color: var(--gd-accent); fill: var(--gd-accent)"></svg>
                    {{ r.rating }}
                  </span>
                  <span class="flex items-center gap-1"><svg lucideClock class="w-4 h-4"></svg>{{ r.deliveryTime }}</span>
                  <span class="flex items-center gap-1"><svg lucideDollarSign class="w-4 h-4"></svg>{{ r.deliveryFee }}</span>
                </div>
              </div>
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class CategoryResultsScreenComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);

  categoryName = 'Categoria';
  restaurants: Restaurant[] = [];

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const cat = CATEGORY_MAP[slug] || { name: slug, keywords: [slug.toLowerCase()] };
    this.categoryName = cat.name;

    let list = this.firebase.restaurants();
    if (list.length === 0) {
      list = await this.firebase.loadRestaurants();
    }

    this.restaurants = list.filter((r) => {
      const cats = (r.categories || []).map((c) => c.toLowerCase());
      const name = r.name.toLowerCase();
      return cat.keywords.some((kw) => cats.some((c) => c.includes(kw)) || name.includes(kw));
    });

    if (this.restaurants.length === 0) {
      this.restaurants = list;
    }
  }
}