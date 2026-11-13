import {
  bouquetTypeOf,
  choiceKey,
  customizationFor,
  customizedPrice,
  describeChoice,
  variantPhoto,
} from './customization';
import { PACKAGING_OPTIONS, RIBBON_OPTIONS } from './data/customization-options';
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

  it('авторські букети не персоналізуються, троянди — так', () => {
    expect(customizationFor(author, false).enabled).toBe(false);
    expect(customizationFor(rose, true).enabled).toBe(true);
  });

  it('перевизначення в товарі має пріоритет', () => {
    const p = { ...rose, customization: { enabled: false, allowRibbon: false } };
    const cfg = customizationFor(p, true);
    expect(cfg.enabled).toBe(false);
    expect(cfg.allowRibbon).toBe(false);
    expect(cfg.allowPackaging).toBe(true);
  });

  it('ціна = база + доплати за пакування, стрічку й листівку', () => {
    const base = { packagingId: 'white-matte', ribbonId: 'milk', cardText: '' };
    expect(customizedPrice(1000, base)).toBe(1000);
    expect(customizedPrice(1000, { ...base, packagingId: 'powder' })).toBe(1100);
    expect(customizedPrice(1000, { ...base, packagingId: 'transparent', ribbonId: 'blue' })).toBe(1200);
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
    expect(variantPhoto(red, 'S', 'white-matte', 'pink')).toEqual({ src: 'flowers/classic-red-s-white-matte-pink.webp', exact: true });
    expect(variantPhoto(red, 'S', 'white-matte', 'blue')).toEqual({ src: 'flowers/classic-red-s-white-matte-blue.webp', exact: true });
  });

  it('є фото для кожної комбінації пакування й стрічки (розмір S)', () => {
    const red = PRODUCTS.find((p) => p.id === 'classic-red')!;
    for (const pack of PACKAGING_OPTIONS.map((o) => o.id).concat([null as unknown as string])) {
      for (const ribbon of RIBBON_OPTIONS.map((o) => o.id)) {
        expect(variantPhoto(red, 'S', pack, ribbon)?.exact, `${pack}|${ribbon}`).toBe(true);
      }
    }
  });

  it('якщо точної комбінації немає — найближче фото з позначкою «умовне»', () => {
    const red = PRODUCTS.find((p) => p.id === 'classic-red')!;
    // невідоме пакування: беремо фото з тією самою стрічкою, але позначаємо як умовне
    expect(variantPhoto(red, 'S', 'unknown', 'pink')?.exact).toBe(false);
    expect(variantPhoto(red, 'S', 'unknown', 'pink')?.src).toContain('-pink');
    // такого пакування на фото немає зовсім: беремо фото з тією ж стрічкою
    expect(variantPhoto(red, 'S', 'unknown', 'pink')?.exact).toBe(false);
    // розмір без власних фото-варіантів: беремо фото іншого розміру, але позначаємо як умовне
    const onlyS = { ...red, photoVariants: { S: red.photoVariants!.S } };
    expect(variantPhoto(onlyS, 'L', 'powder', 'red')).toEqual({ src: 'flowers/classic-red-s-powder-red.webp', exact: false });
    // розміри S, M і L мають власні фото — точний збіг
    expect(variantPhoto(red, 'M', 'powder', 'red')).toEqual({ src: 'flowers/classic-red-m-powder-red.webp', exact: true });
    expect(variantPhoto(red, 'L', 'powder', 'red')).toEqual({ src: 'flowers/classic-red-l-powder-red.webp', exact: true });
    // товар без фото-варіантів взагалі
    expect(variantPhoto(PRODUCTS.find((p) => !p.photoVariants)!, 'M', 'powder', 'red')).toBeNull();
  });

  it('різні налаштування одного букета мають різні ключі в кошику', () => {
    const a = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: '' });
    const b = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'pink', cardText: '' });
    const c = choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: 'Привіт' });
    expect(new Set([a, b, c]).size).toBe(3);
    expect(choiceKey('x', { size: 'M', packagingId: 'powder', ribbonId: 'red', cardText: '' })).toBe(a);
  });
});
