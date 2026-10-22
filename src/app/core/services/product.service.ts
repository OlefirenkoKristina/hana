import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { Category, Product, ProductSize } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = PRODUCTS;

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getPopular(limit = 8): Product[] {
    return [...this.products].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  }

  /** Схожі товари: спершу з тієї ж категорії, далі — зі спільним кольором. */
  getRelated(product: Product, limit = 4): Product[] {
    const score = (p: Product) =>
      (p.category === product.category ? 2 : 0) +
      (p.colors.some((c) => product.colors.includes(c)) ? 1 : 0);
    return this.products
      .filter((p) => p.id !== product.id)
      .sort((a, b) => score(b) - score(a) || b.popularity - a.popularity)
      .slice(0, limit);
  }

  getByCategory(category: Category): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  /** Межі цін у каталозі — для підказок у полях фільтра. */
  priceBounds(): { min: number; max: number } {
    const prices = this.products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }

  /**
   * Варіанти розміру S / M / L. Базова ціна — це розмір M.
   * Квіти в горщиках мають лише один варіант.
   */
  sizesFor(product: Product): ProductSize[] {
    if (product.category === 'potted') return [];
    const round10 = (n: number) => Math.round(n / 10) * 10;
    return [
      {
        code: 'S',
        label: 'Компактний',
        stems: Math.max(3, Math.round(product.stems * 0.7)),
        price: round10(product.price * 0.75),
      },
      { code: 'M', label: 'Стандарт', stems: product.stems, price: product.price },
      {
        code: 'L',
        label: 'Пишний',
        stems: Math.round(product.stems * 1.5),
        price: round10(product.price * 1.4),
      },
    ];
  }
}
