import { PRODUCTS } from './data/products';
import {
  countActiveFilters,
  EMPTY_FILTERS,
  filterProducts,
  sortProducts,
  stemRangeOf,
} from './catalog-query';

describe('catalog-query', () => {
  describe('filterProducts', () => {
    it('без фільтрів повертає весь каталог', () => {
      expect(filterProducts(PRODUCTS, EMPTY_FILTERS)).toHaveLength(PRODUCTS.length);
    });

    it('шукає за назвою без урахування регістру', () => {
      const result = filterProducts(PRODUCTS, { ...EMPTY_FILTERS, query: 'pink DREAM' });
      expect(result.map((p) => p.id)).toEqual(['pink-dream']);
    });

    it('шукає за складом букета', () => {
      const result = filterProducts(PRODUCTS, { ...EMPTY_FILTERS, query: 'евкаліпт' });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.composition.some((c) => c.toLowerCase().includes('евкаліпт')))).toBe(true);
    });

    it('фільтрує за категорією', () => {
      const result = filterProducts(PRODUCTS, { ...EMPTY_FILTERS, category: 'roses' });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.category === 'roses')).toBe(true);
    });

    it('фільтрує за діапазоном цін включно з межами', () => {
      const result = filterProducts(PRODUCTS, { ...EMPTY_FILTERS, minPrice: 890, maxPrice: 1200 });
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.price >= 890 && p.price <= 1200)).toBe(true);
      expect(result.some((p) => p.price === 890)).toBe(true);
    });

    it('кольори в межах групи працюють як «АБО»', () => {
      const result = filterProducts(PRODUCTS, { ...EMPTY_FILTERS, colors: ['yellow', 'purple'] });
      expect(result.every((p) => p.colors.includes('yellow') || p.colors.includes('purple'))).toBe(true);
      expect(result.some((p) => p.colors.includes('yellow'))).toBe(true);
      expect(result.some((p) => p.colors.includes('purple'))).toBe(true);
    });

    it('різні групи фільтрів поєднуються як «І»', () => {
      const result = filterProducts(PRODUCTS, {
        ...EMPTY_FILTERS,
        colors: ['red'],
        occasions: ['date'],
        stemRanges: ['upTo10'],
      });
      expect(result.map((p) => p.id)).toEqual(['first-date']);
    });

    it('повертає порожній масив, якщо нічого не знайдено', () => {
      expect(filterProducts(PRODUCTS, { ...EMPTY_FILTERS, query: 'кактус' })).toEqual([]);
    });
  });

  describe('sortProducts', () => {
    it('сортує за зростанням ціни', () => {
      const prices = sortProducts(PRODUCTS, 'price-asc').map((p) => p.price);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    it('сортує за спаданням ціни', () => {
      const prices = sortProducts(PRODUCTS, 'price-desc').map((p) => p.price);
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });

    it('спочатку новинки', () => {
      const [first] = sortProducts(PRODUCTS, 'new');
      const newest = PRODUCTS.reduce((a, b) => (a.addedAt > b.addedAt ? a : b));
      expect(first.id).toBe(newest.id);
    });

    it('за популярністю першим іде найпопулярніший', () => {
      expect(sortProducts(PRODUCTS, 'popular')[0].id).toBe('pink-dream');
    });

    it('не змінює вихідний масив', () => {
      const before = PRODUCTS.map((p) => p.id);
      sortProducts(PRODUCTS, 'name');
      expect(PRODUCTS.map((p) => p.id)).toEqual(before);
    });
  });

  it('stemRangeOf визначає діапазон кількості квітів', () => {
    expect(stemRangeOf(9)).toBe('upTo10');
    expect(stemRangeOf(10)).toBe('upTo10');
    expect(stemRangeOf(11)).toBe('from10to25');
    expect(stemRangeOf(25)).toBe('from10to25');
    expect(stemRangeOf(31)).toBe('over25');
  });

  it('countActiveFilters рахує всі вибрані значення, крім пошуку', () => {
    expect(countActiveFilters(EMPTY_FILTERS)).toBe(0);
    expect(
      countActiveFilters({ ...EMPTY_FILTERS, query: 'x', category: 'roses', minPrice: 100, colors: ['red', 'pink'] }),
    ).toBe(4);
  });
});
