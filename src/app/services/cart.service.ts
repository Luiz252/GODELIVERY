import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  extras?: string;
}

const STORAGE_KEY = 'godelivery_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>(this.loadFromStorage());
  deliveryFee = signal(8.9);

  itemCount = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));

  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  total = computed(() => this.subtotal() + this.deliveryFee());

  addItem(item: Omit<CartItem, 'quantity'> & { quantity?: number }): void {
    const qty = item.quantity ?? 1;
    const current = this.items();
    const existing = current.find((i) => i.id === item.id);

    let next: CartItem[];
    if (existing) {
      next = current.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
      );
    } else {
      next = [...current, { ...item, quantity: qty }];
    }

    this.persist(next);
  }

  updateQuantity(id: string, delta: number): void {
    const next = this.items()
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
    this.persist(next);
  }

  removeItem(id: string): void {
    this.persist(this.items().filter((item) => item.id !== id));
  }

  clear(): void {
    this.persist([]);
  }

  itemsForRestaurant(restaurantId: string): CartItem[] {
    return this.items().filter((i) => i.restaurantId === restaurantId);
  }

  restaurantSubtotal(restaurantId: string): number {
    return this.itemsForRestaurant(restaurantId).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  restaurantItemCount(restaurantId: string): number {
    return this.itemsForRestaurant(restaurantId).reduce((sum, item) => sum + item.quantity, 0);
  }

  private persist(items: CartItem[]): void {
    this.items.set(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}