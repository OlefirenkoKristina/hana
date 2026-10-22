import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('створюється', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('показує логотип і основну навігацію', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.logo')?.textContent).toContain('HANA');
    const links = [...el.querySelectorAll('#main-nav a')].map((a) => a.textContent?.trim());
    expect(links).toEqual(['Головна', 'Каталог', 'Конструктор букета', 'Про нас', 'Контакти']);
  });
});
