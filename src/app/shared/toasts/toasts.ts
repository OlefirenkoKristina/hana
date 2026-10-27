import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-toasts',
  imports: [RouterLink, Icon],
  template: `
    <div class="stack" role="status" aria-live="polite">
      @for (t of toast.toasts(); track t.id) {
        <div class="toast">
          <app-icon name="check" [size]="18" />
          <span class="msg">{{ t.message }}</span>
          @if (t.action; as action) {
            <a [routerLink]="action.link" (click)="toast.dismiss(t.id)">{{ action.label }}</a>
          }
          <button type="button" (click)="toast.dismiss(t.id)" aria-label="Закрити">
            <app-icon name="close" [size]="16" />
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .stack {
      position: fixed;
      right: var(--gutter);
      bottom: var(--gutter);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      max-width: calc(100vw - var(--gutter) * 2);
    }
    .toast {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      min-height: 52px;
      padding: 8px 8px 8px 16px;
      border-radius: var(--radius-sm);
      background: var(--toast-bg);
      color: #fff;
      box-shadow: var(--shadow);
      animation: rise 0.35s var(--ease);
      font-size: 0.92rem;
    }
    .msg {
      flex: 1;
    }
    a {
      color: var(--rose);
      font-weight: 700;
      white-space: nowrap;
    }
    button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: #fff;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.14);
    }
  `,
})
export class Toasts {
  protected readonly toast = inject(ToastService);
}
