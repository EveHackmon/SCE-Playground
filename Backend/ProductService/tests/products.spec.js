// products-service/tests/product.test.js
/* eslint-env mocha */
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, startTestServer } from './testProducts.js';

const { expect } = chai;
chai.use(chaiHttp);
let server = null;

describe('Product Service Tests', () => {
  before(async function () {
    this.timeout(100000);
    server = await startTestServer();
    console.log('Product tests is running');
  });

  after(async () => {
    server.close();
  });

  it('should update existing product', (done) => {
    chai.request
      .execute(app)
      .put(`/update-product/${69}`)
      .send({ name: 'Updated Name', price: 777 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Updated Name');
        expect(parseFloat(res.body.price)).to.equal(777);
        done();
      });
  });

  it('should read a product by ID', (done) => {
    chai.request
      .execute(app)
      .get(`/read-product/${69}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').equal(69);
        expect(res.body).to.have.property('name').equal('Updated Name');
        done();
      });
  });

  it('should get all products', (done) => {
    chai.request
      .execute(app)
      .get('/read-all-products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get all leads', (done) => {
    chai.request
      .execute(app)
      .get('/read-all-leads')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should delete the created product', (done) => {
    chai.request
      .execute(app)
      .delete(`/delete-product/${69}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Product deleted successfully');
        done();
      });
  });
});
