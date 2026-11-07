import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/** Максимальний зсув зображення (частка висоти рамки) — відповідає запасу від scale у styles.scss. */
const MAX_SHIFT = 0.035;
/** Інерція: яку частку відстані до цілі зображення проходить за кадр (менше — плавніше). */
const EASE = 0.04;

/**
 * Зсув зображення (px) залежно від положення рамки на екрані:
 * рамка внизу екрана → додатний, посередині → 0, вгорі → від'ємний.
 * При прокрутці вниз значення зменшується (фото підіймається), при прокрутці вгору — зростає.
 */
export function parallaxOffset(top: number, height: number, viewport: number): number {
  const progress = (top + height / 2 - viewport / 2) / (viewport / 2 + height / 2);
  return Math.max(-1.2, Math.min(1.2, progress)) * height * MAX_SHIFT;
}

/**
 * Паралакс для фото: зображення в рамці плавно рухається при прокрутці.
 * Рамка (елемент з директивою) лишається на місці; зсув задає CSS-змінна `--py` (px),
 * яку читає `[data-parallax] img` у styles.scss. Рух згладжується інерцією через requestAnimationFrame.
 * Свідомо не вимикається через prefers-reduced-motion: на сторінці це явно замовлений ефект, а амплітуда мала.
 */
@Directive({
  selector: '[appParallax]',
  host: { 'data-parallax': '' },
})
export class Parallax {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let current = 0;
      let target = 0;
      let first = true;
      let frame = 0;

      const apply = () => el.style.setProperty('--py', current.toFixed(2));

      const tick = () => {
        frame = 0;
        const diff = target - current;
        if (Math.abs(diff) < 0.05) {
          current = target;
        } else {
          current += diff * EASE;
          frame = requestAnimationFrame(tick);
        }
        apply();
      };

      const update = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < -200 || r.top > vh + 200) return;
        target = parallaxOffset(r.top, r.height, vh);
        if (first) {
          first = false;
          current = target;
          apply();
        } else if (!frame) {
          frame = requestAnimationFrame(tick);
        }
      };

      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
        if (frame) cancelAnimationFrame(frame);
      });
    });
  }
}
