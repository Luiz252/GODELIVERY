import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideArrowLeft, LucideTag } from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';

interface Promo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  image: string;
  restaurantId?: string;
}

const PROMOS: Record<string, Promo> = {
  '1': {
    id: '1',
    title: '20% OFF em pizzas hoje!',
    subtitle: 'Válido em restaurantes parceiros',
    description: 'Ganhe 20% de desconto em qualquer pizza pedida hoje. Aproveite massas artesanais e sabores exclusivos com entrega rápida.',
    code: 'PIZZA20',
    discount: '20%',
    validUntil: '08/06/2026',
    image: 'https://images.unsplash.com/photo-1563683640683-74f1723873d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHByb21vJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    restaurantId: '2',
  },
  '2': {
    id: '2',
    title: 'Combo Burger + Batata',
    subtitle: 'Oferta especial do fim de semana',
    description: 'Combo completo com hambúrguer artesanal, batata frita crocante e refrigerante. Perfeito para compartilhar ou saborear sozinho.',
    code: 'COMBO15',
    discount: 'R$ 15 OFF',
    validUntil: '10/06/2026',
    image: 'https://images.unsplash.com/photo-1762597151434-cfedca67d21b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwYmFubmVyfGVufDF8fHx8MTc3MjU4MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
};

@Component({
  selector: 'app-promo-detail-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucideTag, ImageWithFallbackComponent],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen pb-8">
        @if (promo) {
          <div class="relative h-52">
            <app-image-with-fallback [src]="promo.image" [alt]="promo.title" className="w-full h-full object-cover" />
            <button
              type="button"
              (click)="router.navigateByUrl('/home')"
              class="absolute top-12 left-6 w-10 h-10 rounded-full bg-gd-surface/90 flex items-center justify-center"
            >
              <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
            </button>
          </div>

          <div class="px-6 -mt-6 relative z-10">
            <div class="bg-gd-surface rounded-2xl p-5" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style="background-color: var(--gd-bg)">
                <svg lucideTag class="w-4 h-4" style="color: var(--gd-accent)"></svg>
                <span class="text-sm font-bold" style="color: var(--gd-accent)">{{ promo.discount }}</span>
              </div>
              <h1 class="text-2xl font-bold mb-1" style="color: var(--gd-text)">{{ promo.title }}</h1>
              <p class="text-sm mb-4" style="color: var(--gd-text-secondary)">{{ promo.subtitle }}</p>
              <p class="text-sm leading-relaxed mb-4" style="color: var(--gd-text)">{{ promo.description }}</p>

              <div class="p-4 rounded-xl mb-4" style="background-color: var(--gd-bg)">
                <p class="text-xs mb-1" style="color: var(--gd-text-secondary)">Código do cupom</p>
                <p class="text-xl font-bold tracking-wider" style="color: var(--gd-accent)">{{ promo.code }}</p>
              </div>

              <p class="text-xs mb-4" style="color: var(--gd-text-secondary)">Válido até {{ promo.validUntil }}</p>

              <button
                type="button"
                (click)="goToRestaurant()"
                class="w-full h-14 rounded-2xl font-bold text-white active:scale-95 transition-transform"
                style="background-color: var(--gd-accent); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3)"
              >
                {{ promo.restaurantId ? 'Ver restaurante' : 'Explorar ofertas' }}
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class PromoDetailScreenComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);

  promo: Promo | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '1';
    this.promo = PROMOS[id] || PROMOS['1'];
  }

  goToRestaurant(): void {
    if (this.promo?.restaurantId) {
      this.router.navigateByUrl('/restaurant/' + this.promo.restaurantId);
    } else {
      this.router.navigateByUrl('/search');
    }
  }
}