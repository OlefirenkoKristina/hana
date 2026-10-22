import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem, NewCartItem } from '../models/cart-item.model';
import { DeliveryType } from '../models/order.model';
import { readStorage, writeStorage } from '../storage';

const CART_KEY = 'hana.cart';
const PROMO_KEY = 'hana.promo';

export const DELIVERY_COST = 150;
export const FREE_DELIVERY_FROM = 3000;
export const MAX_QUANTITY = 99;

/** Демонстраційні промокоди: код → знижка у відсотках. */
export const PROMO_CODES: Record<string, number> = {
  HANA10: 10,
  SPRING15: 15,
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(readStorage<CartItem[]>(CART_KEY, []));
  private readonly _promo = signal<string | null>(readStorage<string | null>(PROMO_KEY, null));

  readonly items = this._items.asReadonly();
  readonly promo = this._promo.asReadonly();

  readonly count = computed(() => this._items().reduce((sum, i) => sum + i.quantity, 0));
  readonly isEmpty = computed(() => this._items().length === 0);
  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  readonly discountPercent = computed(() => {
    const code = this._promo();
    return code ? (PROMO_CODES[code] ?? 0) : 0;
  });
  readonly discount = computed(() => Math.round((this.subtotal() * this.discountPercent()) / 100));

  constructor() {
    // Кошик зберігається між перезавантаженнями сторінки.
    effect(() => writeStorage(CART_KEY, this._items()));
    effect(() => writeStorage(PROMO_KEY, this._promo()));
  }

  /** Вартість доставки: самовивіз безкоштовний, кур'єр — безкоштовно від FREE_DELIVERY_FROM. */
  deliveryCost(type: DeliveryType): number {
    if (type === 'pickup' || this.isEmpty()) return 0;
    return this.subtotal() - this.discount() >= FREE_DELIVERY_FROM ? 0 : DELIVERY_COST;
  }

  total(type: DeliveryType): number {
    return this.subtotal() - this.discount() + this.deliveryCost(type);
  }

  add(item: NewCartItem, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.key === item.key);
      if (existing) {
        return items.map((i) =>
          i.key === item.key ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) } : i,
        );
      }
      return [...items, { ...item, quantity: Math.min(MAX_QUANTITY, quantity) }];
    });
  }

  setQuantity(key: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(key);
      return;
    }
    const next = Math.min(MAX_QUANTITY, Math.floor(quantity));
    this._items.update((items) => items.map((i) => (i.key === key ? { ...i, quantity: next } : i)));
  }

  increment(key: string): void {
    const item = this._items().find((i) => i.key === key);
    if (item) this.setQuantity(key, item.quantity + 1);
  }

  decrement(key: string): void {
    const item = this._items().find((i) => i.key === key);
    if (item) this.setQuantity(key, item.quantity - 1);
  }

  remove(key: string): void {
    this._items.update((items) => items.filter((i) => i.key !== key));
  }

  clear(): void {
    this._items.set([]);
    this._promo.set(null);
  }

  /** Повертає true, якщо код існує й застосований. */
  applyPromo(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (!(normalized in PROMO_CODES)) return false;
    this._promo.set(normalized);
    return true;
  }

  removePromo(): void {
    this._promo.set(null);
  }
}
