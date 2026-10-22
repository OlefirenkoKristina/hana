import { Component, computed, input } from '@angular/core';
import { ArtStem, BouquetArtSpec, FlowerKind, GREENERY, shade } from '../../core/models/art.model';

interface Head {
  kind: FlowerKind;
  fill: string;
  mid: string;
  dark: string;
  light: string;
  transform: string;
  x: number;
  y: number;
}

interface Sprig {
  kind: FlowerKind;
  fill: string;
  dark: string;
  transform: string;
}

const MAX_HEADS = 21;
const MAX_SPRIGS = 8;
const GOLDEN_ANGLE = 2.39996;

/** Перемішує групи квітів «по колу», щоб кольори були рівномірно розподілені. */
function interleave(list: ArtStem[]): ArtStem[] {
  const groups = new Map<string, ArtStem[]>();
  for (const s of list) {
    const key = s.kind + s.color;
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  const queues = [...groups.values()];
  const result: ArtStem[] = [];
  while (queues.some((q) => q.length)) {
    for (const q of queues) {
      const next = q.shift();
      if (next) result.push(next);
    }
  }
  return result;
}

/**
 * Векторна ілюстрація букета. Розміщує головки квітів у формі купола
 * за «соняшниковою» спіраллю (золотий кут), додає зелень, пакування
 * та стрічку. Використовується в картках, на сторінці товару та в конструкторі.
 */
@Component({
  selector: 'app-bouquet-art',
  templateUrl: './bouquet-art.html',
  styleUrl: './bouquet-art.scss',
  host: {
    role: 'img',
    '[attr.aria-label]': 'label()',
  },
})
export class BouquetArt {
  readonly spec = input.required<BouquetArtSpec>();
  readonly label = input('Ілюстрація букета');
  /** Крупний план — показує лише головки квітів. */
  readonly zoom = input(false);
  /** Лише квітка без пакування й стебел — для мініатюр у конструкторі. */
  readonly bare = input(false);

  protected readonly petals12 = Array.from({ length: 12 }, (_, i) => i * 30);
  protected readonly peonyRing = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return { x: +(Math.cos(a) * 9).toFixed(2), y: +(Math.sin(a) * 9).toFixed(2) };
  });
  protected readonly peonyInner = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 + 0.4;
    return { x: +(Math.cos(a) * 4).toFixed(2), y: +(Math.sin(a) * 4).toFixed(2) };
  });
  protected readonly eucalyptusLeaves = [-22, -34, -46, -58, -70].map((y, i) => ({
    x: i % 2 ? 6 : -6,
    y,
  }));
  protected readonly lavenderBuds = [-46, -52, -58, -64, -70, -76, -82].map((y, i) => ({
    x: i % 2 ? 2.5 : -2.5,
    y,
  }));

  protected readonly viewBox = computed(() => {
    if (this.bare()) return this.heads().length ? '74 56 52 52' : '46 38 66 88';
    return this.zoom() ? '35 30 130 120' : '0 0 200 220';
  });
  protected readonly isPot = computed(() => this.spec().vessel === 'pot');
  protected readonly isOrchid = computed(() =>
    this.spec().stems.every((s) => s.kind === 'orchid' || GREENERY.includes(s.kind)),
  );

  protected readonly wrapColors = computed(() => {
    const wrap = this.spec().wrap;
    return { front: wrap, back: shade(wrap, -0.12), fold: shade(wrap, -0.22) };
  });

  protected readonly ribbonColors = computed(() => {
    const ribbon = this.spec().ribbon;
    return ribbon ? { fill: ribbon, edge: shade(ribbon, -0.25) } : null;
  });

  /** Точка, в якій сходяться стебла. */
  protected readonly gather = computed(() => (this.isPot() ? { x: 100, y: 152 } : { x: 100, y: 178 }));

  protected readonly heads = computed<Head[]>(() => {
    const all = this.spec().stems.filter((s) => !GREENERY.includes(s.kind));
    const list = interleave(all).slice(0, MAX_HEADS);
    const n = list.length;
    if (!n) return [];

    if (this.isOrchid()) return this.orchidLayout(list);

    const pot = this.isPot();
    const cx = 100;
    const cy = pot ? 104 : 90;
    const rx = Math.min(pot ? 40 : 56, 8 + n * 3.4);
    const ry = rx * 0.72;
    const scale = Math.max(0.74, Math.min(1.3, 1.34 - n * 0.03));

    return list
      .map((stem, i) => {
        const r = n === 1 ? 0 : Math.sqrt((i + 0.5) / n);
        const theta = i * GOLDEN_ANGLE - Math.PI / 2;
        const x = cx + r * rx * Math.cos(theta);
        const y = cy + r * ry * Math.sin(theta) - (1 - r) * 8;
        const rotate = ((i * 47) % 40) - 20;
        return this.makeHead(stem, x, y, `rotate(${rotate}) scale(${scale.toFixed(2)})`);
      })
      .sort((a, b) => a.y - b.y);
  });

  protected readonly sprigs = computed<Sprig[]>(() => {
    const greens = this.spec().stems.filter((s) => GREENERY.includes(s.kind)).slice(0, MAX_SPRIGS);
    const m = greens.length;
    const base = this.isPot() ? { x: 100, y: 140 } : { x: 100, y: 122 };
    return greens.map((g, j) => {
      const angle = m === 1 ? -30 : -78 + (156 * j) / (m - 1);
      const length = 0.95 + ((j * 37) % 20) / 100;
      return {
        kind: g.kind,
        fill: g.color,
        dark: shade(g.color, -0.3),
        transform: `translate(${base.x} ${base.y}) rotate(${angle.toFixed(1)}) scale(${length.toFixed(2)})`,
      };
    });
  });

  private makeHead(stem: ArtStem, x: number, y: number, extra: string): Head {
    return {
      kind: stem.kind,
      fill: stem.color,
      mid: shade(stem.color, -0.08),
      dark: shade(stem.color, -0.32),
      light: shade(stem.color, 0.35),
      x,
      y,
      transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) ${extra}`,
    };
  }

  /** Орхідея: квіти вздовж дугоподібного квітконоса. */
  private orchidLayout(list: ArtStem[]): Head[] {
    const n = list.length;
    return list.map((stem, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const x = 62 + t * 82;
      const y = 58 + Math.pow(t - 0.35, 2) * 70 + (i % 2) * 6;
      return this.makeHead(stem, x, y, `rotate(${(i % 3) * 12 - 12}) scale(1.15)`);
    });
  }

  protected orchidSpike(): string {
    const heads = this.heads();
    if (!heads.length) return '';
    const [first] = heads;
    return `M100,150 C96,110 70,90 ${first.x.toFixed(1)},${(first.y + 4).toFixed(1)} ` +
      heads.map((h) => `L${h.x.toFixed(1)},${(h.y + 4).toFixed(1)}`).join(' ');
  }
}
