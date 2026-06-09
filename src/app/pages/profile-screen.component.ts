import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideBell,
  LucideChevronRight,
  LucideCreditCard,
  LucideHelpCircle,
  LucideLogOut,
  LucideMapPin,
  LucideSettings,
  LucideUser,
} from '@lucide/angular';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { FirebaseService } from '../services/firebase.service';
import { navigateWithReturn } from '../utils/navigation.util';

interface MenuItem {
  id: string;
  label: string;
  icon: 'map' | 'card' | 'bell' | 'help' | 'settings';
  action: () => void;
}

@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [
    LucideArrowLeft,
    LucideUser,
    LucideMapPin,
    LucideCreditCard,
    LucideBell,
    LucideHelpCircle,
    LucideSettings,
    LucideChevronRight,
    LucideLogOut,
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
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Perfil</h1>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 pb-24">
          <div class="bg-gd-surface rounded-2xl p-6 mb-6" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)">
            <div class="flex items-center gap-4">
              <div
                class="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                style="background-color: var(--gd-bg)"
              >
                <svg lucideUser class="w-10 h-10" style="color: var(--gd-accent)"></svg>
              </div>
              <div class="flex-1 min-w-0">
                <h2 class="text-xl font-bold mb-1" style="color: var(--gd-text)">{{ user()?.name || 'Usuário' }}</h2>
                <p class="text-sm" style="color: var(--gd-text-secondary)">{{ user()?.email || '' }}</p>
                <p class="text-sm" style="color: var(--gd-text-secondary)">{{ user()?.phone || '' }}</p>
              </div>
            </div>
            <button
              type="button"
              class="w-full mt-4 h-10 rounded-xl font-medium transition-colors active:scale-95"
              style="background-color: var(--gd-bg); color: var(--gd-accent)"
              (click)="onEditProfile()"
            >
              Editar perfil
            </button>
          </div>

          <div
            class="bg-gd-surface rounded-2xl overflow-hidden mb-6"
            style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
          >
            @for (item of menuItems; track item.id; let last = $last) {
              <button
                type="button"
                (click)="item.action()"
                class="w-full flex items-center justify-between p-4 text-left active:bg-gray-50 transition-colors"
                [style.border-bottom]="last ? 'none' : '1px solid var(--gd-border)'"
              >
                <div class="flex items-center gap-3">
                  @switch (item.icon) {
                    @case ('map') {
                      <svg lucideMapPin class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                    }
                    @case ('card') {
                      <svg lucideCreditCard class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                    }
                    @case ('bell') {
                      <svg lucideBell class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                    }
                    @case ('help') {
                      <svg lucideHelpCircle class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                    }
                    @case ('settings') {
                      <svg lucideSettings class="w-5 h-5" style="color: var(--gd-accent)"></svg>
                    }
                  }
                  <span class="font-medium" style="color: var(--gd-text)">{{ item.label }}</span>
                </div>
                <svg lucideChevronRight class="w-5 h-5" style="color: var(--gd-text-secondary)"></svg>
              </button>
            }
          </div>

          <button
            type="button"
            (click)="logout()"
            class="w-full bg-gd-surface rounded-2xl p-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
          >
            <svg lucideLogOut class="w-5 h-5" style="color: #EF4444"></svg>
            <span class="font-bold" style="color: #EF4444">Sair da conta</span>
          </button>
        </div>

        <app-bottom-nav [activeTab]="'profile'" />
      </div>
    </div>
  `,
})
export class ProfileScreenComponent {
  router = inject(Router);
  private firebase = inject(FirebaseService);

  user = computed(() => this.firebase.currentUser());

  menuItems: MenuItem[] = [
    {
      id: 'addresses',
      icon: 'map',
      label: 'Endereços salvos',
      action: () => navigateWithReturn(this.router, '/address-select', 'profile'),
    },
    {
      id: 'payments',
      icon: 'card',
      label: 'Formas de pagamento',
      action: () => navigateWithReturn(this.router, '/add-payment', 'profile'),
    },
    {
      id: 'notifications',
      icon: 'bell',
      label: 'Notificações',
      action: () => navigateWithReturn(this.router, '/notifications', 'profile'),
    },
    {
      id: 'help',
      icon: 'help',
      label: 'Ajuda e suporte',
      action: () => this.router.navigateByUrl('/help'),
    },
    {
      id: 'settings',
      icon: 'settings',
      label: 'Configurações',
      action: () => this.router.navigateByUrl('/settings'),
    },
  ];

  onEditProfile(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  async logout(): Promise<void> {
    try {
      await this.firebase.logout();
    } catch (e) {
      console.error(e);
    }
    this.router.navigateByUrl('/login');
  }
}