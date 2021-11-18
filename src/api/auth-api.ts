import HTTPTransport, { BaseAPI } from '../core/http';

const chatAPIInstance = new HTTPTransport('api/v2/auth');

export default class AuthAPI extends BaseAPI {
  create() {
    return chatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}
