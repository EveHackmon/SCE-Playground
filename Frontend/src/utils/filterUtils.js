export function filterProducts(displayedProducts, filters) {
  const { category, minPrice, maxPrice, minLeadCount, maxLeadCount } = filters;

  let filtered = [...displayedProducts];

  if (category.length > 0) {
    filtered = filtered.filter((product) =>
      category.includes(product.category)
    );
  }

  filtered = filtered.filter(
    (product) =>
      Number(product.price) >= Number(minPrice) &&
      Number(product.price) <= Number(maxPrice)
  );

  filtered = filtered.filter(
    (product) =>
      product.lead_count >= Number(minLeadCount) &&
      product.lead_count <= Number(maxLeadCount)
  );

  return filtered;
}
