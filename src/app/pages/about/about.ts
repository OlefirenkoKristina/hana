import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Icon, IconName } from '../../shared/icon/icon';
import { Parallax } from '../../shared/parallax';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon, Reveal, Parallax],
  template: `
    <section class="about-top">
      <img class="deco deco--peony" src="flowers/about-peony-top.png" alt="" aria-hidden="true" />
      <img class="deco deco--peony-mid" src="flowers/about-peony-mid.png" alt="" aria-hidden="true" />
      <img class="deco deco--peony-left" src="flowers/about-peony-left.png" alt="" aria-hidden="true" />
      <img class="deco deco--lines" src="flowers/catalog-leaves-hero.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal petal-a" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal petal-b" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco dk-deco dk-peony-tr" src="flowers/contacts-dark-peony.png" alt="" aria-hidden="true" />
      <img class="deco dk-deco dk-leaves-tl" src="flowers/contacts-dark-left.png" alt="" aria-hidden="true" />
      <img class="deco dk-deco dk-peony-bl" src="flowers/about-dark-bl.png" alt="" aria-hidden="true" />
      <img class="deco dk-deco dk-peony-br" src="flowers/about-dark-br.png" alt="" aria-hidden="true" />

      <div class="about-inner">
        <header class="about-head">
          <h1 appReveal>Про нас</h1>
          <p class="tagline" appReveal [revealDelay]="150">Квіти, що надихають <app-icon name="heart" [size]="22" /></p>
        </header>

        <div class="about-row">
          <div class="about-photo" appReveal="photo-left" [revealDelay]="200" appParallax>
            <img src="flowers/about-studio.jpg" alt="Студія HANA" />
          </div>
          <div class="about-card" appReveal [revealDelay]="450">
            <h2>HANA — більше, ніж квіти</h2>
            <p>
              Ми створюємо букети, які говорять замість слів. У HANA ми віримо, що квіти — це емоції, краса і турбота.
              Ми надихаємо робити світ ніжнішим, дарувати радість і зберігати важливі моменти у квітах.
            </p>
            <p>
              Кожен букет у HANA — це поєднання естетики, якості та любові до деталей. Ми дбаємо про те, щоб ваші
              особливі моменти були ще яскравішими.
            </p>
            <button type="button" class="btn btn--ghost" (click)="scrollTo('process')">
              Дізнатися більше <app-icon name="arrow" [size]="18" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="process-wrap" id="process">
      <img class="deco deco--proc-peony" src="flowers/about-peony-top.png" alt="" aria-hidden="true" />
      <img class="deco deco--proc-lines" src="flowers/catalog-leaves-left.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal proc-petal" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco pk-deco pk-tr" src="flowers/contacts-dark-peony.png" alt="" aria-hidden="true" />
      <img class="deco pk-deco pk-bl" src="flowers/about-dark-bl.png" alt="" aria-hidden="true" />
      <img class="deco pk-deco pk-br" src="flowers/about-dark-br.png" alt="" aria-hidden="true" />
      <img class="deco pk-deco pk-lines" src="flowers/contacts-dark-left.png" alt="" aria-hidden="true" />

      <div class="process-inner">
        <header class="process-head">
          <h2 appReveal>Як народжується букет</h2>
          <p class="tagline" appReveal [revealDelay]="150">Чотири кроки від поставки до вашого порогу <app-icon name="flower" [size]="22" /></p>
        </header>

        <div class="process-row">
          <ol class="process">
            @for (step of process; track step.title; let i = $index) {
              <li class="step" appReveal [revealDelay]="250 + i * 140">
                <span class="num">0{{ i + 1 }}</span>
                <app-icon class="step-ico" [name]="step.icon" [size]="34" [stroke]="1.1" />
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </li>
            }
          </ol>
          <div class="process-photo" appReveal="photo-right" [revealDelay]="200" appParallax>
            <img src="flowers/about-process.jpg" alt="Флорист збирає букет у студії HANA" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <section class="screen">
      <img class="deco deco--val-peony" src="flowers/about-peony-top.png" alt="" aria-hidden="true" />
      <img class="deco deco--val-lines" src="flowers/catalog-leaves-hero.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal val-petal" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco vk-deco vk-tr" src="flowers/contacts-dark-peony.png" alt="" aria-hidden="true" />
      <img class="deco vk-deco vk-tl" src="flowers/about-dark-bl.png" alt="" aria-hidden="true" />
      <img class="deco vk-deco vk-br" src="flowers/about-dark-br.png" alt="" aria-hidden="true" />
      <img class="deco vk-deco vk-lines-bl" src="flowers/contacts-dark-left.png" alt="" aria-hidden="true" />

      <div class="screen-inner">
        <header class="screen-head">
          <h2 appReveal>У що ми віримо</h2>
          <p class="tagline" appReveal [revealDelay]="150">Три принципи, з яких складається кожен букет <app-icon name="heart" [size]="22" /></p>
        </header>

        <div class="values">
          @for (v of values; track v.title; let i = $index) {
            <div class="value" appReveal [revealDelay]="250 + i * 140">
              <span class="icon"><app-icon [name]="v.icon" [size]="26" /></span>
              <div>
                <h3>{{ v.title }}</h3>
                <p>{{ v.text }}</p>
              </div>
            </div>
          }
        </div>

        <div class="gallery" aria-label="Наші роботи">
          @for (p of gallery; track p.id; let i = $index) {
            <div class="tile" appReveal="zoom" [revealDelay]="600 + i * 140" appParallax><img [src]="p.image" [alt]="p.name" loading="lazy" /></div>
          }
        </div>
      </div>
    </section>

    <section class="cta-section">
      <img class="deco deco--cta-peony" src="flowers/about-peony-top.png" alt="" aria-hidden="true" />
      <img class="deco deco--cta-peony-r" src="flowers/about-peony-top.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal cta-petal-a" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco deco--petal cta-petal-b" src="flowers/about-petal.png" alt="" aria-hidden="true" />
      <img class="deco ck-deco ck-tr" src="flowers/contacts-dark-peony.png" alt="" aria-hidden="true" />
      <img class="deco ck-deco ck-bl" src="flowers/about-dark-bl.png" alt="" aria-hidden="true" />
      <img class="deco ck-deco ck-br" src="flowers/about-dark-br.png" alt="" aria-hidden="true" />

      <div class="cta">
        <h2 appReveal>Знайдіть свій букет</h2>
        <p class="tagline" appReveal [revealDelay]="150">
          Понад п'ятнадцять готових композицій і конструктор для власних ідей <app-icon name="heart" [size]="22" />
        </p>
        <div class="cta-actions" appReveal [revealDelay]="300">
          <a routerLink="/catalog" class="btn btn--primary">До каталогу <app-icon name="arrow" [size]="18" /></a>
          <a routerLink="/bouquet-builder" class="btn btn--ghost">Створити букет</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    /* Світла тема: усі секції одного кольору, краї плавно розчиняються — переходів не видно */
    .about-top::after,
    .process-wrap::after,
    .screen::after,
    .cta-section::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .about-top::after {
      background: linear-gradient(to top, #f9e9e5 0, rgba(249, 233, 229, 0) 240px);
    }
    .process-wrap::after,
    .screen::after {
      background:
        linear-gradient(to bottom, #f9e9e5 0, rgba(249, 233, 229, 0) 240px),
        linear-gradient(to top, #f9e9e5 0, rgba(249, 233, 229, 0) 240px);
    }
    .cta-section::after {
      background: linear-gradient(to bottom, #f9e9e5 0, rgba(249, 233, 229, 0) 240px);
    }
    /* Темна тема: м'який перехід між секціями — краї розчиняються в загальний колір фону */
    :host-context([data-theme='dark']) .about-top::after,
    :host-context([data-theme='dark']) .process-wrap::after,
    :host-context([data-theme='dark']) .screen::after,
    :host-context([data-theme='dark']) .cta-section::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    :host-context([data-theme='dark']) .about-top::after {
      background: linear-gradient(to top, #252d1a 0, rgba(37, 45, 26, 0) 240px);
    }
    :host-context([data-theme='dark']) .process-wrap::after,
    :host-context([data-theme='dark']) .screen::after {
      background:
        linear-gradient(to bottom, #252d1a 0, rgba(37, 45, 26, 0) 240px),
        linear-gradient(to top, #252d1a 0, rgba(37, 45, 26, 0) 240px);
    }
    :host-context([data-theme='dark']) .cta-section::after {
      background: linear-gradient(to bottom, #252d1a 0, rgba(37, 45, 26, 0) 240px);
    }
    .about-top {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100svh;
      min-height: 680px;
      padding-top: var(--header-h);
      padding-bottom: var(--space-5);
      background: #f9e9e5;
    }
    :host-context([data-theme='dark']) .about-top {
      /* темна тема: оливкове тло й яскраві піони, як на макеті */
      background: #252d1a;
    }
    .dk-deco {
      display: none;
    }
    :host-context([data-theme='dark']) .about-top .deco:not(.dk-deco) {
      display: none;
    }
    :host-context([data-theme='dark']) .about-top .dk-deco {
      display: block;
      opacity: 1;
    }
    .dk-peony-tr {
      top: 0;
      right: 0;
      width: min(31vw, 540px);
    }
    .dk-leaves-tl {
      top: 0;
      left: 0;
      width: min(9vw, 150px);
    }
    .dk-peony-bl {
      bottom: 0;
      left: 0;
      width: min(24vw, 420px);
    }
    .dk-peony-br {
      bottom: 0;
      right: 0;
      width: min(25vw, 430px);
    }
    .deco {
      position: absolute;
      z-index: 0;
      pointer-events: none;
    }
    :host-context([data-theme='dark']) .deco {
      opacity: 0.18;
    }
    .deco--peony {
      top: 0;
      right: 0;
      width: min(34vw, 560px);
    }
    .deco--peony-mid {
      top: 10px;
      left: 27%;
      width: min(30vw, 540px);
      transform: scaleX(-1);
    }
    .deco--peony-left {
      top: 330px;
      left: 0;
      width: 96px;
    }
    .deco--lines {
      top: 40px;
      left: 0;
      height: 190px;
    }
    .deco--petal {
      width: 86px;
    }
    .petal-a {
      top: 150px;
      left: 52%;
      transform: rotate(-18deg);
    }
    .petal-b {
      bottom: 60px;
      right: 18%;
      transform: rotate(24deg);
    }
    .about-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex: 1;
      min-height: 0;
      flex-direction: column;
      width: min(94%, 1640px);
      margin-inline: auto;
    }
    .about-head {
      padding: var(--space-6) var(--space-6) 0;
    }
    .about-head h1 {
      font-size: clamp(2.6rem, 4.4vw, 3.6rem);
      font-weight: 500;
      line-height: 1.05;
    }
    .tagline {
      margin-top: var(--space-2);
      font-size: 1.3rem;
    }
    .tagline app-icon {
      display: inline-block;
      margin-left: 6px;
      vertical-align: -5px;
    }
    .about-row {
      display: grid;
      grid-template-columns: 1.08fr 1fr;
      gap: 12px;
      flex: 1;
      grid-template-rows: minmax(0, 1fr);
      min-height: 0;
      margin-top: var(--space-4);
    }
    .about-photo {
      position: relative;
      overflow: hidden;
      border-radius: 26px;
      background: var(--blush);
      box-shadow: 0 20px 50px rgba(196, 138, 138, 0.22);
    }
    .about-photo img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .tile img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    /* трохи зрізаємо верх кадру, логотип на вивісці лишається цілим */
    .about-photo img {
      object-position: 50% 28%;
    }
    .about-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: var(--space-3);
      min-height: 0;
      overflow: auto;
      padding: clamp(24px, 3vw, 48px);
      border-radius: 28px;
      background: rgba(255, 251, 249, 0.72);
      backdrop-filter: blur(6px);
      box-shadow: 0 20px 50px rgba(196, 138, 138, 0.16);
    }
    :host-context([data-theme='dark']) .about-card {
      /* матове прозоре скло, як на макеті */
      border: 1px solid rgba(255, 255, 255, 0.16);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 40%),
        rgba(120, 108, 94, 0.28);
      -webkit-backdrop-filter: blur(22px) saturate(1.15);
      backdrop-filter: blur(22px) saturate(1.15);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }
    :host-context([data-theme='dark']) .about-card .btn--ghost {
      border-color: transparent;
      background: #f2c9c4;
      color: #3b2b2a;
    }
    :host-context([data-theme='dark']) .about-photo {
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .about-card h2 {
      font-size: clamp(1.7rem, 2.4vw, 2.2rem);
      font-weight: 500;
    }
    .about-card p {
      color: var(--muted);
      line-height: 1.7;
    }
    .process-wrap {
      position: relative;
      display: flex;
      overflow: hidden;
      height: calc(100svh - 77px);
      min-height: 560px;
      scroll-margin-top: 77px;
      background: #f9e9e5;
    }
    :host-context([data-theme='dark']) .process-wrap {
      background: #252d1a;
    }
    .pk-deco,
    .step-ico {
      display: none;
    }
    :host-context([data-theme='dark']) .process-wrap .deco:not(.pk-deco) {
      display: none;
    }
    :host-context([data-theme='dark']) .process-wrap .pk-deco {
      display: block;
      opacity: 1;
    }
    :host-context([data-theme='dark']) .step-ico {
      display: block;
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      color: #d9b3a4;
      opacity: 0.85;
    }
    .pk-tr {
      top: 0;
      right: 0;
      width: min(26vw, 440px);
    }
    .pk-bl {
      top: -3%;
      left: 0;
      width: min(15vw, 260px);
    }
    .pk-br {
      bottom: 0;
      right: 0;
      width: min(22vw, 380px);
    }
    .pk-lines {
      bottom: 0;
      left: 0;
      width: min(12vw, 200px);
      transform: scaleY(-1);
    }
    .deco--proc-peony {
      top: 0;
      left: 0;
      width: min(30vw, 500px);
      transform: scaleX(-1);
    }
    .deco--proc-lines {
      right: 0;
      bottom: 40px;
      width: 150px;
      transform: scaleX(-1);
    }
    .proc-petal {
      right: 34%;
      top: 60px;
      transform: rotate(32deg);
    }
    .process-inner {
      position: relative;
      z-index: 1;
      display: flex;
      min-height: 0;
      flex-direction: column;
      width: min(94%, 1640px);
      margin-inline: auto;
      padding-block: var(--space-5);
    }
    .process-head {
      text-align: center;
    }
    .process-head h2 {
      font-size: clamp(2.2rem, 3.8vw, 3.2rem);
      font-weight: 500;
    }
    .process-row {
      display: grid;
      flex: 1;
      grid-template-columns: 1fr 0.9fr;
      grid-template-rows: minmax(0, 1fr);
      gap: var(--space-5);
      min-height: 0;
      margin-top: var(--space-4);
    }
    .process {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: var(--space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .step {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--space-1);
      padding: var(--space-4) var(--space-5);
      border-radius: 24px;
      background: rgba(255, 251, 249, 0.72);
      backdrop-filter: blur(6px);
      box-shadow: 0 16px 40px rgba(196, 138, 138, 0.16);
    }
    :host-context([data-theme='dark']) .step {
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 40%),
        rgba(120, 108, 94, 0.28);
      -webkit-backdrop-filter: blur(22px) saturate(1.15);
      backdrop-filter: blur(22px) saturate(1.15);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }
    :host-context([data-theme='dark']) .num {
      color: #f2c9c4;
    }
    :host-context([data-theme='dark']) .process-photo {
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .num {
      font-family: var(--font-display);
      font-size: 3rem;
      line-height: 1;
      font-weight: 600;
      color: color-mix(in srgb, var(--berry) 55%, transparent);
    }
    .step h3 {
      font-size: 1.45rem;
    }
    .process-photo {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      box-shadow: 0 20px 50px rgba(196, 138, 138, 0.22);
    }
    .process-photo img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .process p,
    .value p {
      color: var(--muted);
      font-size: 0.95rem;
    }
    .value p {
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .screen {
      position: relative;
      display: flex;
      overflow: hidden;
      height: calc(100svh - 77px);
      min-height: 560px;
      scroll-margin-top: 77px;
      background: #f9e9e5;
    }
    :host-context([data-theme='dark']) .screen {
      background: #252d1a;
    }
    .vk-deco {
      display: none;
    }
    :host-context([data-theme='dark']) .screen .deco:not(.vk-deco) {
      display: none;
    }
    :host-context([data-theme='dark']) .screen .vk-deco {
      display: block;
      opacity: 1;
    }
    .vk-tr {
      top: 0;
      right: 0;
      width: min(17vw, 290px);
    }
    .vk-tl {
      top: 0;
      left: 0;
      width: min(13vw, 220px);
      opacity: 0.95;
    }
    .vk-br {
      bottom: 0;
      right: 0;
      width: min(13vw, 220px);
    }
    .vk-lines-bl {
      bottom: 0;
      left: 0;
      width: min(12vw, 200px);
      transform: scaleY(-1);
    }
    .deco--val-peony {
      top: 0;
      right: 0;
      width: min(26vw, 430px);
    }
    .deco--val-lines {
      top: 30px;
      left: 0;
      height: 170px;
    }
    .val-petal {
      left: 41%;
      top: 70px;
      transform: rotate(-26deg);
    }
    .screen-inner {
      position: relative;
      z-index: 1;
      display: flex;
      min-height: 0;
      flex-direction: column;
      gap: var(--space-4);
      width: min(94%, 1640px);
      margin-inline: auto;
      padding-block: var(--space-5);
    }
    .screen-head {
      text-align: center;
    }
    .screen-head h2 {
      font-size: clamp(2.2rem, 3.8vw, 3.2rem);
      font-weight: 500;
    }
    .values {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
    }
    .value {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4) var(--space-5);
      border-radius: 22px;
      background: rgba(255, 251, 249, 0.72);
      backdrop-filter: blur(6px);
      box-shadow: 0 14px 36px rgba(196, 138, 138, 0.16);
    }
    :host-context([data-theme='dark']) .value {
      border: 1px solid rgba(255, 255, 255, 0.16);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 40%),
        rgba(120, 108, 94, 0.28);
      -webkit-backdrop-filter: blur(22px) saturate(1.15);
      backdrop-filter: blur(22px) saturate(1.15);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }
    :host-context([data-theme='dark']) .tile {
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
    }
    .value h3 {
      margin: 0 0 var(--space-1);
      font-size: 1.3rem;
    }
    .icon {
      display: inline-grid;
      flex-shrink: 0;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #f0d4d2;
      color: #b57f88;
    }
    .gallery {
      display: grid;
      flex: 1;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: minmax(0, 1fr);
      gap: var(--space-4);
      min-height: 0;
    }
    .tile {
      position: relative;
      min-height: 0;
      overflow: hidden;
      border-radius: 24px;
      background: var(--blush);
      box-shadow: 0 18px 44px rgba(196, 138, 138, 0.24);
    }
    .tile img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cta-section {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      min-height: 62svh;
      /* футер має власний відступ зверху — з'їдаємо його, щоб не було світлої смуги */
      margin-bottom: calc(var(--space-7) * -1);
      padding: var(--space-8) var(--gutter) calc(var(--space-8) + var(--space-7));
      background: #f9e9e5;
    }
    :host-context([data-theme='dark']) .cta-section {
      background: #252d1a;
    }
    .ck-deco {
      display: none;
    }
    :host-context([data-theme='dark']) .cta-section .deco:not(.ck-deco) {
      display: none;
    }
    :host-context([data-theme='dark']) .cta-section .ck-deco {
      display: block;
      opacity: 1;
    }
    .ck-tr {
      top: 0;
      right: 0;
      width: min(26vw, 440px);
    }
    .ck-bl {
      bottom: 0;
      left: 0;
      width: min(21vw, 360px);
      transform: scaleY(1);
    }
    .ck-br {
      bottom: 0;
      right: 0;
      width: min(18vw, 310px);
    }
    .deco--cta-peony {
      bottom: 0;
      left: 0;
      width: min(26vw, 440px);
      transform: scale(-1, -1);
    }
    .deco--cta-peony-r {
      top: 0;
      right: 0;
      width: min(26vw, 440px);
    }
    .cta-petal-a {
      top: 30%;
      left: 24%;
      transform: rotate(-22deg);
    }
    .cta-petal-b {
      bottom: 26%;
      right: 24%;
      transform: rotate(30deg);
    }
    .cta {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      max-width: 760px;
      text-align: center;
    }
    .cta h2 {
      font-size: clamp(2.4rem, 4vw, 3.4rem);
      font-weight: 500;
    }
    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-3);
    }
    @media (max-width: 900px) {
      .about-top,
      .process-wrap {
        height: auto;
        min-height: 0;
      }
      .about-row {
        grid-template-columns: 1fr;
        grid-template-rows: none;
        flex: none;
      }
      .about-photo {
        height: 50svh;
      }
      .about-card {
        padding: var(--space-6);
      }
      .about-head {
        padding-inline: 0;
      }
      .deco--peony-mid,
      .deco--peony-left,
      .deco--lines,
      .deco--petal {
        display: none;
      }
      .process-wrap {
        min-height: 0;
      }
      .process-row {
        grid-template-columns: 1fr;
        grid-template-rows: none;
      }
      .process-photo {
        height: 50svh;
      }
      .deco--proc-peony,
      .deco--proc-lines,
      .proc-petal {
        display: none;
      }
      .values {
        grid-template-columns: 1fr;
      }
      .screen {
        height: auto;
        min-height: 0;
      }
      .gallery {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: none;
      }
      .tile {
        aspect-ratio: 3 / 4;
      }
      .deco--val-peony,
      .deco--val-lines,
      .val-petal,
      .deco--cta-peony,
      .deco--cta-peony-r,
      .cta-petal-a,
      .cta-petal-b {
        display: none;
      }
      .cta-section {
        min-height: 0;
        padding-block: var(--space-7) calc(var(--space-7) + var(--space-7));
      }
    }
    @media (max-width: 560px) {
      .process {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {
  private readonly products = inject(ProductService);

  /** Плавна прокрутка до розділу за його id. */
  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected readonly gallery = ['freesia-blush', 'pink-kraft', 'snow-romance', 'hydrangea-blush'].map(
    (id) => this.products.getById(id)!,
  );

  protected readonly process = [
    { icon: 'leaf' as IconName, title: 'Вибір квітів', text: 'Щоранку флорист особисто відбирає квіти з нової поставки.' },
    { icon: 'sparkle' as IconName, title: 'Підготовка', text: 'Чистимо стебла, даємо квітам напитися води кілька годин.' },
    { icon: 'flower' as IconName, title: 'Збирання', text: 'Збираємо букет вручну спіральною технікою — так він тримає форму.' },
    { icon: 'truck' as IconName, title: 'Доставка', text: 'Пакуємо в акватару й доставляємо в термобоксі в будь-яку погоду.' },
  ];

  protected readonly values: { icon: IconName; title: string; text: string }[] = [
    { icon: 'leaf', title: 'Свіжість', text: 'Не продаємо квіти, яких не подарували б самі. Жодних «залежаних» стебел.' },
    { icon: 'flower', title: 'Естетика', text: 'Природні форми, спокійні кольори й баланс — замість надмірності.' },
    { icon: 'heart', title: 'Увага до деталей', text: 'Від стрічки до листівки — кожна дрібниця має значення для того, хто отримає букет.' },
  ];
}
