import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideBike,
  LucideCheckCircle,
  LucideLogOut,
  LucideMapPin,
  LucideNavigation,
  LucidePackage,
} from '@lucide/angular';
import { DeliveryOrder, OrderService } from '../services/order.service';
import { FirebaseService } from '../services/firebase.service';
import { getOrderStatusDisplay } from '../utils/order-status.util';

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    LucideBike,
    LucideCheckCircle,
    LucideLogOut,
    LucideMapPin,
    LucideNavigation,
    LucidePackage,
  ],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="px-6 pt-12 pb-4" style="background: linear-gradient(135deg, #16A34A, #22C55E)">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <svg lucideBike class="w-6 h-6 text-white"></svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white">Motoboy</h1>
                <p class="text-sm text-white/80">{{ userName }}</p>
              </div>
            </div>
            <button type="button" (click)="logout()" class="p-2 rounded-full bg-white/20 active:scale-95" aria-label="Sair">
              <svg lucideLogOut class="w-5 h-5 text-white"></svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-white/15 rounded-xl p-3 text-center">
              <p class="text-2xl font-bold text-white">{{ orderService.readyOrders().length }}</p>
              <p class="text-xs text-white/80">Disponíveis</p>
            </div>
            <div class="bg-white/15 rounded-xl p-3 text-center">
              <p class="text-2xl font-bold text-white">{{ myDeliveries().length }}</p>
              <p class="text-xs text-white/80">Em entrega</p>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4 pb-8 space-y-6">
          @if (orderService.readyOrders().length > 0) {
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">
                Prontos para retirada
              </h2>
              @for (order of orderService.readyOrders(); track order.id) {
                <div class="bg-gd-surface rounded-2xl p-4 mb-3" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                  <ng-container [ngTemplateOutlet]="orderInfo" [ngTemplateOutletContext]="{ order: order }"></ng-container>
                  <button
                    type="button"
                    class="w-full mt-3 py-3 rounded-xl font-bold text-white active:scale-95"
                    style="background-color: #16A34A"
                    (click)="acceptDelivery(order.id)"
                  >
                    Aceitar entrega
                  </button>
                </div>
              }
            </section>
          }

          @if (myDeliveries().length > 0) {
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">
                Minhas entregas
              </h2>
              @for (order of myDeliveries(); track order.id) {
                <div class="bg-gd-surface rounded-2xl p-4 mb-3 border-2" style="border-color: #16A34A; box-shadow: 0 4px 12px var(--gd-shadow)">
                  <ng-container [ngTemplateOutlet]="orderInfo" [ngTemplateOutletContext]="{ order: order }"></ng-container>
                  <div class="flex gap-2 mt-3">
                    <button
                      type="button"
                      class="flex-1 py-3 rounded-xl font-bold text-sm active:scale-95 flex items-center justify-center gap-2"
                      style="background-color: var(--gd-bg); color: var(--gd-accent)"
                    >
                      <svg lucideNavigation class="w-4 h-4"></svg>
                      Navegar
                    </button>
                    <button
                      type="button"
                      class="flex-1 py-3 rounded-xl font-bold text-white text-sm active:scale-95 flex items-center justify-center gap-2"
                      style="background-color: #16A34A"
                      (click)="confirmDelivered(order.id)"
                    >
                      <svg lucideCheckCircle class="w-4 h-4"></svg>
                      Entregue
                    </button>
                  </div>
                </div>
              }
            </section>
          }

          @if (orderService.readyOrders().length === 0 && myDeliveries().length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-center">
              <svg lucidePackage class="w-16 h-16 mb-4" style="color: var(--gd-border)"></svg>
              <p class="font-bold text-lg" style="color: var(--gd-text)">Nenhuma entrega disponível</p>
              <p class="text-sm mt-1" style="color: var(--gd-text-secondary)">
                Pedidos prontos na cozinha aparecerão aqui
              </p>
            </div>
          }
        </div>
      </div>
    </div>

    <ng-template #orderInfo let-order="order">
      <div class="flex items-start justify-between mb-3">
        <div>
          <p class="font-bold" style="color: var(--gd-text)">#{{ order.id }}</p>
          <p class="text-sm font-medium" style="color: var(--gd-text)">{{ order.customerName }}</p>
          <p class="text-xs" style="color: var(--gd-text-secondary)">{{ order.restaurantName }}</p>
        </div>
        <span
          class="text-xs font-bold px-2 py-1 rounded-full"
          [style.color]="getStatus(order.status).color"
          [style.backgroundColor]="getStatus(order.status).bgColor"
        >
          {{ getStatus(order.status).label }}
        </span>
      </div>
      <div class="bg-gd-bg rounded-xl p-3 mb-3">
        <div class="flex items-start gap-2">
          <svg lucideMapPin class="w-5 h-5 flex-shrink-0 mt-0.5" style="color: var(--gd-accent)"></svg>
          <div>
            <p class="text-sm font-medium" style="color: var(--gd-text)">{{ order.address }}</p>
            <p class="text-xs mt-1" style="color: var(--gd-text-secondary)">
              R$ {{ orderService.formatPrice(order.total) }} • {{ order.paymentMethod }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-1">
        @for (item of order.items; track item.id) {
          <p class="text-sm" style="color: var(--gd-text)">
            <span class="font-bold">{{ item.quantity }}x</span> {{ item.name }}
          </p>
        }
      </div>
    </ng-template>
  `,
})
export class DeliveryDashboardComponent implements OnInit {
  private router = inject(Router);
  private firebase = inject(FirebaseService);
  orderService = inject(OrderService);

  userName = '';
  driverId = '';

  myDeliveries = computed(() => this.orderService.getDeliveriesForDriver(this.driverId));

  ngOnInit(): void {
    const user = this.firebase.currentUser();
    if (!user || user.role !== 'delivery') {
      this.router.navigateByUrl('/login');
      return;
    }
    this.userName = user.name;
    this.driverId = user.uid;
  }

  getStatus = getOrderStatusDisplay;

  acceptDelivery(id: string): void {
    this.orderService.acceptDelivery(id, this.driverId, this.userName);
  }

  confirmDelivered(id: string): void {
    this.orderService.confirmDelivered(id);
  }

  async logout(): Promise<void> {
    await this.firebase.logout();
    this.router.navigateByUrl('/login');
  }
}