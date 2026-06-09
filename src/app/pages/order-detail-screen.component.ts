import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideArrowLeft,
  LucideCheckCircle,
  LucideClock,
  LucideMapPin,
  LucidePackage,
  LucideXCircle,
} from '@lucide/angular';
import { ImageWithFallbackComponent } from '../shared/image-with-fallback.component';
import { FirebaseService } from '../services/firebase.service';

interface OrderDetail {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  statusLabel: string;
  statusColor: string;
  statusBg: string;
  orderDate: string;
  deliveryTime: string;
  address: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-order-detail-screen',
  standalone: true,
  imports: [LucideArrowLeft, LucidePackage, LucideClock, LucideCheckCircle, LucideXCircle, LucideMapPin, ImageWithFallbackComponent],
  template: `
    <div class="w-full min-h-screen flex flex-col" style="background-color: var(--gd-bg)">
      <div class="w-full max-w-md mx-auto flex flex-col min-h-screen pb-8">
        <div class="px-6 pt-12 pb-4">
          <div class="flex items-center gap-4">
            <button
              type="button"
              (click)="router.navigateByUrl('/orders')"
              class="w-10 h-10 rounded-full bg-gd-surface flex items-center justify-center active:scale-90 transition-transform"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04)"
            >
              <svg lucideArrowLeft class="w-5 h-5" style="color: var(--gd-text)"></svg>
            </button>
            <h1 class="text-2xl font-bold" style="color: var(--gd-text)">Detalhes do pedido</h1>
          </div>
        </div>

        @if (order(); as o) {
          <div class="px-6 space-y-4">
            <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-14 h-14 rounded-xl overflow-hidden">
                  <app-image-with-fallback [src]="o.restaurantImage" [alt]="o.restaurantName" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="font-bold text-lg" style="color: var(--gd-text)">{{ o.restaurantName }}</p>
                  <p class="text-sm" style="color: var(--gd-text-secondary)">Pedido #{{ o.id }} • {{ o.orderDate }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2 p-3 rounded-xl" [style.background-color]="o.statusBg">
                @if (o.status === 'delivered') {
                  <svg lucideCheckCircle class="w-5 h-5" [style.color]="o.statusColor"></svg>
                } @else if (o.status === 'cancelled') {
                  <svg lucideXCircle class="w-5 h-5" [style.color]="o.statusColor"></svg>
                } @else {
                  <svg lucidePackage class="w-5 h-5" [style.color]="o.statusColor"></svg>
                }
                <span class="font-bold text-sm" [style.color]="o.statusColor">{{ o.statusLabel }}</span>
              </div>
            </div>

            <div class="bg-gd-surface rounded-2xl p-4" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)">
              <p class="font-bold mb-3" style="color: var(--gd-text)">Itens do pedido</p>
              @for (item of o.items; track item.name) {
                <div class="flex justify-between py-2 border-b last:border-0" style="border-color: var(--gd-border)">
                  <span class="text-sm" style="color: var(--gd-text)">{{ item.quantity }}x {{ item.name }}</span>
                  <span class="text-sm font-medium" style="color: var(--gd-text)">R$ {{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              }
              <div class="flex justify-between pt-3 mt-2">
                <span class="font-bold" style="color: var(--gd-text)">Total</span>
                <span class="font-bold text-lg" style="color: var(--gd-accent)">R$ {{ formatPrice(o.total) }}</span>
              </div>
            </div>

            <div class="bg-gd-surface rounded-2xl p-4 space-y-3" style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06)">
              <div class="flex items-start gap-3">
                <svg lucideMapPin class="w-5 h-5 mt-0.5 shrink-0" style="color: var(--gd-accent)"></svg>
                <div>
                  <p class="font-bold text-sm" style="color: var(--gd-text)">Endereço de entrega</p>
                  <p class="text-sm" style="color: var(--gd-text-secondary)">{{ o.address }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <svg lucideClock class="w-5 h-5 mt-0.5 shrink-0" style="color: var(--gd-accent)"></svg>
                <div>
                  <p class="font-bold text-sm" style="color: var(--gd-text)">Previsão de entrega</p>
                  <p class="text-sm" style="color: var(--gd-text-secondary)">{{ o.deliveryTime }}</p>
                </div>
              </div>
              <div>
                <p class="font-bold text-sm" style="color: var(--gd-text)">Pagamento</p>
                <p class="text-sm" style="color: var(--gd-text-secondary)">{{ o.paymentMethod }}</p>
              </div>
            </div>
          </div>
        } @else {
          <div class="flex-1 flex items-center justify-center px-6">
            <p style="color: var(--gd-text-secondary)">Pedido não encontrado.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class OrderDetailScreenComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private firebase = inject(FirebaseService);

  order = signal<OrderDetail | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const stateOrder = history.state?.order as OrderDetail | undefined;
    if (stateOrder && stateOrder.id === id) {
      this.order.set(stateOrder);
      return;
    }

    const user = this.firebase.currentUser();
    if (user) {
      try {
        const fbOrder = await this.firebase.getOrderById(id);
        if (fbOrder) {
          this.order.set(this.mapOrder(fbOrder));
          return;
        }
      } catch {
        /* fallback to mock */
      }
    }

    const mock = this.getMockOrder(id);
    if (mock) this.order.set(mock);
  }

  private mapOrder(o: any): OrderDetail {
    const status = this.normalizeStatus(o.status);
    const info = this.statusInfo(status);
    return {
      id: o.id,
      restaurantName: o.restaurantName,
      restaurantImage: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      items: (o.items || []).map((it: any) => ({ name: it.name, quantity: it.quantity || 1, price: it.priceValue || 0 })),
      total: o.total || 0,
      status,
      statusLabel: info.label,
      statusColor: info.color,
      statusBg: info.bg,
      orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString('pt-BR') : '',
      deliveryTime: '30-40 min',
      address: o.address || 'Endereço não informado',
      paymentMethod: 'Cartão de crédito',
    };
  }

  private getMockOrder(id: string): OrderDetail | null {
    const mocks: Record<string, OrderDetail> = {
      '1': {
        id: '1',
        restaurantName: 'Pasta & Vino',
        restaurantImage: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
        items: [
          { name: 'Pizza Margherita', quantity: 1, price: 45.9 },
          { name: 'Spaghetti Carbonara', quantity: 1, price: 36.9 },
          { name: 'Tiramisù', quantity: 1, price: 18.9 },
        ],
        total: 101.7,
        status: 'delivering',
        statusLabel: 'A caminho',
        statusColor: '#22C55E',
        statusBg: '#DCFCE7',
        orderDate: '02/06/2026',
        deliveryTime: '25-35 min',
        address: 'Rua das Flores, 142 – Jardins, São Paulo – SP',
        paymentMethod: 'PIX',
      },
      '2': {
        id: '2',
        restaurantName: 'Sushi Premium',
        restaurantImage: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzI0OTI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        items: [
          { name: 'Combo Sushi 30 peças', quantity: 1, price: 89.9 },
          { name: 'Temaki Salmão', quantity: 2, price: 25.9 },
        ],
        total: 141.7,
        status: 'delivered',
        statusLabel: 'Entregue',
        statusColor: '#22C55E',
        statusBg: '#DCFCE7',
        orderDate: '01/06/2026',
        deliveryTime: 'Entregue',
        address: 'Av. Paulista, 900 – Bela Vista, São Paulo – SP',
        paymentMethod: 'Cartão de crédito',
      },
      '3': {
        id: '3',
        restaurantName: 'Tacos Mexicanos',
        restaurantImage: 'https://images.unsplash.com/photo-1666307551772-943e4b88d564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MjU2NzMzOHww&ixlib=rb-4.1.0&q=80&w=1080',
        items: [{ name: 'Tacos de Carne', quantity: 3, price: 15.9 }],
        total: 47.7,
        status: 'delivered',
        statusLabel: 'Entregue',
        statusColor: '#22C55E',
        statusBg: '#DCFCE7',
        orderDate: '30/05/2026',
        deliveryTime: 'Entregue',
        address: 'Rua Oscar Freire, 500 – Jardins, São Paulo – SP',
        paymentMethod: 'Dinheiro',
      },
    };
    return mocks[id] || null;
  }

  private normalizeStatus(status: string): string {
    if (status === 'on_the_way') return 'delivering';
    return status || 'preparing';
  }

  private statusInfo(status: string): { label: string; color: string; bg: string } {
    const map: Record<string, { label: string; color: string; bg: string }> = {
      pending: { label: 'Aguardando confirmação', color: 'var(--gd-accent)', bg: 'var(--gd-border)' },
      preparing: { label: 'Preparando', color: 'var(--gd-accent)', bg: 'var(--gd-border)' },
      delivering: { label: 'A caminho', color: '#22C55E', bg: '#DCFCE7' },
      delivered: { label: 'Entregue', color: '#22C55E', bg: '#DCFCE7' },
      cancelled: { label: 'Cancelado', color: '#EF4444', bg: '#FEE2E2' },
    };
    return map[status] || map['preparing'];
  }

  formatPrice(v: number): string {
    return v.toFixed(2).replace('.', ',');
  }
}