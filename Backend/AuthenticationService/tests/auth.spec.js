// authentication-service/tests/auth.test.js
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, startTestServer } from './testServer.js';

const { expect } = chai;
chai.use(chaiHttp);
let server = null;

describe('Authentication Service Tests', () => {
  const createdUserEmail = 'test@example.com';

  before(async function() {
    this.timeout(10000); // 10 seconds
    server = await startTestServer();
    console.log("test server is running");
    
  });

  after(async () => {
    // Use chai.request.execute(app) with .delete()
    await chai.request.execute(app)
      .delete('/user')
      .query({ email: createdUserEmail });

    server.close();
  });

  it('should sign up a new user successfully', (done) => {
    chai.request.execute(app)
      .post('/signup')
      .send({
        email: createdUserEmail,
        password: '123456',
        firstName: 'Test',
        lastName: 'User'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('email').equal(createdUserEmail);
        expect(res.body).to.have.property('firstName').equal('Test');
        expect(res.body).to.have.property('lastName').equal('User');
        done();
      });
  });

  it('should not sign up a user with an existing email', (done) => {
    chai.request.execute(app)
      .post('/signup')
      .send({
        email: createdUserEmail,
        password: 'anotherPass',
        firstName: 'Someone',
        lastName: 'Else'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').contains('already in use');
        done();
      });
  });

  it('should sign in an existing user', (done) => {
    chai.request.execute(app)
      .post('/signin')
      .send({
        email: createdUserEmail,
        password: '123456'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should reject sign in with wrong password', (done) => {
    chai.request.execute(app)
      .post('/signin')
      .send({
        email: createdUserEmail,
        password: 'WRONGPASS'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').equal('Invalid credentials');
        done();
      });
  });

  it('should validate a valid token', (done) => {
    // First sign in to get a token
    chai.request.execute(app)
      .post('/signin')
      .send({
        email: createdUserEmail,
        password: '123456'
      })
      .end((err, res) => {
        const { token } = res.body;
        expect(token).to.exist;

        chai.request.execute(app)
          .post('/validate-token')
          .send({ token })
          .end((innerErr, innerRes) => {
            expect(innerRes).to.have.status(200);
            expect(innerRes.body).to.have.property('isValid').equal(true);
            done();
          });
      });
  });
});