import HTTPTransport, { BaseAPI } from '../core/http';

const chatAPIInstance = new HTTPTransport('api/v1/chats');

export default class ChatAPI extends BaseAPI {
  create() {
    return chatAPIInstance.post('/', { title: 'string' });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}
