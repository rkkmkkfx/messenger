import store from '../../store';

class WssConnection {
  socket?: WebSocket;

  userId?: number;

  #timeout?: NodeJS.Timeout;

  connect(userId: number, chatId: number, token: string) {
    this.userId = userId;
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${chatId}/${token}`);
    this.init();
  }

  init() {
    this.socket?.addEventListener('open', () => {
      this.#ping();
      this.getMessages();
    });

    this.socket?.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket?.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === 'pong') {
        this.#ping();
      }
      if (Array.isArray(message)) {
        store.dispatch({
          type: 'STORE_MESSAGES',
          payload: message,
        });
      }
    });

    this.socket?.addEventListener('error', (event) => {
      if (event instanceof Error) {
        console.log('Ошибка', event.message);
      }
    });
  }

  #ping() {
    this.#timeout = setTimeout(() => {
      this.socket?.send(JSON.stringify({
        type: 'ping',
      }));
    }, 40000);
  }

  getMessages(page = 0) {
    this.socket?.send(JSON.stringify({
      type: 'get old',
      content: page,
    }));
  }

  send(type: string, content: string) {
    this.socket?.send(JSON.stringify({
      content,
      type,
    }));
  }
}

const socket = new WssConnection();

export default socket;
