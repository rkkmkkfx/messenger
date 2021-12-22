import HTTPTransport from './HTTPTransport';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class ChatAPI {
  newChat(data: Record<'title', string>) {
    return chatAPIInstance.post('/', data);
  }

  addUsers(data: { users: number[], chatId: number }) {
    return chatAPIInstance.put('/users', data);
  }

  getUsers(id: number) {
    return chatAPIInstance.get(`/${id}/users`);
  }

  delUsers(data: { users: number[], chatId: number }) {
    return chatAPIInstance.del('/users', data);
  }

  list() {
    return chatAPIInstance.get('/?limit=20')
      .then(({ response }) => JSON.parse(response));
  }

  deleteChat(chatId: number) {
    return chatAPIInstance.del('/', { chatId });
  }

  getUserWssToken(chatId: number) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}

const chatsAPI = new ChatAPI();

export default chatsAPI;
