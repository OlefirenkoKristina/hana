import { BouquetArtSpec } from './art.model';

export type Category = 'bouquets' | 'roses' | 'tulips' | 'peonies' | 'seasonal' | 'potted';
export type FlowerColor = 'pink' | 'white' | 'red' | 'yellow' | 'purple' | 'peach';
export type Occasion = 'birthday' | 'date' | 'wedding' | 'thanks';
export type StemRange = 'upTo10' | 'from10to25' | 'over25';
export type SizeCode = 'S' | 'M' | 'L';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stems: number;
  colors: FlowerColor[];
  occasions: Occasion[];
  short: string;
  description: string;
  composition: string[];
  badge?: 'new' | 'hit';
  /** Чим більше — тим вище в сортуванні «За популярністю». */
  popularity: number;
  /** ISO-дата появи в каталозі — для сортування «Спочатку новинки». */
  addedAt: string;
  art: BouquetArtSpec;
  /** Шлях до фотографії. Якщо не задано — показується SVG-ілюстрація. */
  image?: string;
}

export interface ProductSize {
  code: SizeCode;
  label: string;
  stems: number;
  price: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  bouquets: 'Авторські букети',
  roses: 'Троянди',
  tulips: 'Тюльпани',
  peonies: 'Півонії',
  seasonal: 'Сезонні квіти',
  potted: 'Квіти в горщиках',
};

export const COLOR_LABELS: Record<FlowerColor, string> = {
  pink: 'Рожевий',
  white: 'Білий',
  red: 'Червоний',
  yellow: 'Жовтий',
  purple: 'Фіолетовий',
  peach: 'Персиковий',
};

/** Колір кружечка-зразка у фільтрі. */
export const COLOR_SWATCHES: Record<FlowerColor, string> = {
  pink: '#F2A7B8',
  white: '#FBF4EC',
  red: '#C23B4E',
  yellow: '#F4CF62',
  purple: '#9C83CC',
  peach: '#F6B89A',
};

export const OCCASION_LABELS: Record<Occasion, string> = {
  birthday: 'День народження',
  date: 'Побачення',
  wedding: 'Весілля',
  thanks: 'Подяка',
};

export const STEM_RANGE_LABELS: Record<StemRange, string> = {
  upTo10: 'До 10',
  from10to25: '10–25',
  over25: 'Понад 25',
};
