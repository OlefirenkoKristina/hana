import { layoutBouquet, shadeColor, VIEW_H, VIEW_W } from './bouquet-layout';

describe('layoutBouquet', () => {
  const sample = [
    { id: 'rose-pink', count: 5 },
    { id: 'peony', count: 3 },
    { id: 'eucalyptus', count: 3 },
  ];

  it('рахує голівки окремо від зелені', () => {
    const l = layoutBouquet(sample);
    expect(l.heads).toHaveLength(8);
    expect(l.greens).toHaveLength(3);
  });

  it('порожній склад не ламається', () => {
    const l = layoutBouquet([]);
    expect(l.heads).toEqual([]);
    expect(l.greens).toEqual([]);
  });

  it('детермінований: той самий склад дає ту саму розкладку', () => {
    expect(layoutBouquet(sample)).toEqual(layoutBouquet([...sample].reverse()));
  });

  it('усі голівки лежать у межах полотна й мають розумний розмір', () => {
    const l = layoutBouquet([
      { id: 'rose-red', count: 30 },
      { id: 'daisy', count: 21 },
    ]);
    for (const h of l.heads) {
      expect(Number.isFinite(h.x) && Number.isFinite(h.y)).toBe(true);
      expect(h.x).toBeGreaterThan(0);
      expect(h.x).toBeLessThan(VIEW_W);
      expect(h.y).toBeGreaterThan(0);
      expect(h.y).toBeLessThan(VIEW_H);
      expect(h.size).toBeGreaterThan(20);
      expect(h.size).toBeLessThan(200);
    }
  });

  it('великі квіти ближче до центру, ніж ромашки', () => {
    const l = layoutBouquet([
      { id: 'peony', count: 6 },
      { id: 'daisy', count: 6 },
    ]);
    const dist = (id: string) => {
      const items = l.heads.filter((h) => h.id === id);
      return items.reduce((s, h) => s + Math.hypot(h.x - l.cx, h.y - l.cy), 0) / items.length;
    };
    expect(dist('peony')).toBeLessThan(dist('daisy'));
  });

  it('радіус росте разом із кількістю квітів', () => {
    const small = layoutBouquet([{ id: 'rose-red', count: 5 }]).radius;
    const big = layoutBouquet([{ id: 'rose-red', count: 45 }]).radius;
    expect(big).toBeGreaterThan(small);
  });

  it('голівки впорядковані зверху вниз (нижні перекривають верхні)', () => {
    const ys = layoutBouquet(sample).heads.map((h) => h.y);
    expect(ys).toEqual([...ys].sort((a, b) => a - b));
  });
});

describe('shadeColor', () => {
  it('темнить і світлить колір', () => {
    expect(shadeColor('#808080', -0.5)).toBe('#404040');
    expect(shadeColor('#000000', 0.5)).toBe('#808080');
  });

  it('повертає вхід, якщо колір некоректний', () => {
    expect(shadeColor('red', 0.3)).toBe('red');
  });
});
