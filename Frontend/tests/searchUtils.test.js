import { searchProducts } from '../src/utils/searchUtils';

const products = [
  { name: 'Cloud Server', description: 'Fast and reliable server' },
  { name: 'PenTest Kit', description: 'Tools for penetration testing' },
  { name: 'Notebook', description: 'Simple writing notebook' },
  { name: 'UX Course', description: 'User experience design' },
];

describe('searchProducts', () => {
  test('finds product by name', () => {
    const results = searchProducts(products, 'server');
    expect(results.map((p) => p.name)).toEqual(['Cloud Server']);
  });

  test('finds product by description', () => {
    const results = searchProducts(products, 'design');
    expect(results.map((p) => p.name)).toEqual(['UX Course']);
  });

  test('is case insensitive', () => {
    const results = searchProducts(products, 'NOTEBOOK');
    expect(results.map((p) => p.name)).toEqual(['Notebook']);
  });

  test('returns multiple matches', () => {
    const results = searchProducts(products, 'test');
    expect(results.map((p) => p.name)).toEqual(['PenTest Kit']);
  });

  test('returns empty array when no match', () => {
    const results = searchProducts(products, 'banana');
    expect(results).toEqual([]);
  });

  test('handles empty search term', () => {
    const results = searchProducts(products, '');
    expect(results).toEqual([]);
  });
});
