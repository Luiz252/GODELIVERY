import { Injectable, computed, signal } from '@angular/core';

export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type UserRole = 'customer' | 'kitchen' | 'delivery' | 'owner';

export interface OrderItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
}

export interface DeliveryOrder {
  id: string;
  userId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  deliveryDriverId?: string;
  deliveryDriverName?: string;
}

const STORAGE_KEY = 'godelivery_orders';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc3MjUxMzA3OXww&ixlib=rb-4.1.0&q=80&w=1080';

function nowIso(): string {
  return new Date().toISOString();
}

function seedOrders(): DeliveryOrder[] {
  const t = nowIso();
  return [
    {
      id: 'PED-1001',
      userId: 'demo-cliente',
      customerName: 'Maria Silva',
      restaurantId: '2',
      restaurantName: 'Pasta & Vino',
      restaurantImage: DEFAULT_IMAGE,
      items: [
        { id: '1', name: 'Pizza Margherita', price: 'R$ 45,90', priceValue: 45.9, quantity: 1 },
        { id: '2', name: 'Tiramisù', price: 'R$ 18,90', priceValue: 18.9, quantity: 1 },
      ],
      total: 64.8,
      status: 'pending',
      address: 'Rua das Flores, 123 - Apto 45',
      paymentMethod: 'PIX',
      createdAt: t,
      updatedAt: t,
    },
    {
      id: 'PED-1002',
      userId: 'demo-cliente',
      customerName: 'João Santos',
      restaurantId: '2',
      restaurantName: 'Pasta & Vino',
      restaurantImage: DEFAULT_IMAGE,
      items: [
        { id: '3', name: 'Lasanha Bolonhesa', price: 'R$ 38,90', priceValue: 38.9, quantity: 2 },
      ],
      total: 77.8,
      status: 'preparing',
      address: 'Av. Paulista, 1000 - Sala 1501',
      paymentMethod: 'Cartão de crédito',
      createdAt: t,
      updatedAt: t,
    },
  ];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSignal = signal<DeliveryOrder[]>(this.loadOrders());

  allOrders = this.ordersSignal.asReadonly();

  pendingOrders = computed(() => this.ordersSignal().filter((o) => o.status === 'pending'));
  preparingOrders = computed(() => this.ordersSignal().filter((o) => o.status === 'preparing'));
  readyOrders = computed(() => this.ordersSignal().filter((o) => o.status === 'ready'));
  activeOrders = computed(() =>
    this.ordersSignal().filter((o) => !['delivered', 'cancelled'].includes(o.status))
  );

  stats = computed(() => {
    const orders = this.ordersSignal();
    const today = new Date().toLocaleDateString('pt-BR');
    const todayOrders = orders.filter(
      (o) => new Date(o.createdAt).toLocaleDateString('pt-BR') === today
    );
    return {
      total: orders.length,
      today: todayOrders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      delivering: orders.filter((o) => o.status === 'on_the_way').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      revenue: orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0),
      todayRevenue: todayOrders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + o.total, 0),
    };
  });

  getOrdersForCustomer(userId: string): DeliveryOrder[] {
    return this.ordersSignal()
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOrderById(id: string): DeliveryOrder | undefined {
    return this.ordersSignal().find((o) => o.id === id);
  }

  createOrder(input: {
    userId: string;
    customerName: string;
    restaurantId: string;
    restaurantName: string;
    restaurantImage?: string;
    items: OrderItem[];
    total: number;
    address: string;
    paymentMethod: string;
  }): DeliveryOrder {
    const t = nowIso();
    const order: DeliveryOrder = {
      id: `PED-${Date.now().toString().slice(-6)}`,
      userId: input.userId,
      customerName: input.customerName,
      restaurantId: input.restaurantId,
      restaurantName: input.restaurantName,
      restaurantImage: input.restaurantImage || DEFAULT_IMAGE,
      items: input.items,
      total: input.total,
      status: 'pending',
      address: input.address,
      paymentMethod: input.paymentMethod,
      createdAt: t,
      updatedAt: t,
    };
    const next = [order, ...this.ordersSignal()];
    this.persist(next);
    return order;
  }

  updateStatus(id: string, status: OrderStatus, extra?: Partial<DeliveryOrder>): void {
    const next = this.ordersSignal().map((o) =>
      o.id === id ? { ...o, ...extra, status, updatedAt: nowIso() } : o
    );
    this.persist(next);
  }

  acceptForKitchen(id: string): void {
    this.updateStatus(id, 'preparing');
  }

  markReady(id: string): void {
    this.updateStatus(id, 'ready');
  }

  acceptDelivery(id: string, driverId: string, driverName: string): void {
    this.updateStatus(id, 'on_the_way', {
      deliveryDriverId: driverId,
      deliveryDriverName: driverName,
    });
  }

  confirmDelivered(id: string): void {
    this.updateStatus(id, 'delivered');
  }

  cancelOrder(id: string): void {
    this.updateStatus(id, 'cancelled');
  }

  getDeliveriesForDriver(driverId: string): DeliveryOrder[] {
    return this.ordersSignal().filter(
      (o) => o.status === 'on_the_way' && o.deliveryDriverId === driverId
    );
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private persist(orders: DeliveryOrder[]): void {
    this.ordersSignal.set(orders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  private loadOrders(): DeliveryOrder[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DeliveryOrder[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    const seeded = seedOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}