import { expect } from 'chai';
import sinon from 'sinon';

import HTTPTransport from './HTTPTransport';

const xhr = new HTTPTransport();

describe('XHR module', function tests() {
  this.timeout(5000);
  const server = sinon.fakeServer.create();

  const data = [{ id: 12, comment: 'Hey there' }];

  server.respondWith('GET', '/fake/get/', [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify(data),
  ]);

  server.autoRespond = true;

  it('should get', async () => {
    const response = await xhr.get('/fake/get/');
    expect(response.status).to.be.equal(200);
  });

  it('should get right data', async () => {
    const { response } = await xhr.get('/fake/get/');
    expect(JSON.parse(response)).to.be.deep.equal(data);
  });

  it('should post', async () => {
    const postData = { foo: 'bar' };
    server.respondWith(
      'POST',
      '/fake/post/',
      (request) => {
        expect(JSON.parse(request.requestBody)).to.be.deep.equal(postData);
        request.respond(200, { 'Content-Type': 'application/json' }, '{"ok": true}');
      },
    );

    const { response } = await xhr.post('/fake/post/', postData);
    expect(JSON.parse(response)).to.be.deep.equal({ ok: true });
  });
});
