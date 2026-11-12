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
  { id: 'kraft', name: 'Крафтове', color: '#C9A27A', price: 0 },
  { id: 'transparent', name: 'Прозоре', color: '#E4EEF2', price: 0 },
  { id: 'black', name: 'Чорне', color: '#26282A', price: 60 },
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'red', name: 'Червона', color: '#C23B4E', price: 0 },
  { id: 'pink', name: 'Рожева', color: '#E9A5B5', price: 0 },
  { id: 'milk', name: 'Молочна', color: '#F4EBDD', price: 0 },
  { id: 'black', name: 'Чорна', color: '#26282A', price: 0 },
  { id: 'burgundy', name: 'Бордова', color: '#7A2F45', price: 30 },
];

/** Вартість листівки з текстом. */
export const GREETING_CARD_PRICE = 50;
/** Максимальна довжина тексту листівки. */
export const GREETING_CARD_MAX = 120;
