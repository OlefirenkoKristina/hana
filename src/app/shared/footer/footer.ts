import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <img class="leaf leaf--l" src="flowers/contacts-dark-left.png" alt="" aria-hidden="true" />
      <img class="leaf leaf--r" src="flowers/contacts-dark-left.png" alt="" aria-hidden="true" />
      <div class="container grid">
        <div class="brand">
          <a routerLink="/" class="logo" aria-label="HANA — на головну">
            <img src="logo-light.png" alt="HANA — flower shop" width="569" height="386" />
          </a>
          <p>Квіти для ваших маленьких моментів. Збираємо букети вручну щодня з 2019 року.</p>
        </div>

        <nav aria-label="Магазин">
          <h3>Магазин</h3>
          <a routerLink="/catalog">Каталог</a>
          <a routerLink="/catalog" [queryParams]="{ category: 'bouquets' }">Авторські букети</a>
          <a routerLink="/catalog" [queryParams]="{ category: 'roses' }">Троянди</a>
          <a routerLink="/bouquet-builder">Конструктор букета</a>
        </nav>

        <nav aria-label="Інформація">
          <h3>HANA</h3>
          <a routerLink="/about">Про нас</a>
          <a routerLink="/contacts">Контакти</a>
          <a routerLink="/favorites">Обране</a>
          <a routerLink="/cart">Кошик</a>
        </nav>

        <div class="contacts">
          <h3>Контакти</h3>
          <a href="tel:+380671234567">+38 (067) 123-45-67</a>
          <a href="mailto:hello@hana.flowers">hello&#64;hana.flowers</a>
          <p>Щодня 08:00 – 21:00</p>
        </div>
      </div>

      <div class="container bottom">
        <span>© 2026 HANA Flowers. Курсовий проєкт.</span>
        <span>Ціни та замовлення — демонстраційні</span>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: var(--space-7);
      padding-top: var(--space-6);
      background: linear-gradient(135deg, #5c6c5a 0%, #4d5b4b 45%, #3b4739 100%);
      color: #ece8de;
      font-size: 0.9rem;
    }
    /* Темна тема: глибокий темний зелений #1D211D */
    .leaf {
      display: none;
    }
    :host-context([data-theme='dark']) .footer {
      position: relative;
      overflow: hidden;
      border-top: 1px solid rgba(216, 178, 150, 0.38);
      background:
        radial-gradient(ellipse 60% 120% at 30% 20%, rgba(255, 255, 255, 0.025), transparent 70%),
        linear-gradient(135deg, #272b20 0%, #20241b 100%);
      color: #efe6dc;
    }
    :host-context([data-theme='dark']) .footer h3 {
      color: #e3a98c;
    }
    :host-context([data-theme='dark']) .footer .container {
      position: relative;
      z-index: 1;
    }
    :host-context([data-theme='dark']) .leaf {
      display: block;
      position: absolute;
      bottom: 0;
      width: min(8vw, 130px);
      opacity: 0.9;
      pointer-events: none;
    }
    :host-context([data-theme='dark']) .leaf--l {
      left: 0;
      transform: scaleY(-1);
    }
    :host-context([data-theme='dark']) .leaf--r {
      right: 0;
      top: 0;
      bottom: auto;
      transform: scaleX(-1);
    }
    .grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
      gap: var(--space-5);
    }
    .logo {
      display: inline-block;
    }
    .logo img {
      display: block;
      width: auto;
      height: 64px;
    }
    .brand p {
      margin-top: var(--space-2);
      color: #b9adaa;
      max-width: 34ch;
      font-size: 0.85rem;
    }
    h3 {
      margin-bottom: var(--space-2);
      font-family: var(--font-body);
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--rose);
    }
    nav,
    .contacts {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    nav a,
    .contacts a {
      width: fit-content;
      transition: color 0.2s;
    }
    nav a:hover,
    .contacts a:hover {
      color: var(--rose);
    }
    .contacts p {
      color: #b9adaa;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-5);
      padding-block: var(--space-3);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 0.8rem;
      color: #a3999b;
    }
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
      .brand {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 480px) {
      .grid {
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }
    }
  `,
})
export class Footer {}
