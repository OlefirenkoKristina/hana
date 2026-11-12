import {
  bouquetTypeOf,
  choiceKey,
  customizationFor,
  customizedPrice,
  describeChoice,
} from './customization';
import { PRODUCTS } from './data/products';

describe('персоналізація готових букетів', () => {
  const rose = PRODUCTS.find((p) => p.category === 'roses')!;
  const author = PRODUCTS.find((p) => p.category === 'bouquets')!;

  it('троянди, півонії й гортензії — монобукети з вибором розміру', () => {
    expect(bouquetTypeOf(rose)).toBe('mono');
    expect(customizationFor(rose, true).allowSize).toBe(true);
  });

  it('авторські й змішані букети не мають вибору розміру', () => {
    expect(['author', 'mixed']).toContain(bouquetTypeOf(author));
    expect(customizationFor(author, false).allowSize).toBe(false);
  });

  it('перевизначення в товарі має пріоритет', () => {
    const p = { ...rose, customization: { enabled: false, allowRibbon: false } };
    const cfg = customizationFor(p, true);
    expect(cfg.enabled).toBe(false);
    expect(cfg.allowRibbon).toBe(false);
    expect(cfg.allowPackaging).toBe(true);
  });

  it('ціна = база + доплати за пакування, стрічку й листівку', () => {
    const base = { packagingId: 'white-matte', ribbonId: 'red', cardText: '' };
    expect(customizedPrice(1000, base)).toBe(1000);
    expect(customizedPrice(1000, { ...base, packagingId: 'black' })).toBe(1060);
    expect(customizedPrice(1000, { ...base, ribbonId: 'burgundy' })).toBe(1030);
    expect(customizedPrice(1000, { ...base, cardText: 'Привіт' })).toBe(1050);
    expect(customizedPrice(1000, { packagingId: null, ribbonId: null, cardText: '   ' })).toBe(1000);
  });

  it('опис вибору для кошика', () => {
    expect(describeChoice({ packagingId: null, ribbonId: null, cardText: '' })).toEqual([
      'Без пакування',
      'Без стрічки',
    ]);
    expect(describeChoice({ packagingId: 'kraft', ribbonId: 'pink', cardText: 'Дякую' })).toEqual([
      'Пакування: крафтове',
      'Стрічка: рожева',
      'Листівка: «Дякую»',
    ]);
  });

  it('різні налаштування одного букета мають різні ключі в кошику', () => {
    const a = choiceKey('x', { size: 'M', packagingId: 'kraft', ribbonId: 'red', cardText: '' });
    const b = choiceKey('x', { size: 'M', packagingId: 'kraft', ribbonId: 'pink', cardText: '' });
    const c = choiceKey('x', { size: 'M', packagingId: 'kraft', ribbonId: 'red', cardText: 'Привіт' });
    expect(new Set([a, b, c]).size).toBe(3);
    expect(choiceKey('x', { size: 'M', packagingId: 'kraft', ribbonId: 'red', cardText: '' })).toBe(a);
  });
});
