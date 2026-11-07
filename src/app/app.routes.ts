import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'HANA — квітковий магазин',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'catalog',
    title: 'Каталог квітів і букетів — HANA',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.Catalog),
  },
  {
    path: 'product/:id',
    title: 'Букет — HANA',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetails),
  },
  {
    path: 'bouquet-builder',
    title: 'Конструктор букета — HANA',
    loadComponent: () =>
      import('./pages/bouquet-builder/bouquet-builder').then((m) => m.BouquetBuilder),
  },
  {
    path: 'favorites',
    title: 'Обране — HANA',
    loadComponent: () => import('./pages/favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: 'cart',
    title: 'Кошик — HANA',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    title: 'Оформлення замовлення — HANA',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'order-success',
    title: 'Дякуємо за замовлення — HANA',
    loadComponent: () => import('./pages/order-success/order-success').then((m) => m.OrderSuccess),
  },
  {
    path: 'about',
    title: 'Про нас — HANA',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contacts',
    title: 'Контакти — HANA',
    loadComponent: () => import('./pages/contacts/contacts').then((m) => m.Contacts),
  },
  {
    path: '**',
    title: 'Сторінку не знайдено — HANA',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
