import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideCheckCircle,
  LucideClock,
  LucidePackage,
  LucideXCircle,
} from '@lucide/angular';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService } from '../services/firebase.service';
import { DeliveryOrder, OrderService } from '../services/order.service';
import { getOrderStatusDisplay } from '../utils/order-status.util';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  total: number;
  status: DeliveryOrder['status'];
  orderDate: string;
  deliveryTime: string;
}

interface StatusInfo {
  label: string;
  color: string;
  bgColor: string;
  icon: 'clock' | 'package' | 'check' | 'x';
}

@Component({
  selector: 'app-orders-screen',
  standalone: true,
  imports: [
    LucideArrowLeft,
    LucidePackage,
    LucideClock,
    LucideCheckCircle,
    LucideXCircle,
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
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Meus Pedidos</h1>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 pb-24">
          @if (orders().length === 0) {
            <div class="flex flex-col items-center justify-center h-full py-12">
              <svg lucidePackage class="w-16 h-16 mb-4" style="color: var(--gd-border)"></svg>
              <p class="font-bold text-lg mb-2" style="color: var(--gd-text)">Nenhum pedido ainda</p>
              <p class="text-center text-sm mb-6" style="color: var(--gd-text-secondary)">
                Quando você fizer um pedido, ele aparecerá aqui
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
              @for (order of orders(); track order.id) {
                @let statusInfo = getStatusInfo(order.status);
                <div
                  class="bg-gd-surface rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)"
                  (click)="onOrderClick(order.id)"
                >
                  <div class="flex items-center gap-3 p-4 border-b" style="border-color: var(--gd-border)">
                    <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <app-image-with-fallback
                        [src]="order.restaurantImage"
                        [alt]="order.restaurantName"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-base" style="color: var(--gd-text)">{{ order.restaurantName }}</p>
                      <p class="text-sm" style="color: var(--gd-text-secondary)">
                        {{ order.orderDate }} • #{{ order.id }}
                      </p>
                    </div>
                  </div>

                  <div class="p-4 border-b" style="border-color: var(--gd-border)">
                    <div class="space-y-2">
                      @for (item of order.items; track item.id) {
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <span class="text-sm" style="color: var(--gd-text)">
                              {{ item.quantity }}x {{ item.name }}
                            </span>
                          </div>
                          <span class="text-sm font-medium" style="color: var(--gd-text)">
                            R$ {{ formatPrice(item.price) }}
                          </span>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="p-2 rounded-full" [style.background-color]="statusInfo.bgColor">
                        @switch (statusInfo.icon) {
                          @case ('clock') {
                            <svg lucideClock class="w-5 h-5" [style.color]="statusInfo.color"></svg>
                          }
                          @case ('package') {
                            <svg lucidePackage class="w-5 h-5" [style.color]="statusInfo.color"></svg>
                          }
                          @case ('check') {
                            <svg lucideCheckCircle class="w-5 h-5" [style.color]="statusInfo.color"></svg>
                          }
                          @case ('x') {
                            <svg lucideXCircle class="w-5 h-5" [style.color]="statusInfo.color"></svg>
                          }
                        }
                      </div>
                      <div>
                        <p class="text-sm font-bold" [style.color]="statusInfo.color">
                          {{ statusInfo.label }}
                        </p>
                        <p class="text-xs" style="color: var(--gd-text-secondary)">{{ order.deliveryTime }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-xs" style="color: var(--gd-text-secondary)">Total</p>
                      <p class="text-lg font-bold" style="color: var(--gd-accent)">
                        R$ {{ formatPrice(order.total) }}
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <app-bottom-nav [activeTab]="'orders'" />
      </div>
    </div>
  `,
})
export class OrdersScreenComponent implements OnInit {
  router = inject(Router);
  private firebase = inject(FirebaseService);
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);

  ngOnInit(): void {
    const user = this.firebase.currentUser();
    const source = user
      ? this.orderService.getOrdersForCustomer(user.uid)
      : this.orderService.allOrders();

    this.orders.set(source.map((o) => this.mapOrder(o)));
  }

  private mapOrder(o: DeliveryOrder): Order {
    const statusInfo = getOrderStatusDisplay(o.status);
    return {
      id: o.id,
      restaurantName: o.restaurantName,
      restaurantImage: o.restaurantImage,
      items: o.items.map((it) => ({
        id: it.id,
        name: it.name,
        quantity: it.quantity,
        price: it.priceValue,
      })),
      total: o.total,
      status: o.status,
      orderDate: new Date(o.createdAt).toLocaleDateString('pt-BR'),
      deliveryTime: statusInfo.label,
    };
  }

  getStatusInfo(status: Order['status']): StatusInfo {
    const display = getOrderStatusDisplay(status);
    const iconMap: Record<string, StatusInfo['icon']> = {
      pending: 'clock',
      preparing: 'package',
      ready: 'package',
      on_the_way: 'package',
      delivered: 'check',
      cancelled: 'x',
    };
    return {
      label: display.label,
      icon: iconMap[status] ?? 'clock',
      color: display.color,
      bgColor: display.bgColor,
    };
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  onOrderClick(id: string): void {
    const order = this.orders().find((o) => o.id === id);
    if (order) {
      const statusInfo = this.getStatusInfo(order.status);
      this.router.navigate(['/order', id], {
        state: {
          order: {
            id: order.id,
            restaurantName: order.restaurantName,
            restaurantImage: order.restaurantImage,
            items: order.items,
            total: order.total,
            status: order.status,
            statusLabel: statusInfo.label,
            statusColor: statusInfo.color,
            statusBg: statusInfo.bgColor,
            orderDate: order.orderDate,
            deliveryTime: order.deliveryTime,
            address: 'Endereço de entrega cadastrado',
            paymentMethod: 'Cartão de crédito',
          },
        },
      });
    } else {
      this.router.navigateByUrl('/order/' + id);
    }
  }
}