import { BouquetArtSpec } from './art.model';

export type Category = 'bouquets' | 'roses' | 'peonies' | 'hydrangeas';
/** Категорії, де розмір не обирається: товар продається в одному, стандартному розмірі. */
export const NO_SIZE_CATEGORIES: readonly Category[] = ['bouquets'];
export type FlowerColor = 'pink' | 'white' | 'red' | 'yellow' | 'purple' | 'peach';
export type Occasion = 'birthday' | 'date' | 'wedding' | 'thanks';
export type StemRange = 'upTo10' | 'from10to25' | 'over25';
export type SizeCode = 'S' | 'M' | 'L';
/** Тип готового букета: від нього залежать доступні налаштування персоналізації. */
export type BouquetType = 'author' | 'mono' | 'mixed';

/** Що саме можна змінити в готовому букеті. Склад квітів змінювати не можна ніколи. */
export interface CustomizationConfig {
  enabled: boolean;
  allowSize: boolean;
  allowPackaging: boolean;
  allowNoPackaging: boolean;
  allowRibbon: boolean;
  allowGreetingCard: boolean;
  /** Дозволені варіанти пакування (id із каталогу опцій). */
  packagingIds: string[];
  /** Дозволені варіанти стрічок (id із каталогу опцій). */
  ribbonIds: string[];
}

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
  /** Тип букета. Якщо не задано — визначається за категорією та складом. */
  type?: BouquetType;
  /** Перевизначення налаштувань персоналізації для цього букета. */
  customization?: Partial<CustomizationConfig>;
  /** Шлях до фотографії. Якщо не задано — показується SVG-ілюстрація. */
  image?: string;
  /** Власні розміри з реальними фото. Для розмірів, яких тут немає, лишається розрахунок за замовчуванням. */
  sizeOverrides?: Partial<Record<SizeCode, { stems: number; price: number; image?: string }>>;
}

export interface ProductSize {
  code: SizeCode;
  label: string;
  stems: number;
  price: number;
  /** Фото саме цього розміру (якщо є). */
  image?: string;
}

export const BOUQUET_TYPE_LABELS: Record<BouquetType, string> = {
  author: 'Авторський букет',
  mono: 'Монобукет',
  mixed: 'Змішаний букет',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  bouquets: 'Авторські букети',
  roses: 'Троянди',
  peonies: 'Півонії',
  hydrangeas: 'Гортензії',
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
