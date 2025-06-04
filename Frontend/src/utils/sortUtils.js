export function sortById(products) {
  return [...products].sort((a, b) => a.id - b.id);
}

export function sortPriceHighToLow(products) {
  return [...products].sort((a, b) => b.price - a.price);
}

export function sortPriceLowToHigh(products) {
  return [...products].sort((a, b) => a.price - b.price);
}

export function sortLeadsHighToLow(products) {
  return [...products].sort((a, b) => b.lead_count - a.lead_count);
}

export function sortLeadsLowToHigh(products) {
  return [...products].sort((a, b) => a.lead_count - b.lead_count);
}
