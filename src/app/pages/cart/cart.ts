import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, FREE_DELIVERY_FROM, MAX_QUANTITY } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';
import { QuantityStepper } from '../../shared/quantity-stepper/quantity-stepper';
import { UahPipe } from '../../shared/uah.pipe';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, BouquetArt, Icon, ProductCard, QuantityStepper, UahPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cart = inject(CartService);
  private readonly products = inject(ProductService);

  protected readonly maxQuantity = MAX_QUANTITY;
  protected readonly freeFrom = FREE_DELIVERY_FROM;

  protected readonly promoInput = signal('');
  protected readonly promoError = signal('');

  protected readonly delivery = computed(() => this.cart.deliveryCost('courier'));
  protected readonly total = computed(() => this.cart.total('courier'));
  /** Скільки ще додати до безкоштовної доставки. */
  protected readonly untilFree = computed(() =>
    Math.max(0, FREE_DELIVERY_FROM - (this.cart.subtotal() - this.cart.discount())),
  );
  protected readonly freeProgress = computed(() =>
    Math.min(100, ((this.cart.subtotal() - this.cart.discount()) / FREE_DELIVERY_FROM) * 100),
  );
  protected readonly suggestions = computed(() => this.products.getPopular(4));

  protected applyPromo(): void {
    const code = this.promoInput().trim();
    if (!code) {
      this.promoError.set('Введіть промокод');
      return;
    }
    if (this.cart.applyPromo(code)) {
      this.promoError.set('');
      this.promoInput.set('');
    } else {
      this.promoError.set('Такого промокоду не існує');
    }
  }
}
