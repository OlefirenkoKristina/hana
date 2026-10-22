import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ToastService } from '../../core/services/toast.service';
import { BouquetArt } from '../bouquet-art/bouquet-art';
import { Icon } from '../icon/icon';
import { UahPipe } from '../uah.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, BouquetArt, Icon, UahPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private readonly cart = inject(CartService);
  private readonly favorites = inject(FavoritesService);
  private readonly toast = inject(ToastService);

  readonly product = input.required<Product>();

  protected readonly isFavorite = computed(() => this.favorites.ids().includes(this.product().id));

  protected toggleFavorite(): void {
    const p = this.product();
    const added = this.favorites.toggle(p.id);
    this.toast.show(
      added ? `«${p.name}» додано в обране` : `«${p.name}» прибрано з обраного`,
      added ? { label: 'Переглянути', link: '/favorites' } : undefined,
    );
  }

  protected addToCart(): void {
    const p = this.product();
    // Із картки додаємо стандартний розмір M.
    const size = p.category === 'potted' ? undefined : 'M';
    this.cart.add({
      key: size ? `${p.id}:${size}` : p.id,
      productId: p.id,
      name: p.name,
      price: p.price,
      size,
      art: p.art,
    });
    this.toast.show(`«${p.name}» додано в кошик`, { label: 'Кошик', link: '/cart' });
  }
}
