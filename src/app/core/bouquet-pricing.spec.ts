import { BouquetConfig, priceBouquet } from './bouquet-pricing';
import { ASSEMBLY_FEE } from './data/builder-options';

describe('priceBouquet', () => {
  const base: BouquetConfig = { flowers: {}, wrapId: 'cream', ribbonId: 'rose', extras: [] };

  it('порожній букет коштує 0', () => {
    const price = priceBouquet(base);
    expect(price.total).toBe(0);
    expect(price.stemCount).toBe(0);
  });

  it('рахує квіти + пакування + стрічку + роботу флориста', () => {
    // 5 рожевих троянд по 85 + 3 півонії по 160, кремове пакування 120, пудрова стрічка 40
    const price = priceBouquet({ ...base, flowers: { 'rose-pink': 5, peony: 3 } });
    expect(price.flowers).toBe(5 * 85 + 3 * 160);
    expect(price.stemCount).toBe(8);
    expect(price.total).toBe(905 + 120 + 40 + ASSEMBLY_FEE);
  });

  it('додає вартість доповнень', () => {
    const price = priceBouquet({ ...base, flowers: { daisy: 5 }, extras: ['card', 'sweets'] });
    expect(price.extras).toBe(50 + 260);
  });

  it('стрічка «без стрічки» безкоштовна', () => {
    const price = priceBouquet({ ...base, flowers: { daisy: 3 }, ribbonId: 'none' });
    expect(price.ribbon).toBe(0);
  });
});
