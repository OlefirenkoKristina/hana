import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  CENTER_X,
  FlowerInput,
  layoutBouquet,
  shadeColor,
  VIEW_H,
  VIEW_W,
} from './bouquet-layout';

/**
 * Реалістичний прев'ю букета: фото-голівки квітів (вирізані, flowers/builder/cut) на спіральній
 * розкладці, з багатошаровим пакуванням (задній і передній папір), стеблами, тінями й бантом.
 */
@Component({
  selector: 'app-realistic-bouquet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="bq"
      [attr.viewBox]="'0 0 ' + W + ' ' + H"
      role="img"
      [attr.aria-label]="label()"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="rb-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id="rb-fold-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.5" />
          <stop offset="0.55" stop-color="#fff" stop-opacity="0.05" />
          <stop offset="1" stop-color="#000" stop-opacity="0.2" />
        </linearGradient>
        <linearGradient id="rb-fold-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#000" stop-opacity="0.22" />
          <stop offset="0.5" stop-color="#fff" stop-opacity="0.08" />
          <stop offset="1" stop-color="#000" stop-opacity="0.12" />
        </linearGradient>
        <radialGradient id="rb-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0" stop-color="#fff" stop-opacity="0.7" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- м'яке світіння позаду й тінь на поверхні -->
      <ellipse [attr.cx]="cx" cy="330" rx="270" ry="300" fill="url(#rb-glow)" />
      <ellipse [attr.cx]="cx" cy="704" [attr.rx]="g().radius * 0.78" ry="15" fill="rgba(60,30,35,0.28)" filter="url(#rb-blur)" />

      <!-- задній шар паперу -->
      <path [attr.d]="geo().back" [attr.fill]="geo().paperDark" />
      <path [attr.d]="geo().back" fill="url(#rb-fold-side)" />

      <!-- стебла -->
      <g class="stems" fill="none" stroke-linecap="round">
        @for (h of g().heads; track $index) {
          <path [attr.d]="stem(h.x, h.y, h.size)" stroke="#40603a" stroke-width="5.5" />
          <path [attr.d]="stem(h.x, h.y, h.size)" stroke="#7ea36c" stroke-width="3" />
        }
      </g>

      <!-- зелень (евкаліпт) позаду голівок -->
      @for (e of g().greens; track $index) {
        <g class="node" [style.transform]="'translate(' + e.x + 'px,' + e.y + 'px)'">
          <image
            [attr.href]="'flowers/builder/cut/' + e.id + '.png'"
            [attr.width]="e.size"
            [attr.height]="e.size"
            [attr.x]="-e.size / 2"
            [attr.y]="-e.size / 2"
            [attr.transform]="'rotate(' + e.rotate + ')'"
            class="piece"
            style="filter: drop-shadow(0 4px 4px rgba(40, 30, 30, 0.3))"
          />
        </g>
      }

      <!-- голівки: від верхніх до нижніх -->
      @for (h of g().heads; track $index) {
        <g class="node" [style.transform]="'translate(' + h.x + 'px,' + h.y + 'px)'">
          <image
            [attr.href]="'flowers/builder/cut/' + h.id + '.png'"
            [attr.width]="h.size"
            [attr.height]="h.size"
            [attr.x]="-h.size / 2"
            [attr.y]="-h.size / 2"
            [attr.transform]="'rotate(' + h.rotate + ') scale(' + (h.flip ? -1 : 1) + ',1)'"
            class="piece"
            [style.filter]="'drop-shadow(0 5px 5px rgba(60, 25, 35, 0.38)) brightness(' + h.shade + ')'"
          />
        </g>
      }

      <!-- передній шар паперу: два перехресні аркуші -->
      <path [attr.d]="geo().frontLeft" [attr.fill]="wrap()" />
      <path [attr.d]="geo().frontLeft" fill="url(#rb-fold-side)" />
      <path [attr.d]="geo().frontRight" [attr.fill]="geo().paperLight" />
      <path [attr.d]="geo().frontRight" fill="url(#rb-fold-light)" />
      <path
        [attr.d]="geo().frontLeft"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path
        [attr.d]="geo().frontRight"
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      @for (f of geo().folds; track $index) {
        <path [attr.d]="f" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1.4" />
        <path [attr.d]="f" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1" transform="translate(2.5 0)" />
      }

      <!-- стрічка -->
      @if (ribbon(); as rb) {
        <g [attr.transform]="'translate(' + cx + ' ' + geo().bindY + ')'">
          <path d="M0 6 L-30 70 L-12 62 L-4 78 Z" [attr.fill]="rb" />
          <path d="M0 6 L30 70 L12 62 L4 78 Z" [attr.fill]="shade(rb, -0.12)" />
          <ellipse cx="-28" cy="-2" rx="30" ry="15" transform="rotate(-16 -28 -2)" [attr.fill]="rb" />
          <ellipse cx="28" cy="-2" rx="30" ry="15" transform="rotate(16 28 -2)" [attr.fill]="shade(rb, -0.1)" />
          <ellipse cx="-28" cy="-5" rx="22" ry="4.5" transform="rotate(-16 -28 -5)" fill="rgba(255,255,255,0.45)" />
          <ellipse cx="28" cy="-5" rx="22" ry="4.5" transform="rotate(16 28 -5)" fill="rgba(255,255,255,0.35)" />
          <circle cx="0" cy="2" r="10" [attr.fill]="shade(rb, -0.2)" />
          <circle cx="-2" cy="-1" r="4" fill="rgba(255,255,255,0.4)" />
        </g>
      }

      @if (!g().heads.length) {
        <text class="hint" [attr.x]="cx" y="250" text-anchor="middle">Додайте квіти — і побачите букет</text>
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    .bq {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .node {
      transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .piece {
      animation: pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    @keyframes pop {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .hint {
      font-family: var(--font-display);
      font-size: 22px;
      fill: var(--muted);
    }
  `,
})
export class RealisticBouquet {
  readonly flowers = input<FlowerInput[]>([]);
  /** Колір пакування (#RRGGBB). */
  readonly wrap = input('#F3E6D3');
  /** Колір стрічки або null без стрічки. */
  readonly ribbon = input<string | null>('#FFFFFF');
  readonly label = input('Попередній перегляд вашого букета');

  protected readonly W = VIEW_W;
  protected readonly H = VIEW_H;
  protected readonly cx = CENTER_X;

  protected readonly g = computed(() => layoutBouquet(this.flowers()));

  /** Геометрія пакування залежить від розміру купола квітів. */
  protected readonly geo = computed(() => {
    const { radius: R, cy } = this.g();
    const cx = CENTER_X;
    const wrapTop = cy + R * 0.4;
    const halfW = R * 1.02 + 34;
    const apexY = 672;
    const backY = cy - R * 0.12;
    const bindY = wrapTop + (apexY - wrapTop) * 0.4;
    const color = this.wrap();

    const back = `M ${cx - halfW * 1.1} ${backY} Q ${cx} ${backY - R * 0.14} ${cx + halfW * 1.1} ${backY} L ${cx + 11} ${apexY} L ${cx - 11} ${apexY} Z`;
    const frontLeft = `M ${cx - halfW} ${wrapTop - R * 0.12} Q ${cx - halfW * 0.3} ${wrapTop + R * 0.02} ${cx + halfW * 0.24} ${wrapTop + R * 0.3} L ${cx + 9} ${apexY} L ${cx - 11} ${apexY} Z`;
    const frontRight = `M ${cx + halfW} ${wrapTop - R * 0.12} Q ${cx + halfW * 0.3} ${wrapTop + R * 0.0} ${cx - halfW * 0.22} ${wrapTop + R * 0.26} L ${cx - 9} ${apexY} L ${cx + 11} ${apexY} Z`;
    const folds = [-0.62, -0.3, 0.32, 0.64].map(
      (k) => `M ${cx + halfW * k} ${wrapTop + R * 0.05 + Math.abs(k) * 10} Q ${cx + halfW * k * 0.55} ${wrapTop + (apexY - wrapTop) * 0.5} ${cx + k * 6} ${apexY}`,
    );

    return {
      back,
      frontLeft,
      frontRight,
      folds,
      bindY,
      paperDark: shadeColor(color, -0.13),
      paperLight: shadeColor(color, 0.1),
    };
  });

  protected shade(color: string, amount: number): string {
    return shadeColor(color, amount);
  }

  /** Стебло від голівки до місця зав'язування. */
  protected stem(x: number, y: number, size: number): string {
    const { bindY } = this.geo();
    const cx = CENTER_X;
    const sy = y + size * 0.18;
    const ex = cx + (x - cx) * 0.1;
    return `M ${x} ${sy} Q ${x + (cx - x) * 0.25} ${(sy + bindY) / 2 + 20} ${ex} ${bindY + 70}`;
  }
}
