// products-service/src/services/productsService.js

import { Products } from '../data-access/productsModel.js';

export const productsService = {
  async fetchAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }, 
  async fetchProduct(input) {
    try {
      const products = await Products.findOne(input);
      return products;
    } catch (err) {
      console.error('Error fetching the product:', err);
      throw new Error('Failed to fetch the product');
    }
  }
};
