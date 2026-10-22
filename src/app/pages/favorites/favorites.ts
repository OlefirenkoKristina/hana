import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductService } from '../../core/services/product.service';
import { Icon } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, ProductCard, Icon],
  template: `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Хлібні крихти">
          <a routerLink="/">Головна</a><span aria-hidden="true">/</span><span>Обране</span>
        </nav>
        <h1>Обране</h1>
        <p class="lead">Букети, які вам сподобалися. Список зберігається в цьому браузері.</p>
      </div>
    </section>

    <div class="container section">
      @if (items().length) {
        <div class="product-grid">
          @for (p of items(); track p.id) {
            <app-product-card [product]="p" />
          }
        </div>
      } @else {
        <div class="empty-state">
          <span class="icon"><app-icon name="heart" [size]="48" [stroke]="1.2" /></span>
          <h2>Тут поки порожньо</h2>
          <p>Натисніть на сердечко на картці букета, щоб зберегти його тут і повернутися пізніше.</p>
          <a routerLink="/catalog" class="btn btn--primary">До каталогу</a>
        </div>
      }
    </div>
  `,
  styles: `
    .section {
      padding-top: var(--space-7);
      padding-bottom: 0;
    }
    .icon {
      color: var(--rose);
    }
  `,
})
export class Favorites {
  private readonly favorites = inject(FavoritesService);
  private readonly products = inject(ProductService);

  protected readonly items = computed(() =>
    this.favorites
      .ids()
      .map((id) => this.products.getById(id))
      .filter((p): p is Product => !!p),
  );
}
