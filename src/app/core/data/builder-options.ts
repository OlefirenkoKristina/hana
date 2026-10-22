import { FlowerKind, PETAL } from '../models/art.model';

export interface BuilderFlower {
  id: string;
  name: string;
  kind: FlowerKind;
  color: string;
  /** Ціна за одне стебло, грн. */
  price: number;
}

export interface BuilderWrap {
  id: string;
  name: string;
  color: string;
  price: number;
}

export interface BuilderRibbon {
  id: string;
  name: string;
  color: string | null;
  price: number;
}

export interface BuilderExtra {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const BUILDER_FLOWERS: BuilderFlower[] = [
  { id: 'rose-red', name: 'Троянда червона', kind: 'rose', color: PETAL.red, price: 85 },
  { id: 'rose-pink', name: 'Троянда рожева', kind: 'rose', color: PETAL.pink, price: 85 },
  { id: 'rose-white', name: 'Троянда біла', kind: 'rose', color: PETAL.white, price: 80 },
  { id: 'rose-peach', name: 'Троянда персикова', kind: 'rose', color: PETAL.peach, price: 90 },
  { id: 'peony', name: 'Півонія', kind: 'peony', color: PETAL.blush, price: 160 },
  { id: 'tulip-yellow', name: 'Тюльпан жовтий', kind: 'tulip', color: PETAL.yellow, price: 45 },
  { id: 'tulip-pink', name: 'Тюльпан рожевий', kind: 'tulip', color: PETAL.pink, price: 45 },
  { id: 'daisy', name: 'Ромашка', kind: 'daisy', color: PETAL.white, price: 30 },
  { id: 'lavender', name: 'Лаванда', kind: 'lavender', color: PETAL.lavender, price: 35 },
  { id: 'eucalyptus', name: 'Евкаліпт', kind: 'eucalyptus', color: PETAL.green, price: 40 },
];

export const BUILDER_WRAPS: BuilderWrap[] = [
  { id: 'cream', name: 'Кремове', color: '#F3E6D3', price: 120 },
  { id: 'pink', name: 'Рожеве', color: '#F2C9D1', price: 120 },
  { id: 'burgundy', name: 'Бордове', color: '#7A2F45', price: 140 },
  { id: 'kraft', name: 'Крафт', color: '#C9A27A', price: 90 },
];

export const BUILDER_RIBBONS: BuilderRibbon[] = [
  { id: 'white', name: 'Біла атласна', color: '#FFFFFF', price: 40 },
  { id: 'rose', name: 'Пудрова', color: '#D99AA8', price: 40 },
  { id: 'berry', name: 'Ягідна', color: '#873F55', price: 40 },
  { id: 'none', name: 'Без стрічки', color: null, price: 0 },
];

export const BUILDER_EXTRAS: BuilderExtra[] = [
  { id: 'card', name: 'Листівка', description: 'З вашим текстом, написаним від руки', price: 50 },
  { id: 'topper', name: 'Топер «With love»', description: 'Дерев’яний напис у букеті', price: 90 },
  { id: 'sweets', name: 'Цукерки', description: 'Коробка бельгійських цукерок', price: 260 },
];

/** Фіксована вартість роботи флориста за збирання букета. */
export const ASSEMBLY_FEE = 100;
/** Максимальна кількість стебел в одному букеті. */
export const MAX_STEMS = 51;
