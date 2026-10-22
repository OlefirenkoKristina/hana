import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { BouquetArt } from '../../shared/bouquet-art/bouquet-art';
import { Icon } from '../../shared/icon/icon';
import { UahPipe } from '../../shared/uah.pipe';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, DatePipe, BouquetArt, Icon, UahPipe],
  template: `
    <div class="container">
      @if (orders.lastOrder(); as order) {
        <section class="success">
          <div class="badge-ok" aria-hidden="true"><app-icon name="check" [size]="40" [stroke]="2" /></div>
          <span class="eyebrow">Замовлення прийнято</span>
          <h1>Дякуємо, {{ order.customer.name.split(' ')[0] }}!</h1>
          <p class="lead">
            Номер вашого замовлення <strong class="number">{{ order.number }}</strong>.
            Флорист зателефонує на {{ order.customer.phone }}, щоб підтвердити деталі.
          </p>

          <div class="receipt card">
            <dl class="info">
              <div>
                <dt>{{ order.delivery.type === 'pickup' ? 'Самовивіз' : 'Доставка' }}</dt>
                <dd>{{ order.delivery.address }}{{ order.delivery.type === 'courier' ? ', ' + order.delivery.city : '' }}</dd>
              </div>
              <div>
                <dt>Дата і час</dt>
                <dd>{{ order.delivery.date | date: 'd MMMM y' : '' : 'uk' }}, {{ order.delivery.time }}</dd>
              </div>
              <div>
                <dt>Оплата</dt>
                <dd>{{ order.payment === 'cash' ? 'При отриманні' : 'Онлайн (демо)' }}</dd>
              </div>
            </dl>

            <ul class="items">
              @for (item of order.items; track item.key) {
                <li>
                  <div class="thumb"><app-bouquet-art [spec]="item.art" /></div>
                  <span class="name">{{ item.name }} <small>× {{ item.quantity }}</small></span>
                  <strong>{{ item.price * item.quantity | uah }}</strong>
                </li>
              }
            </ul>

            <dl class="totals">
              @if (order.discount) {
                <div><dt>Знижка</dt><dd>−{{ order.discount | uah }}</dd></div>
              }
              <div><dt>Доставка</dt><dd>{{ order.deliveryCost ? (order.deliveryCost | uah) : 'Безкоштовно' }}</dd></div>
              <div class="grand"><dt>Разом</dt><dd>{{ order.total | uah }}</dd></div>
            </dl>
          </div>

          <p class="demo">Це демонстраційне замовлення: воно збережене лише у вашому браузері й не передається магазину.</p>

          <div class="actions">
            <a routerLink="/" class="btn btn--ghost">На головну</a>
            <a routerLink="/catalog" class="btn btn--primary">Продовжити покупки</a>
          </div>
        </section>
      } @else {
        <div class="empty-state">
          <h1>Замовлень ще немає</h1>
          <p>Оберіть букет у каталозі — і тут з'явиться підтвердження.</p>
          <a routerLink="/catalog" class="btn btn--primary">До каталогу</a>
        </div>
      }
    </div>
  `,
  styles: `
    .success {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      max-width: 680px;
      margin-inline: auto;
      padding-top: var(--space-8);
      text-align: center;
    }
    .badge-ok {
      display: grid;
      place-items: center;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: var(--blush);
      color: var(--berry);
      animation: pop 0.6s var(--ease) both;
    }
    @keyframes pop {
      from { transform: scale(0.4); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    .lead {
      margin-inline: auto;
    }
    .number {
      color: var(--berry);
      white-space: nowrap;
    }
    .receipt {
      width: 100%;
      margin-top: var(--space-4);
      padding: var(--space-6);
      text-align: left;
    }
    dl {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      margin: 0;
    }
    dl div {
      display: flex;
      justify-content: space-between;
      gap: var(--space-4);
    }
    dt {
      color: var(--muted);
      flex-shrink: 0;
    }
    dd {
      margin: 0;
      text-align: right;
      font-weight: 600;
    }
    .items {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      margin: var(--space-5) 0;
      padding: var(--space-5) 0;
      border-block: 1px solid var(--line);
      list-style: none;
    }
    .items li {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .thumb {
      width: 48px;
      height: 56px;
      padding: 4px;
      border-radius: 8px;
      background: var(--blush);
    }
    .name {
      flex: 1;
      font-weight: 600;
    }
    .name small {
      color: var(--muted);
      font-weight: 400;
    }
    .grand {
      font-size: 1.2rem;
    }
    .grand dt {
      color: var(--ink);
      font-weight: 700;
    }
    .demo {
      font-size: 0.85rem;
      color: var(--muted);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-3);
      margin-top: var(--space-3);
    }
    @media (max-width: 560px) {
      .receipt {
        padding: var(--space-5);
      }
      dl div {
        flex-direction: column;
        gap: 0;
      }
      dd {
        text-align: left;
      }
      .totals div {
        flex-direction: row;
      }
    }
  `,
})
export class OrderSuccess {
  protected readonly orders = inject(OrderService);
}
