export function searchProducts(allProducts, searchTerm) {
  if (!searchTerm || typeof searchTerm !== 'string') return [];

  const lowerTerm = searchTerm.toLowerCase();

  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerTerm) ||
      product.description.toLowerCase().includes(lowerTerm)
  );
}
