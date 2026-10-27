import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PhotoRow {
  id: string;
  name: string;
  find: string;
  wrap: string;
}

interface PhotoGroup {
  title: string;
  note?: string;
  rows: PhotoRow[];
}

/** Список фото, які потрібні сайту. Той самий текст лежить у docs/photos-needed.md. */
const GROUPS: PhotoGroup[] = [
  {
    title: 'Банер головної',
    rows: [
      {
        id: 'H01',
        name: 'Банер',
        find: 'Широкий кадр 3:2: великий букет або квіти у вазі, спокійний фон. Зверху й посередині місце під текст «HANA».',
        wrap: 'не важливо',
      },
    ],
  },
  {
    title: 'Категорії на головній',
    note: 'Вертикальні фото 9:13. Їх можна брати з готових букетів P.',
    rows: [
      { id: 'C1', name: 'Авторські букети', find: 'Змішаний пастельний букет: троянди, півонії, лізіантус', wrap: 'так, кремове' },
      { id: 'C2', name: 'Троянди', find: 'Лише троянди, без інших квіток', wrap: 'так' },
      { id: 'C3', name: 'Тюльпани', find: 'Лише тюльпани', wrap: 'так, крафт або біле' },
      { id: 'C4', name: 'Півонії', find: 'Лише півонії', wrap: 'так, біле або кремове' },
      { id: 'C5', name: 'Сезонні квіти', find: 'Польовий букет: ромашки, тюльпани, лаванда', wrap: 'крафт' },
      { id: 'C6', name: 'Квіти в горщиках', find: 'Орхідея або міні-троянда в горщику', wrap: 'без, замість нього горщик' },
    ],
  },
  {
    title: 'Авторські букети',
    rows: [
      { id: 'P01', name: 'Pink Dream', find: 'Рожеві троянди, півонії, білі троянди, евкаліпт', wrap: 'так, кремове, стрічка пудрова' },
      { id: 'P07', name: 'Bridal White', find: 'Весільний: білі троянди, білі півонії, ромашки, евкаліпт, пишний', wrap: 'так, біле, стрічка кремова' },
      { id: 'P09', name: 'Berry Velvet', find: 'Бордові троянди, півонії, лаванда, темні винні відтінки', wrap: 'так, кремове, стрічка бордова' },
      { id: 'P13', name: 'Golden Hour', find: 'Персикові троянди, жовті тюльпани, ромашки', wrap: 'так, крафт, стрічка кремова' },
    ],
  },
  {
    title: 'Троянди',
    rows: [
      { id: 'P03', name: 'Classic Red 25', find: '25 червоних троянд на довгому стеблі, лише троянди', wrap: 'так, бордове' },
      { id: 'P08', name: 'Coral Kiss', find: '11 коралових і персикових троянд, лише троянди', wrap: 'так, рожеве' },
      { id: 'P14', name: 'First Date', find: '9 червоних і рожевих троянд, компактний', wrap: 'так, кремове, стрічка ягідна' },
      { id: 'P15', name: 'Pastel Roses (новий)', find: 'Рожеві або білі троянди, лише троянди', wrap: 'без: у вазі або зв’язані стрічкою' },
    ],
  },
  {
    title: 'Тюльпани',
    rows: [
      { id: 'P02', name: 'White Tulips', find: '15 білих тюльпанів, лише тюльпани', wrap: 'так, крафт, стрічка біла' },
      { id: 'P10', name: 'Tulip Rainbow', find: '25 тюльпанів: рожеві, жовті, червоні', wrap: 'так, біле, стрічка пудрова' },
    ],
  },
  {
    title: 'Півонії',
    rows: [
      { id: 'P04', name: 'Peony Cloud', find: '9 великих рожевих півоній, лише півонії', wrap: 'так, кремове, стрічка пудрова' },
      { id: 'P11', name: 'Blush Trio', find: '5 півоній, пудрові й білі, з евкаліптом', wrap: 'так, рожеве, стрічка біла' },
    ],
  },
  {
    title: 'Сезонні квіти',
    rows: [
      { id: 'P05', name: 'Sunny Morning', find: 'Ромашки, жовті тюльпани, евкаліпт', wrap: 'так, крафт, стрічка біла' },
      { id: 'P06', name: 'Lavender Field', find: 'Лаванда і бузкові троянди', wrap: 'так, кремове, стрічка ягідна' },
      { id: 'P12', name: 'Spring Whisper', find: 'Рожеві тюльпани, білі троянди, ромашки', wrap: 'так, рожеве, стрічка біла' },
    ],
  },
  {
    title: 'Квіти в горщиках',
    rows: [
      { id: 'P16', name: 'Phalaenopsis', find: 'Біла або ліловa орхідея з двома квітконосами', wrap: 'без: керамічне кашпо' },
      { id: 'P17', name: 'Mini Rose Pot', find: 'Рожева кущова міні-троянда', wrap: 'без: горщик Ø 12 см' },
    ],
  },
  {
    title: 'Для конструктора (не обов’язково)',
    note: 'Одна квітка або кілька на білому фоні, без пакування.',
    rows: [
      { id: 'F01', name: 'Троянда червона', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F02', name: 'Троянда рожева', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F03', name: 'Троянда біла', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F04', name: 'Троянда персикова', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F05', name: 'Півонія', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F06', name: 'Тюльпан жовтий', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F07', name: 'Тюльпан рожевий', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F08', name: 'Ромашка', find: 'Окрема квітка', wrap: 'без' },
      { id: 'F09', name: 'Лаванда', find: 'Окрема гілка', wrap: 'без' },
      { id: 'F10', name: 'Евкаліпт', find: 'Окрема гілка', wrap: 'без' },
    ],
  },
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
        <span class="eyebrow">Фото для сайту</span>
        <h1>Список</h1>
        <p class="lead">
          Які фото потрібні сайту. Назвіть файл за ID, наприклад <code>P03.jpg</code>, і покладіть у
          <code>public/flowers/</code>. Вертикальні фото від 1200 px, світлий чистий фон, без людей і написів.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        @for (g of groups; track g.title) {
          <h2>{{ g.title }}</h2>
          @if (g.note) {
            <p class="note">{{ g.note }}</p>
          }
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Назва</th>
                  <th>Що знайти</th>
                  <th>Пакування</th>
                </tr>
              </thead>
              <tbody>
                @for (r of g.rows; track r.id) {
                  <tr>
                    <td class="id">{{ r.id }}</td>
                    <td>{{ r.name }}</td>
                    <td>{{ r.find }}</td>
                    <td>{{ r.wrap }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
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

    code {
      padding: 1px 6px;
      border-radius: 6px;
      background: var(--blush);
      color: var(--ink);
      font-size: 0.9em;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--surface);
    }

    table {
      width: 100%;
      min-width: 640px;
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

    .id {
      width: 72px;
      font-weight: 700;
      color: var(--berry);
      white-space: nowrap;
    }
  `,
})
export class PhotoList {
  protected readonly groups = GROUPS;
}
