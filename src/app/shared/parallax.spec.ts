import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Parallax, parallaxOffset } from './parallax';

@Component({
  imports: [Parallax],
  template: `<div id="el" appParallax><img alt="" /></div>`,
})
class Host {}

describe('parallaxOffset', () => {
  it('дорівнює нулю, коли рамка по центру екрана', () => {
    expect(parallaxOffset(300, 400, 1000)).toBeCloseTo(0);
  });

  it('при прокрутці вниз (рамка їде вгору) зсув зменшується, при прокрутці вгору — зростає', () => {
    const low = parallaxOffset(700, 400, 1000);
    const high = parallaxOffset(100, 400, 1000);
    expect(low).toBeGreaterThan(0);
    expect(high).toBeLessThan(0);
    expect(parallaxOffset(700, 400, 1000)).toBe(low);
  });

  it('не виходить за межі запасу зображення', () => {
    expect(Math.abs(parallaxOffset(5000, 400, 1000))).toBeLessThanOrEqual(400 * 0.035 * 1.2 + 0.001);
  });
});

describe('Parallax', () => {
  afterEach(() => vi.unstubAllGlobals());

  const create = async () => {
    const fixture = TestBed.createComponent(Host);
    const el: HTMLElement = fixture.nativeElement.querySelector('#el');
    el.getBoundingClientRect = () => ({ top: 600, bottom: 1000, height: 400 }) as DOMRect;
    await fixture.whenStable();
    return el;
  };

  it('одразу виставляє початковий зсув без «стрибка» і позначає елемент', async () => {
    const el = await create();
    expect(el.hasAttribute('data-parallax')).toBe(true);
    expect(el.style.getPropertyValue('--py')).not.toBe('');
  });

});
