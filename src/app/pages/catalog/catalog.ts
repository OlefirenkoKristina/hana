import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  CatalogFilters,
  countActiveFilters,
  filterProducts,
  SORT_LABELS,
  SortOption,
  sortProducts,
} from '../../core/catalog-query';
import {
  Category,
  CATEGORY_LABELS,
  COLOR_LABELS,
  COLOR_SWATCHES,
  FlowerColor,
  Occasion,
  OCCASION_LABELS,
  STEM_RANGE_LABELS,
  StemRange,
} from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';

const PAGE_SIZE = 8;

/** Typed Object.keys для словників-міток. */
function keysOf<T extends string>(record: Record<T, string>): T[] {
  return Object.keys(record) as T[];
}

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, ProductCard, Icon],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  /** Query-параметри ?q=…&category=… (через withComponentInputBinding). */
  readonly q = input<string>();
  readonly category = input<string>();

  protected readonly categoryLabels = CATEGORY_LABELS;
  protected readonly colorLabels = COLOR_LABELS;
  protected readonly swatches = COLOR_SWATCHES;
  protected readonly occasionLabels = OCCASION_LABELS;
  protected readonly stemLabels = STEM_RANGE_LABELS;
  protected readonly sortLabels = SORT_LABELS;

  protected readonly categories = keysOf(CATEGORY_LABELS);
  protected readonly colors = keysOf(COLOR_LABELS);
  protected readonly occasions = keysOf(OCCASION_LABELS);
  protected readonly stemRanges = keysOf(STEM_RANGE_LABELS);
  protected readonly sortOptions = keysOf(SORT_LABELS);
  protected readonly bounds = this.productService.priceBounds();

  // Стан фільтрів. Пошук і категорія синхронізуються з адресним рядком.
  protected readonly query = linkedSignal(() => this.q() ?? '');
  protected readonly activeCategory = linkedSignal<Category | null>(() => {
    const c = this.category();
    return c && c in CATEGORY_LABELS ? (c as Category) : null;
  });
  protected readonly minPrice = signal<number | null>(null);
  protected readonly maxPrice = signal<number | null>(null);
  protected readonly selectedColors = signal<FlowerColor[]>([]);
  protected readonly selectedOccasions = signal<Occasion[]>([]);
  protected readonly selectedStems = signal<StemRange[]>([]);
  protected readonly sort = signal<SortOption>('popular');
  protected readonly filtersOpen = signal(false);

  protected readonly filters = computed<CatalogFilters>(() => ({
    query: this.query(),
    category: this.activeCategory(),
    minPrice: this.minPrice(),
    maxPrice: this.maxPrice(),
    colors: this.selectedColors(),
    occasions: this.selectedOccasions(),
    stemRanges: this.selectedStems(),
  }));

  protected readonly results = computed(() =>
    sortProducts(filterProducts(this.productService.getAll(), this.filters()), this.sort()),
  );

  /** Скільки карток показано; скидається до однієї сторінки при зміні фільтрів. */
  protected readonly shown = linkedSignal({
    source: this.filters,
    computation: () => PAGE_SIZE,
  });

  protected readonly visible = computed(() => this.results().slice(0, this.shown()));
  protected readonly activeCount = computed(() => countActiveFilters(this.filters()));
  protected readonly title = computed(() => {
    const c = this.activeCategory();
    return c ? CATEGORY_LABELS[c] : 'Каталог квітів';
  });

  protected setQuery(value: string): void {
    this.query.set(value);
    this.syncUrl();
  }

  protected setCategory(category: Category | null): void {
    this.activeCategory.set(category);
    this.syncUrl();
  }

  protected setPrice(which: 'min' | 'max', raw: string): void {
    const value = raw === '' ? null : Math.max(0, Number(raw));
    (which === 'min' ? this.minPrice : this.maxPrice).set(Number.isFinite(value) ? value : null);
  }

  protected toggle<T>(list: WritableSignal<T[]>, value: T): void {
    list.update((items) => (items.includes(value) ? items.filter((x) => x !== value) : [...items, value]));
  }

  protected setSort(value: string): void {
    this.sort.set(value as SortOption);
  }

  protected showMore(): void {
    this.shown.update((n) => n + PAGE_SIZE);
  }

  protected resetFilters(): void {
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.selectedColors.set([]);
    this.selectedOccasions.set([]);
    this.selectedStems.set([]);
    this.query.set('');
    this.activeCategory.set(null);
    this.syncUrl();
  }

  private syncUrl(): void {
    const q = this.query().trim();
    const category = this.activeCategory();
    this.router.navigate([], {
      queryParams: { q: q || null, category },
      replaceUrl: true,
    });
  }
}
