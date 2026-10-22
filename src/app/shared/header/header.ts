import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'closeAll()',
  },
})
export class Header {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);
  protected readonly favorites = inject(FavoritesService);

  protected readonly menuOpen = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly query = signal('');

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly links = [
    { path: '/', label: 'Головна', exact: true },
    { path: '/catalog', label: 'Каталог', exact: false },
    { path: '/bouquet-builder', label: 'Конструктор букета', exact: false },
    { path: '/about', label: 'Про нас', exact: false },
    { path: '/contacts', label: 'Контакти', exact: false },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.closeAll());
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
