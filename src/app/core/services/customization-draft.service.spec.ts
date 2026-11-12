import { TestBed } from '@angular/core/testing';
import { CustomizationDraftService } from './customization-draft.service';

describe('CustomizationDraftService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  function create() {
    return TestBed.inject(CustomizationDraftService);
  }

  it('спочатку порожній', () => {
    expect(create().draft()).toBeNull();
  });

  it('start запам’ятовує букет, а повторний start того ж букета не скидає вибір', () => {
    const s = create();
    s.start('classic-red');
    s.patch('classic-red', { packagingId: 'kraft', cardText: 'Привіт' });
    s.start('classic-red');
    expect(s.draft()).toEqual({ productId: 'classic-red', packagingId: 'kraft', cardText: 'Привіт' });
  });

  it('інший букет скидає попередній вибір', () => {
    const s = create();
    s.start('classic-red');
    s.patch('classic-red', { ribbonId: 'pink' });
    s.start('classic-pink');
    expect(s.draft()).toEqual({ productId: 'classic-pink' });
  });

  it('null (без пакування) відрізняється від «не обрано»', () => {
    const s = create();
    s.start('x');
    s.patch('x', { packagingId: null });
    expect(s.draft()?.packagingId).toBeNull();
  });

  it('зберігається в localStorage й відновлюється після перезавантаження', async () => {
    const s = create();
    s.start('classic-red');
    s.patch('classic-red', { size: 'L', wantsCard: true });
    TestBed.tick();
    expect(JSON.parse(localStorage.getItem('hana.customize')!)).toMatchObject({ productId: 'classic-red', size: 'L' });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    expect(TestBed.inject(CustomizationDraftService).draft()).toMatchObject({
      productId: 'classic-red',
      size: 'L',
      wantsCard: true,
    });
  });

  it('clear видаляє букет зі сховища', () => {
    const s = create();
    s.start('classic-red');
    TestBed.tick();
    s.clear();
    TestBed.tick();
    expect(s.draft()).toBeNull();
    expect(localStorage.getItem('hana.customize')).toBe('null');
  });
});
