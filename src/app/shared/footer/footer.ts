import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  template: `
    <footer class="footer">
      <div class="container grid">
        <div class="brand">
          <a routerLink="/" class="logo" aria-label="HANA — на головну">
            <img src="logo-light.png" alt="HANA — flower shop" width="569" height="386" />
          </a>
          <p>Квіти для ваших маленьких моментів. Збираємо букети вручну щодня з 2019 року.</p>
          <div class="social">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
              <app-icon name="instagram" />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener" aria-label="Telegram">
              <app-icon name="telegram" />
            </a>
          </div>
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
          <p>Київ, вул. Ярославів Вал, 14</p>
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
      margin-top: var(--space-9);
      padding-top: var(--space-8);
      background: var(--footer-bg);
      color: #ece8de;
    }
    .grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
      gap: var(--space-7);
    }
    .logo {
      display: inline-block;
    }
    .logo img {
      display: block;
      width: auto;
      height: 110px;
    }
    .brand p {
      margin-top: var(--space-3);
      color: #b9adaa;
      max-width: 34ch;
    }
    h3 {
      margin-bottom: var(--space-4);
      font-family: var(--font-body);
      font-size: 0.78rem;
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
    .social {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-5);
    }
    .social a {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transition: all 0.2s;
    }
    .social a:hover {
      background: var(--rose);
      border-color: var(--rose);
      color: #2e2e2e;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-8);
      padding-block: var(--space-5);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 0.85rem;
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
