import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BouquetConfig, priceBouquet } from '../../core/bouquet-pricing';
import {
  BUILDER_EXTRAS,
  BUILDER_FLOWERS,
  BUILDER_RIBBONS,
  BUILDER_WRAPS,
  MAX_STEMS,
} from '../../core/data/builder-options';
import { BouquetArtSpec } from '../../core/models/art.model';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { UahPipe } from '../../shared/uah.pipe';

const MIN_STEMS = 3;

interface Preset {
  name: string;
  flowers: Record<string, number>;
  wrapId: string;
  ribbonId: string;
}

@Component({
  selector: 'app-bouquet-builder',
  imports: [RouterLink, BouquetArt, Icon, UahPipe],
  templateUrl: './bouquet-builder.html',
  styleUrl: './bouquet-builder.scss',
})
export class BouquetBuilder {
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly flowersList = BUILDER_FLOWERS;
  protected readonly wraps = BUILDER_WRAPS;
  protected readonly ribbons = BUILDER_RIBBONS;
  protected readonly extrasList = BUILDER_EXTRAS;
  protected readonly maxStems = MAX_STEMS;
  protected readonly minStems = MIN_STEMS;

  protected readonly steps = [
    { n: 1, title: 'Квіти' },
    { n: 2, title: 'Пакування' },
    { n: 3, title: 'Доповнення' },
    { n: 4, title: 'Результат' },
  ];

  protected readonly presets: Preset[] = [
    { name: 'Ніжність', flowers: { 'rose-pink': 5, peony: 3, eucalyptus: 3 }, wrapId: 'cream', ribbonId: 'rose' },
    { name: 'Пристрасть', flowers: { 'rose-red': 9, lavender: 3 }, wrapId: 'burgundy', ribbonId: 'white' },
    { name: 'Сонечко', flowers: { 'tulip-yellow': 7, daisy: 6, eucalyptus: 2 }, wrapId: 'kraft', ribbonId: 'white' },
  ];

  // Стан конструктора
  protected readonly step = signal(1);
  protected readonly counts = signal<Record<string, number>>({});
  protected readonly wrapId = signal(BUILDER_WRAPS[0].id);
  protected readonly ribbonId = signal(BUILDER_RIBBONS[1].id);
  protected readonly extras = signal<string[]>([]);
  protected readonly cardText = signal('');

  protected readonly config = computed<BouquetConfig>(() => ({
    flowers: this.counts(),
    wrapId: this.wrapId(),
    ribbonId: this.ribbonId(),
    extras: this.extras(),
  }));

  protected readonly price = computed(() => priceBouquet(this.config()));
  protected readonly stemCount = computed(() => this.price().stemCount);
  protected readonly canFinish = computed(() => this.stemCount() >= MIN_STEMS);

  protected readonly wrap = computed(() => BUILDER_WRAPS.find((w) => w.id === this.wrapId())!);
  protected readonly ribbon = computed(() => BUILDER_RIBBONS.find((r) => r.id === this.ribbonId())!);
  protected readonly chosenFlowers = computed(() =>
    BUILDER_FLOWERS.filter((f) => (this.counts()[f.id] ?? 0) > 0).map((f) => ({
      ...f,
      count: this.counts()[f.id],
    })),
  );
  protected readonly chosenExtras = computed(() => BUILDER_EXTRAS.filter((e) => this.extras().includes(e.id)));

  /** Опис для живого прев'ю: кожне обране стебло стає квіткою на ілюстрації. */
  protected readonly spec = computed<BouquetArtSpec>(() => ({
    stems: this.chosenFlowers().flatMap((f) =>
      Array.from({ length: f.count }, () => ({ kind: f.kind, color: f.color })),
    ),
    wrap: this.wrap().color,
    ribbon: this.ribbon().color,
  }));

  protected countOf(id: string): number {
    return this.counts()[id] ?? 0;
  }

  protected change(id: string, delta: number): void {
    if (delta > 0 && this.stemCount() >= MAX_STEMS) {
      this.toast.show(`Максимум ${MAX_STEMS} стебло в одному букеті`);
      return;
    }
    this.counts.update((c) => {
      const next = Math.max(0, (c[id] ?? 0) + delta);
      const { [id]: _, ...rest } = c;
      return next ? { ...rest, [id]: next } : rest;
    });
  }

  protected toggleExtra(id: string): void {
    this.extras.update((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }

  protected applyPreset(preset: Preset): void {
    this.counts.set({ ...preset.flowers });
    this.wrapId.set(preset.wrapId);
    this.ribbonId.set(preset.ribbonId);
  }

  protected goTo(step: number): void {
    this.step.set(Math.min(4, Math.max(1, step)));
  }

  protected reset(): void {
    this.counts.set({});
    this.extras.set([]);
    this.cardText.set('');
    this.wrapId.set(BUILDER_WRAPS[0].id);
    this.ribbonId.set(BUILDER_RIBBONS[1].id);
    this.step.set(1);
  }

  protected addToCart(): void {
    if (!this.canFinish()) return;
    const details = [
      ...this.chosenFlowers().map((f) => `${f.name} × ${f.count}`),
      `Пакування: ${this.wrap().name.toLowerCase()}`,
      ...(this.ribbon().color ? [`Стрічка: ${this.ribbon().name.toLowerCase()}`] : []),
      ...this.chosenExtras().map((e) =>
        e.id === 'card' && this.cardText().trim() ? `Листівка: «${this.cardText().trim()}»` : e.name,
      ),
    ];
    this.cart.add({
      key: `custom-${Date.now()}`,
      productId: null,
      name: 'Власний букет',
      price: this.price().total,
      art: this.spec(),
      details,
    });
    this.toast.show('Ваш букет додано в кошик');
    this.reset();
    this.router.navigate(['/cart']);
  }
}
