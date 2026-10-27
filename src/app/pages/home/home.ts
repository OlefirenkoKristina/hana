import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PETAL, stems } from '../../core/models/art.model';
import { Category, CATEGORY_LABELS } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon, IconName } from '../../shared/icon/icon';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, BouquetArt, Icon, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly products = inject(ProductService);

  protected readonly popular = this.products.getPopular(8);
  protected readonly builderArt = {
    stems: stems(['eucalyptus', PETAL.green, 2], ['rose', PETAL.peach, 4], ['tulip', PETAL.yellow, 3], ['daisy', PETAL.white, 3]),
    wrap: '#F3E6D3',
    ribbon: '#873F55',
  };

  /** Кожна категорія ілюструється найпопулярнішим товаром у ній. */
  protected readonly categories = (Object.keys(CATEGORY_LABELS) as Category[]).map((id) => {
    const items = this.products.getByCategory(id);
    const top = [...items].sort((a, b) => b.popularity - a.popularity)[0];
    return { id, label: CATEGORY_LABELS[id], count: items.length, art: top.art };
  });

  protected readonly advantages: { icon: IconName; title: string; text: string }[] = [
    { icon: 'truck', title: 'Доставка за 2 години', text: 'По Києву щодня з 08:00 до 21:00. Безкоштовно від 3 000 грн.' },
    { icon: 'leaf', title: 'Завжди свіжі квіти', text: 'Отримуємо поставки щоранку й не тримаємо квіти довше трьох днів.' },
    { icon: 'gift', title: 'Індивідуальні букети', text: 'Зберемо композицію під вашу історію, колір і бюджет.' },
    { icon: 'sparkle', title: 'Фото перед доставкою', text: 'Надсилаємо фото готового букета, щоб ви були впевнені в результаті.' },
  ];
}
