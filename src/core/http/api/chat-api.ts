import HTTPTransport from '../HTTPTransport';

const chatAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

console.log(chatAPIInstance);

class ChatAPI {
  newChat(data: Record<'title', string>) {
    return chatAPIInstance.post('/', data);
  }

  addUsers(data: { users: number[], chatId: number }) {
    return chatAPIInstance.put('/users', data);
  }

  list() {
    return chatAPIInstance.get('/');
  }

  deleteChat(chatId: number) {
    return chatAPIInstance.del('/', { chatId });
  }

  getUserWssToken(chatId: number) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}

const chatsAPI = new ChatAPI();

console.log(chatsAPI);

export default chatsAPI;
