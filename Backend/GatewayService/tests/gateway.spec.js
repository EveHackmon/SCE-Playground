import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

import { forwardAuthRequests, ping } from '../src/controllers/gatewayController.js';

describe('gatewayController', () => {
  const AUTH_URL = 'http://auth-service:3000';
  let axiosStub;
  let req, res, next;

  beforeEach(() => {
    process.env.AUTH_SERVICE_URL = AUTH_URL;

    /* -----------------  THE IMPORTANT LINE  ----------------- */
    axiosStub = sinon.stub(axios, 'request');    //  <<<<<<<<<<<<<

    res = {
      status: sinon.stub().returnsThis(),
      json:   sinon.stub().returnsThis(),
    };
    next = sinon.stub();

    req = {
      originalUrl: '/auth/signin',
      method:      'POST',
      body:        { email: 'foo@bar.com', password: '123' },
    };
  });

  afterEach(() => sinon.restore());

  it('forwards the request and relays the response', async () => {
    axiosStub.resolves({ status: 200, data: { token: 'abc' } });

    await forwardAuthRequests(req, res, next);

    expect(
      axiosStub.calledOnceWithMatch({
        method: 'POST',
        url: `${AUTH_URL}/signin`,
        data: req.body,
      }),
    ).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ token: 'abc' })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('bubbles up a micro-service error (with response)', async () => {
    const microErr = {
      response: { status: 400, data: { message: 'Bad creds' } },
    };
    axiosStub.rejects(microErr);

    await forwardAuthRequests(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith(microErr.response.data)).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('passes network / unknown errors to next()', async () => {
    const netErr = new Error('ECONNREFUSED');
    axiosStub.rejects(netErr);

    await forwardAuthRequests(req, res, next);

    expect(next.calledOnceWith(netErr)).to.be.true;
  });

  it('ping() returns 200 pong', async () => {
    await ping({}, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'pong' })).to.be.true;
    expect(next.notCalled).to.be.true;
  });
});
