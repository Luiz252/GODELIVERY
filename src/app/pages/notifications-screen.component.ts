import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnRoute, getReturnPath, parseReturnRoute } from '../utils/navigation.util';
import {
  LucideArrowLeft,
  LucideBell,
  LucideBellOff,
  LucidePackage,
  LucideTag,
  LucideTruck,
} from '@lucide/angular';

type NotificationType = 'order' | 'promo' | 'delivery' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface IconConfig {
  bg: string;
  color: string;
  icon: NotificationType;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'delivery',
    title: 'Seu pedido saiu para entrega!',
    description: 'O pedido #1234 do Sushi Premium está a caminho',
    time: 'Agora',
    isRead: false,
  },
  {
    id: '2',
    type: 'promo',
    title: '20% OFF em pizzas hoje!',
    description: 'Use o cupom PIZZA20 e aproveite o desconto',
    time: 'Há 2 horas',
    isRead: false,
  },
  {
    id: '3',
    type: 'order',
    title: 'Pedido entregue com sucesso',
    description: 'Avalie sua experiência com Pasta & Vino',
    time: 'Ontem',
    isRead: true,
  },
  {
    id: '4',
    type: 'promo',
    title: 'Frete grátis no fim de semana!',
    description: 'Peça sem taxa de entrega sábado e domingo',
    time: 'Há 2 dias',
    isRead: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Bem-vindo ao GoDelivery!',
    description: 'Use o cupom BEMVINDO e ganhe R$10 de desconto',
    time: 'Há 5 dias',
    isRead: true,
  },
];

const iconConfig: Record<NotificationType, IconConfig> = {
  order: { bg: 'var(--gd-bg)', color: 'var(--gd-accent)', icon: 'order' },
  promo: { bg: '#FEF3C7', color: '#F59E0B', icon: 'promo' },
  delivery: { bg: '#DCFCE7', color: '#22C55E', icon: 'delivery' },
  system: { bg: '#F3F4F6', color: '#6B7280', icon: 'system' },
};

@Component({
  selector: 'app-notifications-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucidePackage, LucideTag, LucideTruck, LucideBell, LucideBellOff],
  template: `
    <div class="w-full min-h-screen overflow-hidden flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div
          class="px-6 pt-12 pb-4 flex items-center justify-between"
          style="background-color: var(--gd-bg)"
        >
          <div class="flex items-center">
            <button
              type="button"
              (click)="goBack()"
              class="p-2 -ml-2 rounded-full active:bg-orange-100 transition-colors"
              aria-label="Voltar"
            >
              <svg lucideArrowLeft class="w-6 h-6" style="color: var(--gd-text)"></svg>
            </button>
            <h1 class="text-xl font-bold ml-4" style="color: var(--gd-text)">Notificações</h1>
          </div>

          @if (unreadCount > 0) {
            <button
              type="button"
              (click)="markAllAsRead()"
              class="text-sm font-medium active:opacity-60 transition-opacity"
              style="color: var(--gd-accent)"
            >
              Marcar todas como lidas
            </button>
          }
        </div>

        <div class="flex-1 overflow-y-auto px-6">
          @if (notifications.length === 0) {
            <div class="flex flex-col items-center justify-center h-full gap-3">
              <svg lucideBellOff class="w-16 h-16" style="color: var(--gd-border)"></svg>
              <p class="text-base font-bold" style="color: var(--gd-text)">Nenhuma notificação</p>
              <p class="text-sm" style="color: var(--gd-text-secondary)">Suas notificações aparecerão aqui</p>
            </div>
          } @else {
            @for (notification of notifications; track notification.id) {
              @let config = iconConfig[notification.type];
              <button
                type="button"
                class="w-full text-left flex items-start gap-3 py-4 transition-colors"
                [style]="getNotificationStyle(notification)"
                (click)="markAsRead(notification.id)"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  [style.background-color]="config.bg"
                >
                  @switch (notification.type) {
                    @case ('order') {
                      <svg lucidePackage class="w-5 h-5" [style.color]="config.color"></svg>
                    }
                    @case ('promo') {
                      <svg lucideTag class="w-5 h-5" [style.color]="config.color"></svg>
                    }
                    @case ('delivery') {
                      <svg lucideTruck class="w-5 h-5" [style.color]="config.color"></svg>
                    }
                    @case ('system') {
                      <svg lucideBell class="w-5 h-5" [style.color]="config.color"></svg>
                    }
                  }
                </div>

                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold" style="color: var(--gd-text)">{{ notification.title }}</p>
                  <p class="text-sm mt-1 line-clamp-2" style="color: var(--gd-text-secondary)">{{ notification.description }}</p>
                  <p class="text-xs mt-1" style="color: var(--gd-text-secondary); opacity: 0.6">{{ notification.time }}</p>
                </div>

                @if (!notification.isRead) {
                  <div
                    class="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style="background-color: var(--gd-accent)"
                  ></div>
                }
              </button>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class NotificationsScreenComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);

  returnTo: ReturnRoute = 'home';
  notifications: Notification[] = [...initialNotifications];
  iconConfig = iconConfig;

  ngOnInit(): void {
    this.returnTo = parseReturnRoute(this.route, 'home');
  }

  goBack(): void {
    this.router.navigateByUrl(getReturnPath(this.returnTo));
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length;
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
  }

  markAsRead(id: string): void {
    this.notifications = this.notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
  }

  getNotificationStyle(notification: Notification): Record<string, string> {
    const base: Record<string, string> = { borderBottom: '1px solid var(--gd-border)' };
    if (!notification.isRead) {
      return {
        ...base,
        backgroundColor: 'var(--gd-surface)',
        borderLeftWidth: '4px',
        borderLeftColor: 'var(--gd-accent)',
        paddingLeft: '12px',
        marginLeft: '-12px',
        paddingRight: '0',
        width: 'calc(100% + 12px)',
        borderRadius: '0 8px 8px 0',
      };
    }
    return base;
  }
}