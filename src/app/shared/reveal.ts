import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy, signal } from '@angular/core';

/** Яка частина блока має бути в екрані, щоб він з'явився. */
const SHOW_RATIO = 0.15;

export type RevealKind = 'up' | 'left' | 'right' | 'zoom' | 'photo-left' | 'photo-right';

/**
 * Поява елемента при прокрутці: додає клас `is-visible`, коли блок потрапляє в екран,
 * і прибирає його, коли блок повністю залишає екран — тож анімація повторюється
 * і при прокрутці вниз, і при прокрутці вгору.
 * Стилі анімацій — у глобальних styles.scss (`.reveal`).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[attr.data-reveal]': 'appReveal()',
    '[class.is-visible]': 'visible()',
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class Reveal implements OnDestroy {
  readonly appReveal = input<RevealKind | ''>('up');
  readonly revealDelay = input(0);

  protected readonly visible = signal(false);
  private observer?: IntersectionObserver;

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && e.intersectionRatio >= SHOW_RATIO) this.visible.set(true);
            else if (!e.isIntersecting) this.visible.set(false);
          }
        },
        { threshold: [0, SHOW_RATIO], rootMargin: '0px 0px -6% 0px' },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
