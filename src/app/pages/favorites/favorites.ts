import { Component, computed, inject } from '@angular/core';
import { Product } from '../../core/models/product.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { ProductService } from '../../core/services/product.service';
import { EmptyScene } from '../../shared/empty-scene/empty-scene';
import { SceneDecor } from '../../shared/scene-decor/scene-decor';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-favorites',
  imports: [ProductCard, EmptyScene, SceneDecor],
  template: `
    @if (items().length) {
      <div class="fav-page">
        <app-scene-decor [mobileOnly]="true" />
        <img class="decor decor--l" src="flowers/fav-peony-l.png" alt="" aria-hidden="true" />
        <img class="decor decor--r" src="flowers/fav-peony-r.png" alt="" aria-hidden="true" />
        <img class="decor decor--lines" src="flowers/fav-lines-r.png" alt="" aria-hidden="true" />
        <img class="decor decor--petal petal-1" src="flowers/about-petal.png" alt="" aria-hidden="true" />
        <img class="decor decor--petal petal-2" src="flowers/about-petal.png" alt="" aria-hidden="true" />
        <img class="decor decor--petal petal-3" src="flowers/about-petal.png" alt="" aria-hidden="true" />

        <h1 class="fav-title container">Обране</h1>

        <div class="container">
          <div class="product-grid">
            @for (p of items(); track p.id) {
              <app-product-card [product]="p" />
            }
          </div>
        </div>
      </div>
    } @else {
      <app-empty-scene
        icon="heart"
        title="Тут поки порожньо"
        text="Натисніть на сердечко на картці букета, щоб зберегти його тут і повернутися пізніше."
      />
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .fav-page {
      position: relative;
      overflow: hidden;
      min-height: 100svh;
      padding: calc(var(--header-h) + var(--space-5)) 0 calc(var(--space-8) + var(--space-7));
      /* футер має власний відступ зверху — з'їдаємо його, щоб не було світлої смуги */
      margin-bottom: calc(var(--space-7) * -1);
      background: linear-gradient(160deg, #fcf1ee 0%, #f8e6e2 55%, #fbeeea 100%);
      isolation: isolate;
    }
    :host-context([data-theme='dark']) .fav-page {
      /* темна тема: готове фото з яскравими піонами */
      background: #252d1a var(--img-fav-dark-bg) center bottom / cover no-repeat;
    }
    @media (max-width: 640px) {
      :host-context([data-theme='dark']) .fav-page {
        background: #252d1a;
      }
      .decor--petal {
        display: none;
      }
    }
    :host-context([data-theme='dark']) .decor {
      display: none;
    }
    .decor {
      position: absolute;
      z-index: -1;
      pointer-events: none;
    }
    .decor--l {
      top: var(--header-h);
      left: 0;
      width: min(28vw, 480px);
    }
    .decor--r {
      right: 0;
      bottom: 0;
      width: min(33vw, 560px);
    }
    .decor--lines {
      top: var(--header-h);
      right: 0;
      width: min(11vw, 182px);
    }
    .decor--petal {
      width: 66px;
    }
    .petal-1 {
      top: 14%;
      left: 22%;
      transform: rotate(-20deg);
    }
    .petal-2 {
      top: 30%;
      right: 18%;
      width: 78px;
      transform: rotate(24deg);
    }
    .petal-3 {
      bottom: 22%;
      left: 34%;
      width: 72px;
      transform: rotate(-28deg);
    }
    .fav-title {
      margin-bottom: var(--space-5);
      font-size: clamp(2.4rem, 4vw, 3.4rem);
      font-weight: 500;
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-5);
      padding-top: 17svh;
      text-align: center;
    }
    .empty h2 {
      font-size: clamp(2.6rem, 4.6vw, 3.8rem);
      font-weight: 500;
    }
    .empty p {
      max-width: 34ch;
      font-size: 1.15rem;
      line-height: 1.5;
      color: var(--muted);
    }
    .heart {
      display: flex;
      align-items: center;
      gap: var(--space-5);
      color: #7a6a66;
    }
    .heart::before,
    .heart::after {
      content: '';
      width: 110px;
      height: 1px;
      background: color-mix(in srgb, var(--ink) 18%, transparent);
    }
    .cta {
      min-height: 56px;
      padding-inline: var(--space-7);
      font-size: 1rem;
    }
    /* Телефон і планшет: той самий декор, що й на порожніх сторінках; власні піони ховаємо */
    @media (max-width: 900px) {
      .fav-page > .decor {
        display: none;
      }
      :host-context([data-theme='dark']) .fav-page {
        background: #252d1a;
      }
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
