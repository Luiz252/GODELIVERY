import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideHeart, LucideHome, LucidePackage, LucideUser } from '@lucide/angular';

export type BottomNavTab = 'home' | 'orders' | 'favorites' | 'profile';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [LucideHome, LucidePackage, LucideHeart, LucideUser],
  template: `
    <div class="fixed bottom-0 left-0 right-0 bg-gd-surface border-t z-50" style="border-color: var(--gd-border)">
      <div class="flex items-center justify-around h-16 px-6">
        <button
          type="button"
          (click)="navigate('home')"
          class="flex flex-col items-center gap-1 py-2 transition-colors"
          aria-label="Home"
        >
          <svg
            lucideHome
            class="w-6 h-6"
            [style.color]="activeTab === 'home' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
            [style.fill]="activeTab === 'home' ? 'var(--gd-accent)' : 'none'"
          ></svg>
          <span class="text-xs font-medium" [style.color]="activeTab === 'home' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'">
            Home
          </span>
        </button>

        <button
          type="button"
          (click)="navigate('orders')"
          class="flex flex-col items-center gap-1 py-2 transition-colors"
          aria-label="Pedidos"
        >
          <svg
            lucidePackage
            class="w-6 h-6"
            [style.color]="activeTab === 'orders' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
          ></svg>
          <span class="text-xs font-medium" [style.color]="activeTab === 'orders' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'">
            Pedidos
          </span>
        </button>

        <button
          type="button"
          (click)="navigate('favorites')"
          class="flex flex-col items-center gap-1 py-2 transition-colors"
          aria-label="Favoritos"
        >
          <svg
            lucideHeart
            class="w-6 h-6"
            [style.color]="activeTab === 'favorites' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
          ></svg>
          <span class="text-xs font-medium" [style.color]="activeTab === 'favorites' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'">
            Favoritos
          </span>
        </button>

        <button
          type="button"
          (click)="navigate('profile')"
          class="flex flex-col items-center gap-1 py-2 transition-colors"
          aria-label="Perfil"
        >
          <svg
            lucideUser
            class="w-6 h-6"
            [style.color]="activeTab === 'profile' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'"
          ></svg>
          <span class="text-xs font-medium" [style.color]="activeTab === 'profile' ? 'var(--gd-accent)' : 'var(--gd-text-secondary)'">
            Perfil
          </span>
        </button>
      </div>
    </div>
  `,
})
export class BottomNavComponent {
  @Input() activeTab: BottomNavTab = 'home';

  private router = inject(Router);

  navigate(tab: BottomNavTab): void {
    const routes: Record<BottomNavTab, string> = {
      home: '/home',
      orders: '/orders',
      favorites: '/favorites',
      profile: '/profile',
    };
    this.router.navigateByUrl(routes[tab]);
  }
}