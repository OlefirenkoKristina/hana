import {
  GREETING_CARD_MAX,
  GREETING_CARD_PRICE,
  PACKAGING_OPTIONS,
  RIBBON_OPTIONS,
} from './data/customization-options';
import { BouquetType, CustomizationConfig, Product, SizeCode } from './models/product.model';

/** Вибір покупця на сторінці персоналізації. */
export interface CustomizationChoice {
  size?: SizeCode;
  /** id пакування; null — без пакування. */
  packagingId: string | null;
  /** id стрічки; null — без стрічки. */
  ribbonId: string | null;
  /** Текст листівки; порожній рядок — без листівки. */
  cardText: string;
}

const NON_FLOWER_LINE = /^(пакування|стрічка|атласна|упаковка)/i;

/** Тип букета: задається в даних, інакше — монобукет для категорій одного виду квітів, а для авторських — за кількістю видів у складі. */
export function bouquetTypeOf(product: Product): BouquetType {
  if (product.type) return product.type;
  if (product.category !== 'bouquets') return 'mono';
  const flowerLines = product.composition.filter((l) => !NON_FLOWER_LINE.test(l.trim()));
  return flowerLines.length >= 3 ? 'mixed' : 'author';
}

/** Налаштування персоналізації з урахуванням типу букета й перевизначень у товарі. */
export function customizationFor(product: Product, hasSizes: boolean): CustomizationConfig {
  const type = bouquetTypeOf(product);
  const base: CustomizationConfig = {
    enabled: true,
    allowSize: type === 'mono' && hasSizes,
    allowPackaging: true,
    allowNoPackaging: true,
    allowRibbon: true,
    allowGreetingCard: true,
    packagingIds: PACKAGING_OPTIONS.map((o) => o.id),
    ribbonIds: RIBBON_OPTIONS.map((o) => o.id),
  };
  return { ...base, ...product.customization };
}

export function packagingPrice(id: string | null): number {
  return PACKAGING_OPTIONS.find((o) => o.id === id)?.price ?? 0;
}

export function ribbonPrice(id: string | null): number {
  return RIBBON_OPTIONS.find((o) => o.id === id)?.price ?? 0;
}

export function cardPrice(text: string): number {
  return text.trim() ? GREETING_CARD_PRICE : 0;
}

/** Ціна одного букета: ціна розміру + доплати за обрані опції. */
export function customizedPrice(basePrice: number, choice: CustomizationChoice): number {
  return basePrice + packagingPrice(choice.packagingId) + ribbonPrice(choice.ribbonId) + cardPrice(choice.cardText);
}

/** Рядки опису вибору для кошика й замовлення. */
export function describeChoice(choice: CustomizationChoice): string[] {
  const pack = PACKAGING_OPTIONS.find((o) => o.id === choice.packagingId);
  const ribbon = RIBBON_OPTIONS.find((o) => o.id === choice.ribbonId);
  const text = choice.cardText.trim().slice(0, GREETING_CARD_MAX);
  return [
    pack ? `Пакування: ${pack.name.toLowerCase()}` : 'Без пакування',
    ribbon ? `Стрічка: ${ribbon.name.toLowerCase()}` : 'Без стрічки',
    ...(text ? [`Листівка: «${text}»`] : []),
  ];
}

/** Ключ позиції в кошику: різні налаштування одного букета — різні позиції. */
export function choiceKey(productId: string, choice: CustomizationChoice): string {
  const card = choice.cardText.trim();
  let hash = 0;
  for (let i = 0; i < card.length; i++) hash = (Math.imul(hash, 31) + card.charCodeAt(i)) | 0;
  return [productId, choice.size ?? '-', choice.packagingId ?? 'none', choice.ribbonId ?? 'none', card ? (hash >>> 0).toString(36) : '-'].join(':');
}

export interface VariantPhoto {
  src: string;
  /** true — фото саме з такою комбінацією пакування й стрічки; false — найближче доступне. */
  exact: boolean;
}

/**
 * Фото букета для обраних пакування й стрічки. Спершу точний збіг, далі — те саме пакування
 * з іншою стрічкою, далі — та сама стрічка. Якщо для обраного розміру фото-варіантів немає, беремо варіанти
 * іншого розміру (exact = false), щоб зміна пакування й стрічки завжди була видна. Без жодних варіантів — null.
 */
export function variantPhoto(
  product: Product,
  size: SizeCode | undefined,
  packagingId: string | null,
  ribbonId: string | null,
): VariantPhoto | null {
  const own = product.photoVariants?.[size ?? 'M'];
  const variants = own ?? Object.values(product.photoVariants ?? {})[0];
  if (!variants) return null;
  const sizeMatches = !!own;
  const pack = packagingId ?? 'none';
  const ribbon = ribbonId ?? 'none';
  const exact = variants[`${pack}|${ribbon}`];
  if (exact) return { src: exact, exact: sizeMatches };
  const entries = Object.entries(variants);
  const samePack = entries.find(([k]) => k.startsWith(`${pack}|`));
  if (samePack) return { src: samePack[1], exact: false };
  const sameRibbon = entries.find(([k]) => k.endsWith(`|${ribbon}`));
  if (sameRibbon) return { src: sameRibbon[1], exact: false };
  return null;
}
