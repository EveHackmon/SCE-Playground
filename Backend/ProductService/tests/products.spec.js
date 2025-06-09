// products-service/tests/product.test.js
/* eslint-env mocha */
//
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testProducts.js';

const { expect } = chai;
let server;

describe('Full Product Lifecycle Test', () => {
  let createdProductId;

  before(async function () {
    this.timeout(100000);
    server = await startTestServer();
  });

  after(async () => {
    server.close();
  });

  it('should create, read, update, and delete a product', async () => {
    // === 1. Create ===
    const newProduct = {
      name: `Test Product ${Date.now()}`,
      category: 'Test Category',
      description: 'A product created for full lifecycle test',
      price: '49.99',
      datasheet_url: 'https://example.com/datasheet.pdf',
      image_url: 'https://example.com/main.jpg',
      extra_images: [
        'https://example.com/extra1.jpg',
        'https://example.com/extra2.jpg',
      ],
    };

    const createRes = await request(app)
      .post('/create-product')
      .send(newProduct)
      .expect(201);

    expect(createRes.body).to.have.property('id');
    createdProductId = createRes.body.id;

    // === 2. Read ===
    const readRes = await request(app)
      .get(`/read-product/${createdProductId}`)
      .expect(200);

    expect(readRes.body).to.have.property('name', newProduct.name);
    expect(readRes.body).to.have.property('extra_images');
    expect(readRes.body.extra_images).to.be.an('array');

    // === 3. Update ===
    const updateData = {
      name: 'Updated Product Name',
      price: '99.99',
      extra_images: ['https://example.com/updated1.jpg'],
    };

    const updateRes = await request(app)
      .put(`/update-product/${createdProductId}`)
      .send(updateData)
      .expect(200);

    expect(updateRes.body).to.have.property('name', updateData.name);
    expect(updateRes.body).to.have.property('price', updateData.price);
    expect(updateRes.body.extra_images[0].image_url).to.equal(
      updateData.extra_images[0]
    );

    // === 4. Delete ===
    const deleteRes = await request(app)
      .delete(`/delete-product/${createdProductId}`)
      .expect(200);

    expect(deleteRes.body).to.have.property(
      'message',
      'Product deleted successfully'
    );
  });
  it('should return a list of all products', async () => {
    const res = await request(app).get('/read-all-products').expect(200);

    expect(res.body).to.be.an('array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('name');
    }
  });
  it('should fetch all leads from external service', async () => {
    const res = await request(app).get('/read-all-leads').expect(200);

    expect(res.body).to.be.an('array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.property('full_name');
      expect(res.body[0]).to.have.property('email');
    }
  });
});
