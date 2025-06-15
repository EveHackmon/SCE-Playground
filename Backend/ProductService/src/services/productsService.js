// products-service/src/services/productsService.js

import { Products } from '../data-access/productsModel.js';
import { ProductsImages } from '../data-access/productsImagesModel.js';
import axios from 'axios';

export const productsService = {
  async createProduct(productData) {
    try {
      const {
        name,
        category,
        description,
        price,
        datasheet_url,
        image_url,
        extra_images = [],
      } = productData;

      console.log('from service', productData);

      const newProduct = await Products.create({
        name: name || null,
        category: category || null,
        description: description || null,
        price: price || null,
        datasheet_url: datasheet_url || null,
        image_url: image_url || null,
      });

      for (const url of extra_images) {
        await ProductsImages.create({
          product_id: newProduct.id,
          image_url: url,
        });
      }

      return newProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      throw new Error('Failed to create product');
    }
  },

  async updateProductById(productId, updateData) {
    try {
      const { extra_images = [], ...productFields } = updateData;

      const [updatedRows] = await Products.update(productFields, {
        where: { id: productId },
      });

      if (updatedRows === 0) {
        throw new Error('Product not found or no changes made!');
      }

      await ProductsImages.destroy({
        where: { product_id: productId },
      });
      console.log(updateData);
      for (const url of extra_images) {
        await ProductsImages.create({
          product_id: productId,
          image_url: url,
        });
      }

      const updatedProduct = await Products.findByPk(productId);
      const additional_images = await ProductsImages.findAll({
        where: { product_id: productId },
      });
      return {
        ...updatedProduct.get({ plain: true }),
        extra_images: additional_images,
      };
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('Failed to update product');
    }
  },

  async deleteProductById(productId) {
    try {
      const deletedRows = await Products.destroy({
        where: { id: productId },
      });
      if (deletedRows === 0) {
        throw new Error('Product not found');
      }
      return { message: 'Product deleted successfully' };
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error('Failed to delete product');
    }
  },

  async fetchProductById(productId) {
    try {
      const product = await Products.findByPk(productId);
      const additional_images = await ProductsImages.findAll({
        where: {
          product_id: productId,
        },
      });
      const productPlain = product.get({ plain: true });

      const mergedProduct = {
        ...productPlain,
        extra_images: additional_images,
      };
      if (!product) {
        throw new Error('Product not found');
      }
      return mergedProduct;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      throw new Error('Failed to fetch product');
    }
  },

  async fetchAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw new Error('Failed to fetch products');
    }
  },

  async fetchAllLeads() {
    try {
      const leads = await axios.get(
        'https://sce-playground-leads-server.onrender.com/getall'
      );
      return leads.data;
    } catch (err) {
      console.error('Error fetching leads from Lead Service:', err.message);
      throw new Error(`Failed to fetch leads: ${err.message}`);
    }
  },
};
