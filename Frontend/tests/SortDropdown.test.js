import {
  sortById,
  sortPriceHighToLow,
  sortPriceLowToHigh,
  sortLeadsHighToLow,
  sortLeadsLowToHigh,
} from '../src/utils/sortUtils';

describe('sortUtils', () => {
  const products = [
    { id: 3, price: 100.0, lead_count: 1 },
    { id: 1, price: 300.0, lead_count: 5 },
    { id: 2, price: 200.0, lead_count: 0 },
  ];

  test('sortById', () => {
    const result = sortById(products);
    expect(result.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  test('sortPriceHighToLow', () => {
    const result = sortPriceHighToLow(products);
    expect(result.map((p) => p.price)).toEqual([300.0, 200.0, 100.0]);
  });

  test('sortPriceLowToHigh', () => {
    const result = sortPriceLowToHigh(products);
    expect(result.map((p) => p.price)).toEqual([100.0, 200.0, 300.0]);
  });

  test('sortLeadsHighToLow', () => {
    const result = sortLeadsHighToLow(products);
    expect(result.map((p) => p.lead_count)).toEqual([5, 1, 0]);
  });

  test('sortLeadsLowToHigh', () => {
    const result = sortLeadsLowToHigh(products);
    expect(result.map((p) => p.lead_count)).toEqual([0, 1, 5]);
  });
});
