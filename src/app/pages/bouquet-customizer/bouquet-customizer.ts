import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import {
  choiceKey,
  CustomizationChoice,
  customizationFor,
  customizedPrice,
  describeChoice,
  packagingPrice,
  ribbonPrice,
  cardPrice,
} from '../../core/customization';
import {
  GREETING_CARD_MAX,
  GREETING_CARD_PRICE,
  PACKAGING_OPTIONS,
  RIBBON_OPTIONS,
} from '../../core/data/customization-options';
import { BOUQUET_TYPE_LABELS, SizeCode } from '../../core/models/product.model';
import { bouquetTypeOf } from '../../core/customization';
import { CartService } from '../../core/services/cart.service';
import { CustomizationDraftService } from '../../core/services/customization-draft.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { UahPipe } from '../../shared/uah.pipe';

/** Персоналізація готового букета: розмір (де дозволено), пакування, стрічка й листівка. Склад квітів не змінюється. */
@Component({
  selector: 'app-bouquet-customizer',
  imports: [RouterLink, BouquetArt, Icon, UahPipe],
  templateUrl: './bouquet-customizer.html',
  styleUrl: './bouquet-customizer.scss',
})
export class BouquetCustomizer {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly drafts = inject(CustomizationDraftService);

  /** Параметр маршруту /product/:id/customize */
  readonly id = input.required<string>();

  protected readonly typeLabels = BOUQUET_TYPE_LABELS;
  protected readonly cardMax = GREETING_CARD_MAX;
  protected readonly cardPriceValue = GREETING_CARD_PRICE;

  protected readonly product = computed(() => this.products.getById(this.id()));
  protected readonly type = computed(() => {
    const p = this.product();
    return p ? bouquetTypeOf(p) : 'author';
  });
  protected readonly sizes = computed(() => {
    const p = this.product();
    return p ? this.products.sizesFor(p) : [];
  });
  protected readonly config = computed(() => {
    const p = this.product();
    return p ? customizationFor(p, this.sizes().length > 0) : null;
  });
  protected readonly packagings = computed(() =>
    PACKAGING_OPTIONS.filter((o) => this.config()?.packagingIds.includes(o.id)),
  );
  protected readonly ribbons = computed(() => RIBBON_OPTIONS.filter((o) => this.config()?.ribbonIds.includes(o.id)));

  /** Збережений вибір для цього букета (інакше — значення за замовчуванням). */
  private readonly saved = computed(() => {
    const d = this.drafts.draft();
    return d?.productId === this.id() ? d : null;
  });

  protected readonly sizeCode = computed<SizeCode | null>(() => {
    if (!this.config()?.allowSize) return null;
    const s = this.saved()?.size;
    return s && this.sizes().some((x) => x.code === s) ? s : 'M';
  });
  protected readonly packagingId = computed<string | null>(() => {
    const v = this.saved()?.packagingId;
    if (v === null) return null;
    return v !== undefined && this.packagings().some((o) => o.id === v) ? v : (this.packagings()[0]?.id ?? null);
  });
  protected readonly ribbonId = computed<string | null>(() => {
    const v = this.saved()?.ribbonId;
    if (v === null) return null;
    return v !== undefined && this.ribbons().some((o) => o.id === v) ? v : (this.ribbons()[0]?.id ?? null);
  });
  protected readonly wantsCard = computed(() => this.saved()?.wantsCard ?? false);
  protected readonly cardText = computed(() => this.saved()?.cardText ?? '');

  protected readonly selectedSize = computed(() => this.sizes().find((s) => s.code === this.sizeCode()));
  protected readonly photo = computed(() => this.selectedSize()?.image ?? this.product()?.image);
  protected readonly basePrice = computed(() => this.selectedSize()?.price ?? this.product()?.price ?? 0);

  protected readonly choice = computed<CustomizationChoice>(() => ({
    size: this.config()?.allowSize ? (this.sizeCode() ?? undefined) : undefined,
    packagingId: this.config()?.allowPackaging ? this.packagingId() : null,
    ribbonId: this.config()?.allowRibbon ? this.ribbonId() : null,
    cardText: this.config()?.allowGreetingCard && this.wantsCard() ? this.cardText() : '',
  }));

  protected readonly total = computed(() => customizedPrice(this.basePrice(), this.choice()));
  protected readonly packagingExtra = computed(() => packagingPrice(this.choice().packagingId));
  protected readonly ribbonExtra = computed(() => ribbonPrice(this.choice().ribbonId));
  protected readonly cardExtra = computed(() => cardPrice(this.choice().cardText));
  protected readonly summary = computed(() => describeChoice(this.choice()));

  constructor() {
    const title = inject(Title);
    effect(() => {
      const p = this.product();
      title.setTitle(p ? `Персоналізація: ${p.name} — HANA` : 'Товар не знайдено — HANA');
    });
  }

  protected setSize(code: SizeCode): void {
    this.drafts.patch(this.id(), { size: code });
  }

  protected setPackaging(id: string | null): void {
    this.drafts.patch(this.id(), { packagingId: id });
  }

  protected setRibbon(id: string | null): void {
    this.drafts.patch(this.id(), { ribbonId: id });
  }

  protected setWantsCard(value: boolean): void {
    this.drafts.patch(this.id(), { wantsCard: value });
  }

  protected setCardText(text: string): void {
    this.drafts.patch(this.id(), { cardText: text });
  }

  /** Прибирає букет зі сторінки: вибір більше не зберігається. */
  protected removeBouquet(): void {
    this.drafts.clear();
    void this.router.navigate(['/customize'], { replaceUrl: true });
  }

  protected addToCart(): void {
    const p = this.product();
    const c = this.choice();
    if (!p || !this.config()?.enabled) return;
    this.cart.add({
      key: choiceKey(p.id, c),
      productId: p.id,
      name: p.name,
      price: this.total(),
      size: c.size,
      art: p.art,
      details: describeChoice(c),
    });
    this.toast.show(`«${p.name}» додано в кошик`, { label: 'Кошик', link: '/cart' });
    void this.router.navigate(['/cart']);
  }
}
