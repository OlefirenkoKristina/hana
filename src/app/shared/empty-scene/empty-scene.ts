import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';
import { SceneDecor } from '../scene-decor/scene-decor';

/**
 * Порожній стан сторінки (кошик, обране, «Змінити букет»): один дизайн для всіх трьох і для обох тем,
 * відрізняється лише текст посередині. На комп'ютері — піони по краях, на телефоні — той самий набір,
 * зібраний під вузький екран (піон зверху ліворуч, піон і букет знизу праворуч, листя, пелюстки).
 */
@Component({
  selector: 'app-empty-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SceneDecor],
  template: `
    <div class="scene">
      <app-scene-decor />

      <div class="container">
        <div class="empty">
          <div class="mark"><app-icon [name]="icon()" [size]="58" [stroke]="1.1" /></div>
          <h1>{{ title() }}</h1>
          <p>{{ text() }}</p>
          <a [routerLink]="link()" class="btn btn--primary cta">{{ cta() }} <app-icon name="arrow" [size]="18" /></a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './empty-scene.scss',
})
export class EmptyScene {
  readonly icon = input.required<IconName>();
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly cta = input('До каталогу');
  readonly link = input('/catalog');
}
