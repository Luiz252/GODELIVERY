import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideBarChart3,
  LucideChefHat,
  LucideClock,
  LucideLogOut,
  LucidePackage,
  LucideStore,
  LucideTruck,
  LucideXCircle,
} from '@lucide/angular';
import { DeliveryOrder, OrderService } from '../services/order.service';
import { FirebaseService } from '../services/firebase.service';
import { getOrderStatusDisplay } from '../utils/order-status.util';

type OwnerTab = 'overview' | 'orders';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    LucideBarChart3,
    LucideChefHat,
    LucideClock,
    LucideLogOut,
    LucidePackage,
    LucideStore,
    LucideTruck,
    LucideXCircle,
  ],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen">
        <div class="px-6 pt-12 pb-4" style="background: linear-gradient(135deg, #7c2d12, var(--gd-accent))">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <svg lucideStore class="w-6 h-6 text-white"></svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-white">Painel do Dono</h1>
                <p class="text-sm text-white/80">Pasta & Vino</p>
              </div>
            </div>
            <button type="button" (click)="logout()" class="p-2 rounded-full bg-white/20 active:scale-95" aria-label="Sair">
              <svg lucideLogOut class="w-5 h-5 text-white"></svg>
            </button>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 py-2 rounded-xl text-sm font-bold transition-colors"
              [style.backgroundColor]="activeTab() === 'overview' ? 'white' : 'rgba(255,255,255,0.15)'"
              [style.color]="activeTab() === 'overview' ? 'var(--gd-accent)' : 'white'"
              (click)="activeTab.set('overview')"
            >
              Visão geral
            </button>
            <button
              type="button"
              class="flex-1 py-2 rounded-xl text-sm font-bold transition-colors"
              [style.backgroundColor]="activeTab() === 'orders' ? 'white' : 'rgba(255,255,255,0.15)'"
              [style.color]="activeTab() === 'orders' ? 'var(--gd-accent)' : 'white'"
              (click)="activeTab.set('orders')"
            >
              Todos os pedidos
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-4 pb-8">
          @if (activeTab() === 'overview') {
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                <svg lucidePackage class="w-5 h-5 mb-2" style="color: var(--gd-accent)"></svg>
                <p class="text-2xl font-bold" style="color: var(--gd-text)">{{ orderService.stats().today }}</p>
                <p class="text-xs" style="color: var(--gd-text-secondary)">Pedidos hoje</p>
              </div>
              <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                <svg lucideBarChart3 class="w-5 h-5 mb-2" style="color: #16A34A"></svg>
                <p class="text-2xl font-bold" style="color: var(--gd-text)">R$ {{ orderService.formatPrice(orderService.stats().todayRevenue) }}</p>
                <p class="text-xs" style="color: var(--gd-text-secondary)">Faturamento hoje</p>
              </div>
              <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                <svg lucideChefHat class="w-5 h-5 mb-2" style="color: #D97706"></svg>
                <p class="text-2xl font-bold" style="color: var(--gd-text)">{{ orderService.stats().preparing + orderService.stats().pending }}</p>
                <p class="text-xs" style="color: var(--gd-text-secondary)">Na cozinha</p>
              </div>
              <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px var(--gd-shadow)">
                <svg lucideTruck class="w-5 h-5 mb-2" style="color: #2563EB"></svg>
                <p class="text-2xl font-bold" style="color: var(--gd-text)">{{ orderService.stats().delivering + orderService.stats().ready }}</p>
                <p class="text-xs" style="color: var(--gd-text-secondary)">Em entrega</p>
              </div>
            </div>

            <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">
              Fluxo em tempo real
            </h2>
            <div class="space-y-2 mb-6">
              @for (step of flowSteps; track step.label) {
                <div class="flex items-center gap-3 bg-gd-surface rounded-xl p-3" style="box-shadow: 0 2px 8px var(--gd-shadow)">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" [style.backgroundColor]="step.color">
                    {{ step.count }}
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-sm" style="color: var(--gd-text)">{{ step.label }}</p>
                    <p class="text-xs" style="color: var(--gd-text-secondary)">{{ step.description }}</p>
                  </div>
                </div>
              }
            </div>

            <h2 class="text-sm font-bold uppercase tracking-wide mb-3" style="color: var(--gd-text-secondary)">
              Pedidos ativos
            </h2>
            @for (order of orderService.activeOrders(); track order.id) {
              <ng-container [ngTemplateOutlet]="orderCard" [ngTemplateOutletContext]="{ order: order }"></ng-container>
            } @empty {
              <p class="text-sm text-center py-8" style="color: var(--gd-text-secondary)">Nenhum pedido ativo no momento</p>
            }
          } @else {
            @for (order of orderService.allOrders(); track order.id) {
              <ng-container [ngTemplateOutlet]="orderCard" [ngTemplateOutletContext]="{ order: order }"></ng-container>
            }
          }
        </div>
      </div>
    </div>

    <ng-template #orderCard let-order="order">
      <div class="bg-gd-surface rounded-2xl p-4 mb-3" style="box-shadow: 0 4px 12px var(--gd-shadow)">
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-bold" style="color: var(--gd-text)">#{{ order.id }}</p>
            <p class="text-sm" style="color: var(--gd-text-secondary)">{{ order.customerName }} • {{ order.restaurantName }}</p>
          </div>
          <span
            class="text-xs font-bold px-2 py-1 rounded-full"
            [style.color]="getStatus(order.status).color"
            [style.backgroundColor]="getStatus(order.status).bgColor"
          >
            {{ getStatus(order.status).label }}
          </span>
        </div>
        <p class="text-sm mb-2" style="color: var(--gd-text)">
          @for (item of order.items; track item.id; let last = $last) {
            {{ item.quantity }}x {{ item.name }}@if (!last) {, }
          }
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1 text-xs" style="color: var(--gd-text-secondary)">
            <svg lucideClock class="w-3 h-3"></svg>
            {{ orderService.formatDate(order.createdAt) }}
          </div>
          <p class="font-bold" style="color: var(--gd-accent)">R$ {{ orderService.formatPrice(order.total) }}</p>
        </div>
        @if (order.deliveryDriverName) {
          <p class="text-xs mt-2" style="color: var(--gd-text-secondary)">Motoboy: {{ order.deliveryDriverName }}</p>
        }
        @if (!['delivered', 'cancelled'].includes(order.status)) {
          <button
            type="button"
            class="w-full mt-3 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95"
            style="background-color: #FEE2E2; color: #DC2626"
            (click)="cancelOrder(order.id)"
          >
            <svg lucideXCircle class="w-4 h-4"></svg>
            Cancelar pedido
          </button>
        }
      </div>
    </ng-template>
  `,
})
export class OwnerDashboardComponent implements OnInit {
  private router = inject(Router);
  private firebase = inject(FirebaseService);
  orderService = inject(OrderService);

  activeTab = signal<OwnerTab>('overview');

  get flowSteps() {
    const s = this.orderService.stats();
    return [
      { label: 'Aguardando cozinha', description: 'Pedidos novos', count: s.pending, color: '#D97706' },
      { label: 'Em preparo', description: 'Cozinha trabalhando', count: s.preparing, color: 'var(--gd-accent)' },
      { label: 'Pronto', description: 'Aguardando motoboy', count: s.ready, color: '#2563EB' },
      { label: 'A caminho', description: 'Motoboy entregando', count: s.delivering, color: '#16A34A' },
      { label: 'Entregues', description: 'Concluídos', count: s.delivered, color: '#15803D' },
    ];
  }

  ngOnInit(): void {
    const user = this.firebase.currentUser();
    if (!user || user.role !== 'owner') {
      this.router.navigateByUrl('/login');
      return;
    }
  }

  getStatus = getOrderStatusDisplay;

  cancelOrder(id: string): void {
    this.orderService.cancelOrder(id);
  }

  async logout(): Promise<void> {
    await this.firebase.logout();
    this.router.navigateByUrl('/login');
  }
}