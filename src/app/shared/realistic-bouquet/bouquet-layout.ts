/**
 * Розкладка реалістичного букета: чиста функція без залежностей від Angular.
 *
 * Принцип «ручного» букета: голівки лягають за спіраллю Фібоначчі (кут 137,5°) — так
 * флорист збирає букет у руках, і виходить природний купол. Великі квіти опиняються
 * в центрі, дрібні й зелень — ближче до краю. Випадковість береться з фіксованого
 * числа від складу букета, тож при перерахунку квіти не «стрибають» без причини.
 */

export interface FlowerInput {
  /** id квітки з конструктора (збігається з іменем файлу в flowers/builder/cut). */
  id: string;
  count: number;
}

export interface HeadPlacement {
  id: string;
  x: number;
  y: number;
  /** Діаметр голівки у координатах SVG. */
  size: number;
  rotate: number;
  flip: boolean;
  /** Темніше до краю купола. */
  shade: number;
}

export interface GreenPlacement {
  id: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
}

export interface BouquetLayout {
  /** Радіус купола квітів. */
  radius: number;
  /** Центр купола. */
  cx: number;
  cy: number;
  /** Голівки в порядку малювання: дальні (вище) першими. */
  heads: HeadPlacement[];
  greens: GreenPlacement[];
}

export const VIEW_W = 600;
export const VIEW_H = 720;
export const CENTER_X = VIEW_W / 2;
export const CENTER_Y = 238;

const GREENS = new Set(['eucalyptus']);

/** Чим менше число — тим ближче до центру (великі квіти). */
const PRIORITY: Record<string, number> = {
  peony: 0,
  'rose-red': 0.28,
  'rose-pink': 0.28,
  'rose-peach': 0.3,
  'rose-white': 0.3,
  'tulip-pink': 0.55,
  'tulip-yellow': 0.55,
  daisy: 0.9,
  lavender: 1,
};

/** Відносний розмір голівки. */
const SIZE: Record<string, number> = {
  peony: 1.18,
  'rose-red': 1,
  'rose-pink': 1,
  'rose-peach': 1,
  'rose-white': 1.02,
  'tulip-pink': 0.92,
  'tulip-yellow': 0.86,
  daisy: 0.82,
  lavender: 0.78,
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Детермінований генератор випадкових чисел (mulberry32). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function layoutBouquet(flowers: FlowerInput[]): BouquetLayout {
  // Сортуємо за id, щоб порядок вибору квітів не впливав на розкладку.
  const active = flowers.filter((f) => f.count > 0).sort((a, b) => a.id.localeCompare(b.id));
  const seed = hashString(active.map((f) => `${f.id}:${f.count}`).join('|'));
  const rand = seededRandom(seed);

  const headIds: string[] = [];
  const greenIds: string[] = [];
  for (const f of active) {
    for (let i = 0; i < f.count; i++) (GREENS.has(f.id) ? greenIds : headIds).push(f.id);
  }

  const n = headIds.length;
  const radius = n === 0 ? 70 : Math.min(212, 72 + 25 * Math.sqrt(n + greenIds.length * 0.4));

  // Порядок: великі квіти в центр, але з перемішуванням, щоб кольори не йшли «смугами».
  const ordered = headIds
    .map((id) => ({ id, key: (PRIORITY[id] ?? 0.5) + rand() * 0.55 }))
    .sort((a, b) => a.key - b.key);

  const heads: HeadPlacement[] = ordered.map((item, i) => {
    const t = (i + 0.5) / n;
    const r = radius * Math.sqrt(t);
    const theta = i * GOLDEN_ANGLE + rand() * 0.25;
    const rel = r / radius; // 0 — центр, 1 — край
    const baseSize = ((radius * 2) / Math.sqrt(n)) * 1.42;
    const size = Math.max(52, Math.min(168, baseSize)) * (SIZE[item.id] ?? 1) * (1.1 - 0.26 * rel);
    return {
      id: item.id,
      x: CENTER_X + r * Math.cos(theta) * 1.02,
      // Вид спереду: центр вище, край купола «осідає»; вертикаль трохи стиснута.
      y: CENTER_Y + r * Math.sin(theta) * 0.74 + r * 0.2,
      size,
      rotate: (rand() - 0.5) * 70,
      flip: rand() > 0.5,
      shade: 1 - 0.2 * rel * rel,
    };
  });

  // Малюємо зверху вниз: нижні голівки перекривають верхні, як у справжньому букеті.
  heads.sort((a, b) => a.y - b.y);

  const greens: GreenPlacement[] = greenIds.map((id, i) => {
    const count = greenIds.length;
    // Гілочки віялом навколо купола, переважно зверху й по боках.
    const angle = -Math.PI * 0.95 + (Math.PI * 0.9 * (i + 0.5)) / count + (rand() - 0.5) * 0.25;
    const r = radius * (0.95 + rand() * 0.2);
    return {
      id,
      x: CENTER_X + Math.cos(angle) * r * 1.05,
      y: CENTER_Y + Math.sin(angle) * r * 0.78 + r * 0.15,
      size: radius * (0.95 + rand() * 0.25),
      rotate: (angle * 180) / Math.PI + 90 + (rand() - 0.5) * 20,
    };
  });

  return { radius, cx: CENTER_X, cy: CENTER_Y, heads, greens };
}

/** Змішує колір #RRGGBB з чорним (amount < 0) або білим (amount > 0). */
export function shadeColor(hex: string, amount: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const v = parseInt(m[1], 16);
  const target = amount < 0 ? 0 : 255;
  const k = Math.abs(amount);
  const ch = (shift: number) => {
    const c = (v >> shift) & 255;
    return Math.round(c + (target - c) * k);
  };
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, '0')).join('')}`;
}
