import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideChefHat, LucideLogOut, LucideMapPin, LucidePackage } from '@lucide/angular';
import { DeliveryOrder, OrderService } from '../services/order.service';
import { FirebaseService } from '../services/firebase.service';
import { getOrderStatusDisplay } from '../utils/order-status.util';

@Component({
  selector: 'app-kitchen-dashboard',
  standalone: true,
  imports: [NgTemplateOutlet, LucideChefHat, LucideLogOut, LucideMapPin, LucidePackage],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="px-6 pt-12 pb-4" style="background: linear-gradient(135deg, var(--gd-accent-dark), var(--gd-accent))">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <svg lucideChefHat class="w-6 h-6 text-white"></svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white">Cozinha</h1>
                <p class="text-sm text-white/80">{{ userName }}</p>
              </div>
            </div>
            <button type="button" (click)="logout()" class="p-2 rounded-full bg-white/20 active:scale-95" aria-label="Sair">
              <svg lucideLogOut class="w-5 h-5 text-white"></svg>
            </button>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div class="bg-white/15 rounded-xl p-3 text-center">
              <p class="text-2xl font-bold text-white">{{ orderService.pendingOrders().length }}</p>
              <p class="text-xs text-white/80">Novos</p>
            </div>
            <div class="bg-white/15 rounded-xl p-3 text-center">
              <p class="text-2xl font-bold text-white">{{ orderService.preparingOrders().length }}</p>
              <p class="text-xs text-white/80">Preparando</p>
            </div>
            <div class="bg-white/15 rounded-xl p-3 text-center">
              <p class="text-2xl font-bold text-white">{{ orderService.readyOrders().length }}</p>
              <p class="text-xs text-white/80">Prontos</p>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4 pb-8 space-y-6">
          @if (orderService.pendingOrders().length > 0) {
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">Novos pedidos</h2>
              @for (order of orderService.pendingOrders(); track order.id) {
                <div class="bg-gd-surface rounded-2xl p-4 mb-3" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                  <ng-container [ngTemplateOutlet]="orderInfo" [ngTemplateOutletContext]="{ order: order }"></ng-container>
                  <button type="button" class="w-full mt-3 py-3 rounded-xl font-bold text-white active:scale-95" style="background-color: var(--gd-accent)" (click)="acceptOrder(order.id)">Iniciar preparo</button>
                </div>
              }
            </section>
          }

          @if (orderService.preparingOrders().length > 0) {
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">Em preparo</h2>
              @for (order of orderService.preparingOrders(); track order.id) {
                <div class="bg-gd-surface rounded-2xl p-4 mb-3" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                  <ng-container [ngTemplateOutlet]="orderInfo" [ngTemplateOutletContext]="{ order: order }"></ng-container>
                  <button type="button" class="w-full mt-3 py-3 rounded-xl font-bold text-white active:scale-95" style="background-color: #2563EB" (click)="markReady(order.id)">Pronto para entrega</button>
                </div>
              }
            </section>
          }

          @if (orderService.readyOrders().length > 0) {
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">Aguardando motoboy</h2>
              @for (order of orderService.readyOrders(); track order.id) {
                <div class="bg-gd-surface rounded-2xl p-4 mb-3" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                  <ng-container [ngTemplateOutlet]="orderInfo" [ngTemplateOutletContext]="{ order: order }"></ng-container>
                  <p class="text-center text-sm font-medium mt-3" style="color: #2563EB">Aguardando motoboy retirar...</p>
                </div>
              }
            </section>
          }

          @if (orderService.pendingOrders().length === 0 && orderService.preparingOrders().length === 0 && orderService.readyOrders().length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-center">
              <svg lucidePackage class="w-16 h-16 mb-4" style="color: var(--gd-border)"></svg>
              <p class="font-bold text-lg" style="color: var(--gd-text)">Nenhum pedido na cozinha</p>
              <p class="text-sm mt-1" style="color: var(--gd-text-secondary)">Novos pedidos aparecerão aqui automaticamente</p>
            </div>
          }
        </div>
      </div>
    </div>

    <ng-template #orderInfo let-order="order">
      <div class="flex items-start justify-between mb-3">
        <div>
          <p class="font-bold" style="color: var(--gd-text)">#{{ order.id }}</p>
          <p class="text-sm" style="color: var(--gd-text-secondary)">{{ order.customerName }}</p>
        </div>
        <span class="text-xs font-bold px-2 py-1 rounded-full" [style.color]="getStatus(order.status).color" [style.backgroundColor]="getStatus(order.status).bgColor">{{ getStatus(order.status).label }}</span>
      </div>
      <div class="space-y-1 mb-3">
        @for (item of order.items; track item.id) {
          <p class="text-sm" style="color: var(--gd-text)"><span class="font-bold">{{ item.quantity }}x</span> {{ item.name }}</p>
        }
      </div>
      <div class="flex items-center gap-2 text-xs" style="color: var(--gd-text-secondary)">
        <svg lucideMapPin class="w-4 h-4" style="color: var(--gd-accent)"></svg>
        <span>{{ order.address }}</span>
      </div>
    </ng-template>
  `,
})
export class KitchenDashboardComponent implements OnInit {
  private router = inject(Router);
  private firebase = inject(FirebaseService);
  orderService = inject(OrderService);

  userName = '';

  ngOnInit(): void {
    const user = this.firebase.currentUser();
    if (!user || user.role !== 'kitchen') {
      this.router.navigateByUrl('/login');
      return;
    }
    this.userName = user.name;
  }

  getStatus = getOrderStatusDisplay;

  acceptOrder(id: string): void {
    this.orderService.acceptForKitchen(id);
  }

  markReady(id: string): void {
    this.orderService.markReady(id);
  }

  async logout(): Promise<void> {
    await this.firebase.logout();
    this.router.navigateByUrl('/login');
  }
}