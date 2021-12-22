import store from '../store';

import userAPI from './user-api';
import chatsAPI from './chat-api';

export type MessageProps = {
  chat_id: number,
  time: string,
  type: string,
  user_id: number,
  username?: string;
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
};

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  users: UserData[];
  unread_count: number;
  last_message?: MessageProps;
  messages: MessageProps[];
}

class ChatInstance implements ChatData {
  socket?: WebSocket;

  userId?: number;

  avatar!: string;

  id!: number;

  last_message!: MessageProps;

  messages: MessageProps[] = [];

  title!: string;

  users!: UserData[];

  unread_count!: number;

  active?: boolean;

  constructor(data: ChatData, userId: number) {
    Object.assign(this, data);
    this.userId = userId;
    this.init();
  }

  async init(): Promise<void> {
    if (this.id) {
      await this.getChatUsers();
      chatsAPI.getUserWssToken(this.id).then(({ response }) => {
        const { token } = JSON.parse(response);
        if (this.userId) {
          this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.id}/${token}`);
          this.socket?.addEventListener('open', () => {
            this.#ping();
            this.getMessages(0);
          });

          this.socket?.addEventListener('close', (event) => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });

          this.socket?.addEventListener('message', async (event) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              await Promise.all(data.map(async (message) => { await this.processMessage(message); }));
            } else {
              await this.processMessage(data, true);
            }
          });

          this.socket?.addEventListener('error', (event) => {
            if (event instanceof Error) {
              console.log('Ошибка', event.message);
            }
          });
        }
      });
    }
  }

  async getChatUsers(): Promise<void> {
    const { response } = await chatsAPI.getUsers(this.id);
    this.users = JSON.parse(response);
  }

  async addChatUser(userId: number): Promise<void> {
    await chatsAPI.addUsers({ chatId: this.id, users: [userId] });
    await this.getChatUsers();
    this.update();
  }

  async delChatUser(userId: number): Promise<void> {
    console.log('deleted', userId);
    await chatsAPI.delUsers({ chatId: this.id, users: [userId] });
    await this.getChatUsers();
    this.update();
  }

  processMessage = async (message: MessageProps, isSingle?: boolean): Promise<void> => {
    switch (message.type) {
      case 'pong':
        this.#ping();
        break;
      case 'message': {
        this.messages = isSingle ? [message, ...this.messages] : [...this.messages, message];
        await this.getUsernames();
        [this.last_message] = this.messages;

        this.update();
        break;
      }
      default:
        console.log(message);
    }
  };

  setActive = (): void => {
    store.state.chats?.forEach((chat) => chat.close());
    this.active = true;
    this.update();
  };

  close(): void {
    this.active = false;
  }

  async getUsernames(): Promise<void> {
    const users = new Set(this.messages.map(({ user_id }) => user_id));
    await Promise.all([...users].map((id) => userAPI.getById(id)
      .then(({ response }) => {
        const user = JSON.parse(response);
        this.messages
          .filter(({ user_id }) => user_id === id)
          .forEach((message) => {
            const updated = message;
            updated.username = user.display_name;
          });
      })));
  }

  update(): void {
    store.dispatch({
      type: 'UPDATE_CHAT',
      payload: this,
    });
  }

  #ping(): void {
    setTimeout(() => {
      this.socket?.send(JSON.stringify({
        type: 'ping',
      }));
    }, 40000);
  }

  getMessages(page = 0): void {
    this.socket?.send(JSON.stringify({
      type: 'get old',
      content: page,
    }));
  }

  send(type: string, content: string): void {
    this.socket?.send(JSON.stringify({
      content,
      type,
    }));
    this.update();
  }
}

export default ChatInstance;
