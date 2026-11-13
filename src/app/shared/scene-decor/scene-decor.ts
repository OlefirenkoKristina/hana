import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Декор сторінок «Кошик», «Обране», «Змінити букет»: піони, листя й пелюстки. Кладеться всередину
 * контейнера з `position: relative; isolation: isolate`. Із `mobileOnly` показується лише на телефоні/планшеті
 * (для сторінок із товарами, у яких на комп'ютері своє оформлення).
 */
@Component({
  selector: 'app-scene-decor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.mobile-only]': 'mobileOnly()', '[attr.data-corner]': 'corner() || null', 'aria-hidden': 'true' },
  template: `
    <!-- Світла тема: піони з PNG -->
    <img class="decor lt d-l" src="flowers/fav-peony-l.png" alt="" />
    <img class="decor lt d-r" src="flowers/fav-peony-r.png" alt="" />
    <img class="decor lt d-lines" src="flowers/fav-lines-r.png" alt="" />
    <!-- Темна тема на телефоні: ті самі місця, але шматки темного фото -->
    <i class="decor dk dk-l"></i>
    <i class="decor dk dk-r"></i>
    <i class="decor dk dk-lines"></i>
    <img class="decor petal p1" src="flowers/about-petal.png" alt="" />
    <img class="decor petal p2" src="flowers/about-petal.png" alt="" />
    <img class="decor petal p3" src="flowers/about-petal.png" alt="" />
    <img class="decor petal p4" src="flowers/about-petal.png" alt="" />
  `,
  styleUrl: './scene-decor.scss',
})
export class SceneDecor {
  readonly mobileOnly = input(false);
  /** Один піон лише в обраному куті (для секцій головної); порожнє значення — повний набір. */
  readonly corner = input<'' | 'tl' | 'tr' | 'bl' | 'br'>('');
}
