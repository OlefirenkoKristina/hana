import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, CATEGORY_LABELS } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon, IconName } from '../../shared/icon/icon';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-home',
  imports: [RouterLink, BouquetArt, Icon, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly products = inject(ProductService);


  /** Обкладинка категорії — фото першого товару, що його має; якщо фото немає — малюнок букета. */
  protected readonly categories = (Object.keys(CATEGORY_LABELS) as Category[]).map((id) => {
    const items = this.products.getByCategory(id);
    const withPhoto = items.find((p) => p.image);
    return {
      id,
      label: CATEGORY_LABELS[id],
      count: items.length,
      image: withPhoto?.image,
      art: items[0]?.art,
    };
  });

  protected readonly advantages: { icon: IconName; title: string; text: string }[] = [
    { icon: 'truck', title: 'Доставка за 2 години', text: 'По Києву щодня з 08:00 до 21:00. Безкоштовно від 3 000 грн.' },
    { icon: 'leaf', title: 'Завжди свіжі квіти', text: 'Отримуємо поставки щоранку й не тримаємо квіти довше трьох днів.' },
    { icon: 'gift', title: 'Індивідуальні букети', text: 'Зберемо композицію під вашу історію, колір і бюджет.' },
    { icon: 'sparkle', title: 'Фото перед доставкою', text: 'Надсилаємо фото готового букета, щоб ви були впевнені в результаті.' },
  ];
}
