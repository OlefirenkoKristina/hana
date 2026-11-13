/** Спільний каталог пакування та стрічок для персоналізації готових букетів. */

export interface PackagingOption {
  id: string;
  name: string;
  /** Колір зразка в інтерфейсі. */
  color: string;
  /** Доплата до ціни букета, грн. */
  price: number;
}

export interface RibbonOption {
  id: string;
  name: string;
  color: string;
  price: number;
}

export const PACKAGING_OPTIONS: PackagingOption[] = [
  { id: 'white-matte', name: 'Біле матове', color: '#F6F2EC', price: 0 },
  { id: 'powder', name: 'Пудрове', color: '#E9C5C8', price: 100 },
  { id: 'transparent', name: 'Прозоре', color: '#E4EEF2', price: 150 },
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  // перша в списку — стрічка за замовчуванням: біла, безкоштовна
  { id: 'milk', name: 'Біла', color: '#FFFFFF', price: 0 },
  { id: 'red', name: 'Червона', color: '#C23B4E', price: 30 },
  { id: 'pink', name: 'Рожева', color: '#E9A5B5', price: 30 },
  { id: 'blue', name: 'Блакитна', color: '#9DB8DA', price: 50 },
];

/** Вартість листівки з текстом. */
export const GREETING_CARD_PRICE = 50;
/** Максимальна довжина тексту листівки. */
export const GREETING_CARD_MAX = 120;
