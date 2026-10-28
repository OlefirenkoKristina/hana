import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon, IconName } from '../../shared/icon/icon';

@Component({
  selector: 'app-about',
  imports: [RouterLink, BouquetArt, Icon],
  template: `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Хлібні крихти">
          <a routerLink="/">Головна</a><span aria-hidden="true">/</span><span>Про нас</span>
        </nav>
        <span class="eyebrow">About HANA</span>
        <h1>Квіти з турботою<br />про кожну деталь</h1>
      </div>
    </section>

    <section class="section">
      <div class="container intro">
        <div class="intro-art">
          <app-bouquet-art [spec]="artA" label="Букет у студії HANA" />
        </div>
        <div>
          <span class="eyebrow">Історія</span>
          <h2>Від одного столу — до студії</h2>
          <p class="lead">
            HANA народилася у 2019 році, коли наша засновниця Ханна почала збирати букети для друзів у маленькій
            майстерні на Подолі. Слово «hana» японською означає «квітка» — і саме простоту та чесність японської
            естетики ми взяли за основу.
          </p>
          <p class="text">
            Сьогодні в команді вісім флористів і два кур'єри. Ми працюємо з українськими теплицями та перевіреними
            постачальниками, тому квіти потрапляють до вас свіжими й довго стоять.
          </p>
        </div>
      </div>
    </section>

    <section class="section process-wrap">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Процес</span>
            <h2>Як народжується букет</h2>
          </div>
        </div>
        <ol class="process">
          @for (step of process; track step.title; let i = $index) {
            <li>
              <span class="num">0{{ i + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Цінності</span>
            <h2>У що ми віримо</h2>
          </div>
        </div>
        <div class="values">
          @for (v of values; track v.title) {
            <div class="value">
              <span class="icon"><app-icon [name]="v.icon" [size]="26" /></span>
              <h3>{{ v.title }}</h3>
              <p>{{ v.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="container">
      <div class="gallery" aria-label="Наші роботи">
        @for (art of gallery; track $index) {
          <div class="tile"><app-bouquet-art [spec]="art" /></div>
        }
      </div>
      <div class="cta">
        <h2>Знайдіть свій букет</h2>
        <p class="lead">Понад п'ятнадцять готових композицій і конструктор для власних ідей.</p>
        <div class="cta-actions">
          <a routerLink="/catalog" class="btn btn--primary">До каталогу</a>
          <a routerLink="/bouquet-builder" class="btn btn--ghost">Створити букет</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .intro {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: var(--space-8);
      align-items: center;
    }
    .intro h2 {
      margin-bottom: var(--space-4);
    }
    .intro-art {
      aspect-ratio: 4 / 5;
      padding: 12% 10% 6%;
      border-radius: var(--radius-lg) 999px var(--radius-lg) var(--radius-lg);
      background: var(--blush);
    }
    .text {
      margin-top: var(--space-4);
      color: var(--muted);
    }
    .process-wrap {
      background: var(--blush);
    }
    .process {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-5);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .process li {
      padding-top: var(--space-5);
      border-top: 1.5px solid var(--berry);
    }
    .num {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 700;
      color: var(--berry);
    }
    .process h3 {
      margin: var(--space-2) 0;
    }
    .process p,
    .value p {
      color: var(--muted);
      font-size: 0.95rem;
    }
    .values {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-5);
    }
    .value {
      padding: var(--space-6);
      border-radius: var(--radius);
      background: var(--surface);
      border: 1px solid var(--line);
    }
    .value h3 {
      margin: var(--space-4) 0 var(--space-2);
    }
    .icon {
      display: inline-grid;
      place-items: center;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: var(--blush);
      color: var(--berry);
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
    }
    .tile {
      aspect-ratio: 3 / 4;
      padding: 12% 8% 4%;
      border-radius: var(--radius);
      background: var(--blush);
    }
    .tile:nth-child(even) {
      background: var(--tile-alt);
      transform: translateY(var(--space-6));
    }
    .cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      margin-top: var(--space-9);
      text-align: center;
    }
    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-3);
    }
    @media (max-width: 900px) {
      .intro {
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }
      .intro-art {
        max-width: 380px;
      }
      .process {
        grid-template-columns: repeat(2, 1fr);
      }
      .values {
        grid-template-columns: 1fr;
      }
      .gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 520px) {
      .process {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {
  private readonly products = inject(ProductService);

  protected readonly artA = this.products.getById('peony-cloud')!.art;
  protected readonly gallery = ['bridal-white', 'berry-velvet', 'sunny-morning', 'golden-hour'].map(
    (id) => this.products.getById(id)!.art,
  );

  protected readonly process = [
    { title: 'Вибір квітів', text: 'Щоранку флорист особисто відбирає квіти з нової поставки.' },
    { title: 'Підготовка', text: 'Чистимо стебла, даємо квітам напитися води кілька годин.' },
    { title: 'Збирання', text: 'Збираємо букет вручну спіральною технікою — так він тримає форму.' },
    { title: 'Доставка', text: 'Пакуємо в акватару й доставляємо в термобоксі в будь-яку погоду.' },
  ];

  protected readonly values: { icon: IconName; title: string; text: string }[] = [
    { icon: 'leaf', title: 'Свіжість', text: 'Не продаємо квіти, яких не подарували б самі. Жодних «залежаних» стебел.' },
    { icon: 'flower', title: 'Естетика', text: 'Природні форми, спокійні кольори й баланс — замість надмірності.' },
    { icon: 'heart', title: 'Увага до деталей', text: 'Від стрічки до листівки — кожна дрібниця має значення для того, хто отримає букет.' },
  ];
}
