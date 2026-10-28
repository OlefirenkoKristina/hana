import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MAX_QUANTITY, CartService } from '../../core/services/cart.service';
import { CATEGORY_LABELS, OCCASION_LABELS, SizeCode } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';
import { QuantityStepper } from '../../shared/quantity-stepper/quantity-stepper';
import { UahPipe } from '../../shared/uah.pipe';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, BouquetArt, Icon, ProductCard, QuantityStepper, UahPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly favorites = inject(FavoritesService);
  private readonly toast = inject(ToastService);

  /** Параметр маршруту /product/:id */
  readonly id = input.required<string>();

  protected readonly categoryLabels = CATEGORY_LABELS;
  protected readonly occasionLabels = OCCASION_LABELS;
  protected readonly maxQuantity = MAX_QUANTITY;

  protected readonly product = computed(() => this.products.getById(this.id()));
  protected readonly sizes = computed(() => {
    const p = this.product();
    return p ? this.products.sizesFor(p) : [];
  });
  protected readonly related = computed(() => {
    const p = this.product();
    return p ? this.products.getRelated(p) : [];
  });

  // Стан сторінки скидається, коли користувач переходить до іншого товару.
  protected readonly sizeCode = linkedSignal<SizeCode | null>(() => (this.sizes().length ? 'M' : null));
  protected readonly quantity = linkedSignal({ source: this.id, computation: () => 1 });

  protected readonly selectedSize = computed(() => this.sizes().find((s) => s.code === this.sizeCode()));
  /** Фото вибраного розміру, а якщо його немає — головне фото товару. */
  protected readonly photo = computed(() => this.selectedSize()?.image ?? this.product()?.image);
  protected readonly unitPrice = computed(() => this.selectedSize()?.price ?? this.product()?.price ?? 0);
  protected readonly totalPrice = computed(() => this.unitPrice() * this.quantity());
  protected readonly isFavorite = computed(() => this.favorites.ids().includes(this.id()));

  constructor() {
    const title = inject(Title);
    effect(() => {
      const p = this.product();
      title.setTitle(p ? `${p.name} — HANA` : 'Товар не знайдено — HANA');
    });
  }

  protected changeQuantity(delta: number): void {
    this.quantity.update((q) => Math.min(MAX_QUANTITY, Math.max(1, q + delta)));
  }

  protected addToCart(): void {
    const p = this.product();
    if (!p) return;
    const size = this.sizeCode() ?? undefined;
    this.cart.add(
      {
        key: size ? `${p.id}:${size}` : p.id,
        productId: p.id,
        name: p.name,
        price: this.unitPrice(),
        size,
        art: p.art,
      },
      this.quantity(),
    );
    this.toast.show(`«${p.name}» × ${this.quantity()} додано в кошик`, { label: 'Кошик', link: '/cart' });
  }

  protected toggleFavorite(): void {
    const p = this.product();
    if (!p) return;
    const added = this.favorites.toggle(p.id);
    this.toast.show(added ? 'Додано в обране' : 'Прибрано з обраного');
  }
}
