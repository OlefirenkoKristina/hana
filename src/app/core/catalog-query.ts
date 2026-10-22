import { Category, FlowerColor, Occasion, Product, StemRange } from './models/product.model';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name' | 'new';

export const SORT_LABELS: Record<SortOption, string> = {
  popular: 'За популярністю',
  'price-asc': 'Від дешевих до дорогих',
  'price-desc': 'Від дорогих до дешевих',
  name: 'За назвою',
  new: 'Спочатку новинки',
};

export interface CatalogFilters {
  query: string;
  category: Category | null;
  minPrice: number | null;
  maxPrice: number | null;
  colors: FlowerColor[];
  occasions: Occasion[];
  stemRanges: StemRange[];
}

export const EMPTY_FILTERS: CatalogFilters = {
  query: '',
  category: null,
  minPrice: null,
  maxPrice: null,
  colors: [],
  occasions: [],
  stemRanges: [],
};

export function stemRangeOf(stems: number): StemRange {
  if (stems <= 10) return 'upTo10';
  if (stems <= 25) return 'from10to25';
  return 'over25';
}

/** Нормалізує рядок для пошуку: нижній регістр і уніфіковані апострофи. */
function normalize(text: string): string {
  return text.toLowerCase().replace(/[’'`ʼ]/g, "'").trim();
}

/**
 * Повертає товари, що відповідають усім активним фільтрам.
 * У межах однієї групи (кольори, приводи, кількість) діє «АБО»,
 * між групами — «І».
 */
export function filterProducts(products: Product[], f: CatalogFilters): Product[] {
  const query = normalize(f.query);

  return products.filter((p) => {
    if (query) {
      const haystack = normalize([p.name, p.short, ...p.composition].join(' '));
      if (!haystack.includes(query)) return false;
    }
    if (f.category && p.category !== f.category) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    if (f.colors.length && !f.colors.some((c) => p.colors.includes(c))) return false;
    if (f.occasions.length && !f.occasions.some((o) => p.occasions.includes(o))) return false;
    if (f.stemRanges.length && !f.stemRanges.includes(stemRangeOf(p.stems))) return false;
    return true;
  });
}

/** Сортує копію масиву, не змінюючи оригінал. */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    case 'new':
      return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case 'popular':
    default:
      return list.sort((a, b) => b.popularity - a.popularity);
  }
}

/** Кількість активних фільтрів (без пошукового рядка) — для лічильника на кнопці. */
export function countActiveFilters(f: CatalogFilters): number {
  return (
    (f.category ? 1 : 0) +
    (f.minPrice != null ? 1 : 0) +
    (f.maxPrice != null ? 1 : 0) +
    f.colors.length +
    f.occasions.length +
    f.stemRanges.length
  );
}
