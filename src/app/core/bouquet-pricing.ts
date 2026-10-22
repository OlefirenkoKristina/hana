import {
  ASSEMBLY_FEE,
  BUILDER_EXTRAS,
  BUILDER_FLOWERS,
  BUILDER_RIBBONS,
  BUILDER_WRAPS,
} from './data/builder-options';

/** Вибір користувача в конструкторі букета. */
export interface BouquetConfig {
  /** id квітки → кількість стебел */
  flowers: Record<string, number>;
  wrapId: string;
  ribbonId: string;
  extras: string[];
}

export interface BouquetPrice {
  flowers: number;
  wrap: number;
  ribbon: number;
  extras: number;
  assembly: number;
  total: number;
  stemCount: number;
}

export function countStems(config: BouquetConfig): number {
  return Object.values(config.flowers).reduce((sum, n) => sum + n, 0);
}

/** Розраховує вартість власного букета: квіти + пакування + стрічка + доповнення + робота. */
export function priceBouquet(config: BouquetConfig): BouquetPrice {
  const flowers = BUILDER_FLOWERS.reduce(
    (sum, f) => sum + f.price * (config.flowers[f.id] ?? 0),
    0,
  );
  const wrap = BUILDER_WRAPS.find((w) => w.id === config.wrapId)?.price ?? 0;
  const ribbon = BUILDER_RIBBONS.find((r) => r.id === config.ribbonId)?.price ?? 0;
  const extras = BUILDER_EXTRAS.filter((e) => config.extras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0,
  );
  const stemCount = countStems(config);
  const assembly = stemCount > 0 ? ASSEMBLY_FEE : 0;

  return {
    flowers,
    wrap,
    ribbon,
    extras,
    assembly,
    stemCount,
    total: stemCount > 0 ? flowers + wrap + ribbon + extras + assembly : 0,
  };
}
