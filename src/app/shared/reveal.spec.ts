import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<div id="el" appReveal="left" [revealDelay]="200"></div>`,
})
class Host {}

describe('Reveal', () => {
  let callback: (entries: { isIntersecting: boolean; intersectionRatio: number }[]) => void;
  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: typeof callback) {
          callback = cb;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  it('ховає елемент, доки він поза екраном, і додає варіант та затримку', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement.querySelector('#el');

    expect(el.classList.contains('reveal')).toBe(true);
    expect(el.classList.contains('is-visible')).toBe(false);
    expect(el.getAttribute('data-reveal')).toBe('left');
    expect(el.style.getPropertyValue('--reveal-delay')).toBe('200ms');
  });

  it('показує елемент, коли він потрапляє в екран, і ховає, коли повністю виходить', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement.querySelector('#el');

    callback([{ isIntersecting: true, intersectionRatio: 0.4 }]);
    fixture.detectChanges();
    expect(el.classList.contains('is-visible')).toBe(true);

    // ледь торкається краю екрана — ще не ховаємо
    callback([{ isIntersecting: true, intersectionRatio: 0.05 }]);
    fixture.detectChanges();
    expect(el.classList.contains('is-visible')).toBe(true);

    // повністю поза екраном — ховаємо, щоб при поверненні анімація повторилась
    callback([{ isIntersecting: false, intersectionRatio: 0 }]);
    fixture.detectChanges();
    expect(el.classList.contains('is-visible')).toBe(false);

    callback([{ isIntersecting: true, intersectionRatio: 0.3 }]);
    fixture.detectChanges();
    expect(el.classList.contains('is-visible')).toBe(true);
  });
});
