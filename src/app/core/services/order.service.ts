import { inject, Injectable, signal } from '@angular/core';
import { Order, OrderCustomer, OrderDelivery, PaymentMethod } from '../models/order.model';
import { readStorage, writeStorage } from '../storage';
import { CartService } from './cart.service';

const LAST_ORDER_KEY = 'hana.lastOrder';

/**
 * Локальна симуляція оформлення замовлення. Сайт не має серверної частини,
 * тому замовлення не передається магазину — воно лише зберігається в браузері,
 * щоб показати сторінку підтвердження.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);
  private readonly _lastOrder = signal<Order | null>(readStorage<Order | null>(LAST_ORDER_KEY, null));

  readonly lastOrder = this._lastOrder.asReadonly();

  place(customer: OrderCustomer, delivery: OrderDelivery, payment: PaymentMethod): Order {
    const order: Order = {
      number: this.generateNumber(),
      createdAt: new Date().toISOString(),
      customer,
      delivery,
      payment,
      items: this.cart.items(),
      subtotal: this.cart.subtotal(),
      discount: this.cart.discount(),
      deliveryCost: this.cart.deliveryCost(delivery.type),
      total: this.cart.total(delivery.type),
    };

    this._lastOrder.set(order);
    writeStorage(LAST_ORDER_KEY, order);
    this.cart.clear();
    return order;
  }

  /** Номер виду HN-260622-4831: дата + випадкові цифри. */
  private generateNumber(): string {
    const now = new Date();
    const date = [now.getFullYear() % 100, now.getMonth() + 1, now.getDate()]
      .map((n) => String(n).padStart(2, '0'))
      .join('');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `HN-${date}-${random}`;
  }
}
