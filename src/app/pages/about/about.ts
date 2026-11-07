import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Icon, IconName } from '../../shared/icon/icon';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon],
  template: `
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Хлібні крихти">
          <a routerLink="/">Головна</a><span aria-hidden="true">/</span><span>Про нас</span>
        </nav>
      </div>
    </section>

    <section class="section intro-section">
      <div class="intro">
        <div class="intro-art">
          <img src="flowers/about-studio.jpg" alt="Студія HANA" />
        </div>
        <div class="intro-text">
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

    <section class="process-wrap">
      <div class="process-text">
        <span class="eyebrow">Процес</span>
        <h2>Як народжується букет</h2>
        <ol class="process">
          @for (step of process; track step.title; let i = $index) {
            <li>
              <span class="num">0{{ i + 1 }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
      <div class="process-photo">
        <img src="flowers/about-process.jpg" alt="Флорист збирає букет у студії HANA" loading="lazy" />
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
        @for (p of gallery; track p.id) {
          <div class="tile"><img [src]="p.image" [alt]="p.name" loading="lazy" /></div>
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
    .page-hero {
      padding-block: var(--space-3);
    }
    .page-hero .container {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: var(--space-2) var(--space-6);
    }
    .page-hero .breadcrumbs {
      margin-bottom: 0;
    }
    .page-hero h1 {
      font-size: clamp(1.3rem, 2.4vw, 1.7rem);
    }
    .intro-section {
      padding: 0;
    }
    .intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: stretch;
      min-height: calc(100svh - 124px);
    }
    .intro-text {
      align-self: center;
      padding: var(--space-8) var(--gutter) var(--space-8) var(--space-8);
      max-width: 720px;
    }
    .intro h2 {
      margin-bottom: var(--space-4);
    }
    .intro-art {
      overflow: hidden;
      background: var(--blush);
    }
    .intro-art img,
    .tile img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .text {
      margin-top: var(--space-4);
      color: var(--muted);
    }
    .process-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100svh;
      background: var(--blush);
    }
    .process-text {
      align-self: center;
      padding: var(--space-8) var(--space-8) var(--space-8) max(var(--gutter), calc((100vw - var(--container)) / 2));
    }
    .process-text h2 {
      margin: var(--space-2) 0 var(--space-6);
    }
    .process-photo img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .process {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .process li {
      display: grid;
      grid-template-columns: 72px 1fr;
      align-items: start;
      gap: var(--space-4);
      padding-top: var(--space-4);
      border-top: 1.5px solid var(--berry);
    }
    .num {
      font-family: var(--font-display);
      font-size: 2.4rem;
      line-height: 1;
      font-weight: 700;
      color: var(--berry);
    }
    .process h3 {
      margin: 0 0 var(--space-1);
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
      overflow: hidden;
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
      .intro {
        min-height: 0;
      }
      .intro-art {
        height: 55svh;
      }
      .intro-text {
        padding: var(--space-6) var(--gutter);
      }
      .process-wrap {
        grid-template-columns: 1fr;
        min-height: 0;
      }
      .process-text {
        padding: var(--space-7) var(--gutter);
      }
      .process-photo {
        height: 55svh;
      }
      .values {
        grid-template-columns: 1fr;
      }
      .gallery {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `,
})
export class About {
  private readonly products = inject(ProductService);

  protected readonly gallery = ['freesia-blush', 'pink-kraft', 'snow-romance', 'hydrangea-blush'].map(
    (id) => this.products.getById(id)!,
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
