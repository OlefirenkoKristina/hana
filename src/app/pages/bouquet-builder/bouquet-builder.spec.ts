import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { BouquetBuilder } from './bouquet-builder';

describe('BouquetBuilder', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BouquetBuilder],
      providers: [provideRouter([{ path: 'cart', children: [] }])],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(BouquetBuilder);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  function clickPlus(el: HTMLElement, flowerName: string, times = 1) {
    const button = el.querySelector<HTMLButtonElement>(`button[aria-label="Більше: ${flowerName}"]`)!;
    for (let i = 0; i < times; i++) button.click();
  }

  it('кнопка «Далі» неактивна, доки не обрано мінімум квітів', async () => {
    const { fixture, el } = setup();
    const next = () => [...el.querySelectorAll<HTMLButtonElement>('.nav .btn--primary')][0];
    expect(next().disabled).toBe(true);

    clickPlus(el, 'Троянда рожева', 3);
    await fixture.whenStable();
    expect(next().disabled).toBe(false);
  });

  it('оновлює загальну вартість при зміні кількості', async () => {
    const { fixture, el } = setup();
    clickPlus(el, 'Троянда рожева', 5);
    await fixture.whenStable();
    // 5 × 85 + кремове пакування 120 + пудрова стрічка 40 + робота 100
    expect(el.querySelector('.price-row.total strong')?.textContent?.replace(/\s/g, '')).toBe('685грн');
  });

  it('додає готовий букет у кошик', async () => {
    const { fixture, el } = setup();
    clickPlus(el, 'Ромашка', 4);
    await fixture.whenStable();

    for (let step = 0; step < 3; step++) {
      el.querySelector<HTMLButtonElement>('.nav .btn--primary')!.click();
      await fixture.whenStable();
    }
    el.querySelector<HTMLButtonElement>('.nav .btn--primary')!.click();

    const cart = TestBed.inject(CartService);
    expect(cart.items()).toHaveLength(1);
    expect(cart.items()[0]).toMatchObject({ name: 'Власний букет', productId: null, quantity: 1 });
    expect(cart.items()[0].details).toContain('Ромашка × 4');
  });
});
