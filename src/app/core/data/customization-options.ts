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
  { id: 'powder', name: 'Пудрове', color: '#E9C5C8', price: 0 },
  { id: 'transparent', name: 'Прозоре', color: '#E4EEF2', price: 0 },
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'red', name: 'Червона', color: '#C23B4E', price: 0 },
  { id: 'pink', name: 'Рожева', color: '#E9A5B5', price: 0 },
  { id: 'milk', name: 'Біла', color: '#FFFFFF', price: 0 },
  { id: 'blue', name: 'Блакитна', color: '#9DB8DA', price: 0 },
];

/** Вартість листівки з текстом. */
export const GREETING_CARD_PRICE = 50;
/** Максимальна довжина тексту листівки. */
export const GREETING_CARD_MAX = 120;
