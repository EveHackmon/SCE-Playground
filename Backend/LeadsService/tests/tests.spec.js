import chai from 'chai';
import request from 'supertest';
import { app, startTestServer, stopTestServer } from './testServer.js';

const { expect } = chai;
let server;

describe('Leads Service Tests', () => {
  before(async function () {
    this.timeout(10000);
    server = await startTestServer(); 
  });

  after(async function () {
    await stopTestServer();

   
    setTimeout(() => process.exit(0), 200);
  });
  it('should return all leads', async () => {
    const res = await request(app).get('/leads/getall');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    console.log('📋 All leads returned from the server:', res.body);

  });
});