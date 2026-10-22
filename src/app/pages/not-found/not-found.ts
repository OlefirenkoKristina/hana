import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="container empty-state">
      <span class="code">404</span>
      <h1>Сторінку не знайдено</h1>
      <p>Схоже, ця квітка вже відцвіла. Поверніться на головну або перегляньте каталог.</p>
      <div class="actions">
        <a routerLink="/" class="btn btn--ghost">На головну</a>
        <a routerLink="/catalog" class="btn btn--primary">До каталогу</a>
      </div>
    </div>
  `,
  styles: `
    .empty-state {
      padding-block: var(--space-9);
    }
    .code {
      font-family: var(--font-display);
      font-size: 7rem;
      line-height: 1;
      color: var(--rose);
    }
    .actions {
      display: flex;
      gap: var(--space-3);
    }
  `,
})
export class NotFound {}
