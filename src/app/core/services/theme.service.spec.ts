import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    TestBed.resetTestingModule();
  });

  it('бере збережену тему', () => {
    localStorage.setItem('hana.theme', JSON.stringify('dark'));
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('перемикає тему, оновлює <html> і зберігає вибір', () => {
    localStorage.setItem('hana.theme', JSON.stringify('light'));
    const service = TestBed.inject(ThemeService);
    service.toggle();
    TestBed.tick();
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(JSON.parse(localStorage.getItem('hana.theme')!)).toBe('dark');
  });
});
