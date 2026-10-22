/** Види квітів, які вміє малювати компонент BouquetArt. */
export type FlowerKind = 'rose' | 'tulip' | 'peony' | 'daisy' | 'lavender' | 'eucalyptus' | 'orchid';

/** Квіти-«зелень» малюються позаду головок як гілочки. */
export const GREENERY: readonly FlowerKind[] = ['eucalyptus', 'lavender'];

export interface ArtStem {
  kind: FlowerKind;
  color: string;
}

/** Опис ілюстрації букета: які квіти, пакування та стрічка. */
export interface BouquetArtSpec {
  stems: ArtStem[];
  wrap: string;
  ribbon: string | null;
  vessel?: 'wrap' | 'pot';
}

/** Кольори пелюсток, якими користуються дані каталогу та конструктор. */
export const PETAL = {
  pink: '#F2A7B8',
  blush: '#F7CBD3',
  white: '#FBF4EC',
  red: '#C23B4E',
  burgundy: '#7E2A3E',
  yellow: '#F4CF62',
  peach: '#F6B89A',
  coral: '#EE8A7A',
  lilac: '#B9A2D8',
  lavender: '#8F78C2',
  green: '#86A483',
} as const;

/** Зручний запис складу: [['rose', PETAL.red, 5], ...] → масив стебел. */
export function stems(...groups: [FlowerKind, string, number][]): ArtStem[] {
  return groups.flatMap(([kind, color, count]) =>
    Array.from({ length: count }, () => ({ kind, color })),
  );
}

/** Освітлює (amount > 0) або затемнює (amount < 0) HEX-колір. */
export function shade(hex: string, amount: number): string {
  const value = parseInt(hex.slice(1), 16);
  const channel = (c: number) =>
    Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  const r = channel(value >> 16);
  const g = channel((value >> 8) & 255);
  const b = channel(value & 255);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
