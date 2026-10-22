import { TestBed } from '@angular/core/testing';
import { NewCartItem } from '../models/cart-item.model';
import { CartService, DELIVERY_COST, FREE_DELIVERY_FROM, MAX_QUANTITY } from './cart.service';

const art = { stems: [], wrap: '#ffffff', ribbon: null };
const rose: NewCartItem = { key: 'rose:M', productId: 'rose', name: 'Rose', price: 500, art };
const tulip: NewCartItem = { key: 'tulip', productId: 'tulip', name: 'Tulip', price: 300, art };

describe('CartService', () => {
  let cart: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('спочатку кошик порожній', () => {
    expect(cart.isEmpty()).toBe(true);
    expect(cart.count()).toBe(0);
    expect(cart.subtotal()).toBe(0);
  });

  it('додає товар і рахує суму', () => {
    cart.add(rose, 2);
    cart.add(tulip);
    expect(cart.count()).toBe(3);
    expect(cart.subtotal()).toBe(500 * 2 + 300);
  });

  it('повторне додавання збільшує кількість, а не дублює позицію', () => {
    cart.add(rose);
    cart.add(rose);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0].quantity).toBe(2);
  });

  it('збільшує, зменшує та видаляє при нульовій кількості', () => {
    cart.add(rose);
    cart.increment(rose.key);
    expect(cart.items()[0].quantity).toBe(2);
    cart.decrement(rose.key);
    cart.decrement(rose.key);
    expect(cart.isEmpty()).toBe(true);
  });

  it('не дозволяє перевищити максимальну кількість', () => {
    cart.add(rose, MAX_QUANTITY + 10);
    expect(cart.items()[0].quantity).toBe(MAX_QUANTITY);
  });

  it('доставка платна до порогу й безкоштовна після нього', () => {
    cart.add(rose);
    expect(cart.deliveryCost('courier')).toBe(DELIVERY_COST);
    expect(cart.total('courier')).toBe(500 + DELIVERY_COST);

    cart.add(rose, FREE_DELIVERY_FROM / rose.price);
    expect(cart.deliveryCost('courier')).toBe(0);
  });

  it('самовивіз завжди безкоштовний', () => {
    cart.add(tulip);
    expect(cart.deliveryCost('pickup')).toBe(0);
    expect(cart.total('pickup')).toBe(300);
  });

  it('застосовує промокод і відхиляє невідомий', () => {
    cart.add(rose, 2);
    expect(cart.applyPromo('wrong')).toBe(false);
    expect(cart.discount()).toBe(0);

    expect(cart.applyPromo(' hana10 ')).toBe(true);
    expect(cart.promo()).toBe('HANA10');
    expect(cart.discount()).toBe(100);
    expect(cart.total('pickup')).toBe(900);
  });

  it('зберігає кошик у localStorage', () => {
    cart.add(tulip, 3);
    TestBed.tick();
    const saved = JSON.parse(localStorage.getItem('hana.cart')!);
    expect(saved[0]).toMatchObject({ key: 'tulip', quantity: 3 });
  });

  it('clear очищує товари та промокод', () => {
    cart.add(rose);
    cart.applyPromo('HANA10');
    cart.clear();
    expect(cart.isEmpty()).toBe(true);
    expect(cart.promo()).toBeNull();
  });
});
