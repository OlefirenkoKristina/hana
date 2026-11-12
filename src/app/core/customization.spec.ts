import {
  bouquetTypeOf,
  choiceKey,
  customizationFor,
  customizedPrice,
  describeChoice,
  variantPhoto,
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

  it('ціна = база + доплати за опції (зараз платна лише листівка)', () => {
    const base = { packagingId: 'white-matte', ribbonId: 'red', cardText: '' };
    expect(customizedPrice(1000, base)).toBe(1000);
    expect(customizedPrice(1000, { ...base, packagingId: 'powder' })).toBe(1000);
    expect(customizedPrice(1000, { ...base, cardText: 'Привіт' })).toBe(1050);
    expect(customizedPrice(1000, { packagingId: null, ribbonId: null, cardText: '   ' })).toBe(1000);
  });

  it('опис вибору для кошика', () => {
    expect(describeChoice({ packagingId: null, ribbonId: null, cardText: '' })).toEqual([
      'Без пакування',
      'Без стрічки',
    ]);
    expect(describeChoice({ packagingId: 'powder', ribbonId: 'pink', cardText: 'Дякую' })).toEqual([
      'Пакування: пудрове',
      'Стрічка: рожева',
      'Листівка: «Дякую»',
    ]);
  });

  it('фото змінюється разом із пакуванням і стрічкою', () => {
    const red = PRODUCTS.find((p) => p.id === 'classic-red')!;
    expect(variantPhoto(red, 'S', 'powder', 'red')).toEqual({ src: 'flowers/classic-red-s-powder-red.webp', exact: true });
    expect(variantPhoto(red, 'S', null, 'pink')?.src).toContain('none-pink');
    expect(variantPhoto(red, 'S', null, 'blue')?.exact).toBe(true);
  });

  it('якщо точної комбінації немає — найближче фото з позначкою «умовне»', () => {
    const red = PRODUCTS.find((p) => p.id === 'classic-red')!;
    // пудрове з рожевою стрічкою не фотографували: беремо пудрове з іншою стрічкою
    expect(variantPhoto(red, 'S', 'powder', 'pink')).toEqual({ src: 'flowers/classic-red-s-powder-red.webp', exact: false });
    // такого пакування на фото немає зовсім: беремо фото з тією ж стрічкою
    expect(variantPhoto(red, 'S', 'unknown', 'pink')?.exact).toBe(false);
    // розмір без фото-варіантів
    expect(variantPhoto(red, 'M', 'powder', 'red')).toBeNull();
  });

  it('різні налаштування одного букета мають різні ключі в кошику', () => {
    const a = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: '' });
    const b = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'pink', cardText: '' });
    const c = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: 'Привіт' });
    expect(new Set([a, b, c]).size).toBe(3);
    expect(choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: '' })).toBe(a);
  });
});
