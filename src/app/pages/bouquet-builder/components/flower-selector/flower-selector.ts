import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { BUILDER_FLOWERS, BuilderFlower } from '../../../../core/data/builder-options';
import { Icon } from '../../../../shared/icon/icon';
import { UahPipe } from '../../../../shared/uah.pipe';

type CategoryId = 'all' | 'rose' | 'peony' | 'tulip' | 'field' | 'greenery';
type ColorId = 'red' | 'pink' | 'white' | 'peach' | 'yellow' | 'lilac' | 'green';

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'rose', label: 'Троянди' },
  { id: 'peony', label: 'Півонії' },
  { id: 'tulip', label: 'Тюльпани' },
  { id: 'field', label: 'Польові' },
  { id: 'greenery', label: 'Зелень' },
];

const COLORS: { id: ColorId; label: string; hex: string }[] = [
  { id: 'red', label: 'Червоний', hex: '#C23B4E' },
  { id: 'pink', label: 'Рожевий', hex: '#F2A7B8' },
  { id: 'white', label: 'Білий', hex: '#FBF4EC' },
  { id: 'peach', label: 'Персиковий', hex: '#F6B89A' },
  { id: 'yellow', label: 'Жовтий', hex: '#F4CF62' },
  { id: 'lilac', label: 'Бузковий', hex: '#8F78C2' },
  { id: 'green', label: 'Зелений', hex: '#86A483' },
];

const COLOR_OF: Record<string, ColorId> = {
  'rose-red': 'red',
  'rose-pink': 'pink',
  'rose-white': 'white',
  'rose-peach': 'peach',
  peony: 'pink',
  'tulip-yellow': 'yellow',
  'tulip-pink': 'pink',
  daisy: 'white',
  lavender: 'lilac',
  eucalyptus: 'green',
};

function categoryOf(f: BuilderFlower): CategoryId {
  switch (f.kind) {
    case 'rose':
      return 'rose';
    case 'peony':
      return 'peony';
    case 'tulip':
      return 'tulip';
    case 'eucalyptus':
      return 'greenery';
    default:
      return 'field';
  }
}

/** Крок 1 конструктора: категорії, фільтр за кольором і картки квітів із лічильником. */
@Component({
  selector: 'app-flower-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, UahPipe],
  templateUrl: './flower-selector.html',
  styleUrl: './flower-selector.scss',
})
export class FlowerSelector {
  /** Кількість обраних стебел за id квітки. */
  readonly counts = input.required<Record<string, number>>();
  /** Зміна кількості: +1 / −1. */
  readonly changed = output<{ id: string; delta: number }>();

  protected readonly categories = CATEGORIES;
  protected readonly colors = COLORS;
  protected readonly category = signal<CategoryId>('all');
  protected readonly color = signal<ColorId | null>(null);

  protected readonly visible = computed(() =>
    BUILDER_FLOWERS.filter(
      (f) =>
        (this.category() === 'all' || categoryOf(f) === this.category()) &&
        (!this.color() || COLOR_OF[f.id] === this.color()),
    ),
  );

  protected countOf(id: string): number {
    return this.counts()[id] ?? 0;
  }

  protected toggleColor(id: ColorId): void {
    this.color.update((c) => (c === id ? null : id));
  }

  protected reset(): void {
    this.category.set('all');
    this.color.set(null);
  }
}
