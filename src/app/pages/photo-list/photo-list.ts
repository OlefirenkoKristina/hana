import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FlowerRow {
  name: string;
  colors: string;
}

interface ComboRow {
  n: number;
  name: string;
  composition: string;
}

interface CatalogType {
  title: string;
  text: string;
}

const FLOWERS: FlowerRow[] = [
  { name: 'Троянди', colors: 'Червоний, білий, рожевий, бордовий, персиковий, жовтий' },
  { name: 'Півонії', colors: 'Рожевий, білий, кораловий' },
  { name: 'Тюльпани', colors: 'Червоний, жовтий, білий, рожевий, фіолетовий' },
  { name: 'Еустоми', colors: 'Білий, рожевий, бузковий, кремовий' },
  { name: 'Гербери', colors: 'Червоний, помаранчевий, рожевий, жовтий' },
  { name: 'Хризантеми', colors: 'Білий, жовтий, рожевий, бузковий' },
  { name: 'Кали', colors: 'Білий, бордовий, жовтий, рожевий' },
  { name: 'Орхідеї', colors: 'Білий, рожевий, фіолетовий' },
  { name: 'Гортензії', colors: 'Білий, блакитний, рожевий, бузковий' },
  { name: 'Ромашки', colors: 'Білий із жовтою серединкою' },
  { name: 'Гіпсофіла', colors: 'Білий, рожевий' },
  { name: 'Альстромерії', colors: 'Білий, рожевий, жовтий, помаранчевий' },
  { name: 'Гвоздики', colors: 'Білий, рожевий, червоний, бузковий' },
  { name: 'Нарциси', colors: 'Жовтий, білий' },
  { name: 'Гіацинти', colors: 'Білий, рожевий, синій, фіолетовий' },
  { name: 'Лілії', colors: 'Білий, рожевий, помаранчевий' },
  { name: 'Соняшники', colors: 'Жовтий' },
  { name: 'Дельфініум', colors: 'Блакитний, синій, білий' },
  { name: 'Іриси', colors: 'Синій, фіолетовий, білий' },
  { name: 'Матіола', colors: 'Білий, рожевий, бузковий' },
  { name: 'Ранункулюси', colors: 'Білий, рожевий, персиковий, бордовий' },
  { name: 'Евкаліпт', colors: 'Сріблясто-зелений, декоративна зелень' },
];

const COMBOS: ComboRow[] = [
  { n: 31, name: 'Cherry Blossom', composition: 'Червоні троянди + рожеві півонії' },
  { n: 32, name: 'Ivory Blush', composition: 'Білі троянди + кремові еустоми + зелень' },
  { n: 33, name: 'Pink Sunset', composition: 'Рожеві троянди + персикові гербери' },
  { n: 34, name: 'Purple Rain', composition: 'Фіолетові іриси + бузкова еустома + білі квіти' },
  { n: 35, name: 'Cotton Candy', composition: 'Рожеві тюльпани + біла гіпсофіла' },
  { n: 36, name: 'Summer Bloom', composition: 'Соняшники + білі ромашки + польова зелень' },
  { n: 37, name: 'Coral Kiss', composition: 'Коралові троянди + кремові квіти' },
  { n: 38, name: 'Blue Mist', composition: 'Білі троянди + блакитна гортензія' },
  { n: 39, name: 'Autumn Glow', composition: 'Помаранчеві троянди + бордові хризантеми' },
  { n: 40, name: 'Garden Party', composition: 'Ранункулюси + троянди + еустоми різних пастельних відтінків' },
];

const TYPES: CatalogType[] = [
  { title: 'Монобукети', text: 'Один вид квітів, наприклад лише червоні троянди.' },
  { title: 'Збірні букети', text: 'Поєднання кількох кольорів троянд або різних квітів.' },
  { title: 'Авторські композиції', text: 'Унікальні дизайнерські букети.' },
  { title: 'Сезонні букети', text: 'Тюльпани, півонії, польові та інші сезонні квіти.' },
];

@Component({
  selector: 'app-photo-list',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Хлібні крихти">
          <a routerLink="/">Головна</a><span aria-hidden="true">/</span><span>Список</span>
        </nav>
        <span class="eyebrow">Каталог HANA</span>
        <h1>Список</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Які квіти мають бути в каталозі</h2>
        <p class="note">Окремий список для фільтрів і конструктора букетів, щоб покупець міг вибирати не лише готові композиції.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Квітка</th>
                <th>Основні кольори</th>
              </tr>
            </thead>
            <tbody>
              @for (f of flowers; track f.name) {
                <tr>
                  <td class="strong">{{ f.name }}</td>
                  <td>{{ f.colors }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h2>Додаткові комбінації для розширення каталогу</h2>
        <p class="note">Ще варіанти, які можна додати згодом.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Назва</th>
                <th>Склад і кольори</th>
              </tr>
            </thead>
            <tbody>
              @for (c of combos; track c.n) {
                <tr>
                  <td class="strong">{{ c.n }}</td>
                  <td>{{ c.name }}</td>
                  <td>{{ c.composition }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <h2>Як організувати каталог HANA</h2>
        <ul class="types">
          @for (t of types; track t.title) {
            <li>
              <strong>{{ t.title }}</strong>
              <span>{{ t.text }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    h2 {
      margin: var(--space-7) 0 var(--space-3);
    }

    h2:first-child {
      margin-top: 0;
    }

    .note {
      margin: 0 0 var(--space-3);
      color: var(--muted);
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--surface);
    }

    table {
      width: 100%;
      min-width: 480px;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    th,
    td {
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
    }

    th {
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--muted);
    }

    tbody tr:last-child td {
      border-bottom: 0;
    }

    .strong {
      width: 190px;
      font-weight: 700;
      color: var(--berry);
    }

    .types {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .types li {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-5);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--surface);
    }

    .types span {
      color: var(--muted);
    }
  `,
})
export class PhotoList {
  protected readonly flowers = FLOWERS;
  protected readonly combos = COMBOS;
  protected readonly types = TYPES;
}
