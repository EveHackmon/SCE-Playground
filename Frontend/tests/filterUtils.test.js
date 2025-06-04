import { filterProducts } from '../src/utils/filterUtils';

const sampleProducts = [
  { name: 'A', category: 'Dev Tools', price: 100, lead_count: 3 },
  { name: 'B', category: 'Security', price: 200, lead_count: 7 },
  { name: 'C', category: 'Dev Tools', price: 300, lead_count: 0 },
  { name: 'D', category: 'Hardware', price: 150, lead_count: 10 },
];

describe('filterProducts', () => {
  test('filters by price range', () => {
    const filters = {
      category: [],
      minPrice: 100,
      maxPrice: 200,
      minLeadCount: 0,
      maxLeadCount: 100,
    };

    const result = filterProducts(sampleProducts, filters);
    expect(result.map((p) => p.name)).toEqual(['A', 'B', 'D']);
  });

  test('filters by lead count range', () => {
    const filters = {
      category: [],
      minPrice: 0,
      maxPrice: 1000,
      minLeadCount: 5,
      maxLeadCount: 10,
    };

    const result = filterProducts(sampleProducts, filters);
    expect(result.map((p) => p.name)).toEqual(['B', 'D']);
  });

  test('filters by category + price + lead_count', () => {
    const filters = {
      category: ['Dev Tools'],
      minPrice: 50,
      maxPrice: 150,
      minLeadCount: 1,
      maxLeadCount: 5,
    };

    const result = filterProducts(sampleProducts, filters);
    expect(result.map((p) => p.name)).toEqual(['A']);
  });

  test('no filters returns all', () => {
    const filters = {
      category: [],
      minPrice: 0,
      maxPrice: 1000,
      minLeadCount: 0,
      maxLeadCount: 100,
    };

    const result = filterProducts(sampleProducts, filters);
    expect(result.map((p) => p.name)).toEqual(['A', 'B', 'C', 'D']);
  });

  test('no match returns empty array', () => {
    const filters = {
      category: ['Design'],
      minPrice: 0,
      maxPrice: 50,
      minLeadCount: 20,
      maxLeadCount: 30,
    };

    const result = filterProducts(sampleProducts, filters);
    expect(result).toEqual([]);
  });
});
