import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { Toasts } from './shared/toasts/toasts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toasts],
  template: `
    <a class="skip-link" href="#main">Перейти до вмісту</a>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-toasts />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
    main:focus {
      outline: none;
    }
    .skip-link {
      position: absolute;
      left: 16px;
      top: -60px;
      z-index: 200;
      padding: 10px 16px;
      background: var(--ink);
      color: var(--on-ink);
      border-radius: var(--radius-sm);
    }
    .skip-link:focus {
      top: 12px;
    }
  `,
})
export class App {}
