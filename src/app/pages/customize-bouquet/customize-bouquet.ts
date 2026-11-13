import { Component, computed, effect, inject, input } from '@angular/core';
import { CustomizationDraftService } from '../../core/services/customization-draft.service';
import { ProductService } from '../../core/services/product.service';
import { EmptyScene } from '../../shared/empty-scene/empty-scene';
import { SceneDecor } from '../../shared/scene-decor/scene-decor';
import { BouquetCustomizer } from '../bouquet-customizer/bouquet-customizer';

/**
 * «Змінити букет»: якщо в адресі є ?product=<id> — налаштування цього букета,
 * інакше підказка спершу вибрати букет у каталозі.
 */
@Component({
  selector: 'app-customize-bouquet',
  imports: [EmptyScene, BouquetCustomizer, SceneDecor],
  templateUrl: './customize-bouquet.html',
  styleUrl: './customize-bouquet.scss',
})
export class CustomizeBouquet {
  private readonly drafts = inject(CustomizationDraftService);
  private readonly products = inject(ProductService);

  /** Параметр запиту ?product=<id>. */
  readonly product = input<string>();

  /** Букет на сторінці: з адреси, а якщо його немає — збережений раніше. */
  protected readonly active = computed(() => {
    const id = this.product() ?? this.drafts.draft()?.productId;
    return id && this.products.getById(id) ? id : null;
  });

  constructor() {
    // Новий букет з каталогу замінює збережений і скидає його вибір.
    effect(() => {
      const id = this.product();
      if (id && this.products.getById(id)) this.drafts.start(id);
    });
  }
}
