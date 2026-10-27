import { Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ThemeService } from '../../core/services/theme.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'closeAll()',
    '(window:scroll)': 'onScroll()',
  },
})
export class Header {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);
  protected readonly favorites = inject(FavoritesService);
  protected readonly theme = inject(ThemeService);

  protected readonly menuOpen = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly query = signal('');

  private readonly url = signal(this.router.url);
  protected readonly scrolled = signal(false);
  /** Шапка ховається, коли гортаємо вниз, і з'являється, коли вгору. */
  protected readonly hidden = signal(false);
  private lastY = 0;

  /** На головній шапка прозора над фото, поки сторінку не прокрутили. */
  protected readonly overlay = computed(
    () => this.url().split(/[?#]/)[0] === '/' && !this.scrolled() && !this.menuOpen() && !this.searchOpen(),
  );

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly links = [
    { path: '/catalog', label: 'Каталог', exact: false },
    { path: '/bouquet-builder', label: 'Конструктор букета', exact: false },
    { path: '/about', label: 'Про нас', exact: false },
    { path: '/contacts', label: 'Контакти', exact: false },
    { path: '/list', label: 'Список', exact: false },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((e) => {
        this.url.set(e.urlAfterRedirects);
        this.closeAll();
      });
    this.onScroll();
  }

  protected onScroll(): void {
    const y = window.scrollY;
    const delta = y - this.lastY;
    this.scrolled.set(y > 24);
    if (y < 80 || this.menuOpen() || this.searchOpen()) {
      this.hidden.set(false);
    } else if (Math.abs(delta) > 6) {
      this.hidden.set(delta > 0);
    }
    if (Math.abs(delta) > 6 || y < 80) this.lastY = y;
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    this.searchOpen.set(false);
  }

  protected toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    this.menuOpen.set(false);
    if (this.searchOpen()) {
      setTimeout(() => this.searchInput()?.nativeElement.focus());
    }
  }

  protected submitSearch(): void {
    const q = this.query().trim();
    this.router.navigate(['/catalog'], { queryParams: q ? { q } : {} });
    this.query.set('');
  }

  protected closeAll(): void {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
  }
}
