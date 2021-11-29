import Creact from '../../core/Creact';

import store from '../../core/store';
import chatsAPI from '../../core/http/api/chat-api';

import Header from './Header';
import Controls from './Controls';
import Message from './Message';
import type { MessageProps } from './Message';

import * as styles from './Chat.module.pcss';

const chatIcon = new URL('./assets/chat.svg', import.meta.url);

export type ChatData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: MessageProps;
  messages: MessageProps[];
};

export default class Chat extends Creact.Component<ChatData> {
  deleteChat(id?: number): void {
    if (id) {
      chatsAPI.deleteChat(id).then(({ response, status, statusText }) => {
        const res = JSON.parse(response);
        if (status !== 200) {
          throw res.reason ?? statusText;
        }
        const { id: deletedId } = res;
        store.dispatch({
          type: 'CHATS_LIST',
          payload: store.state.chats?.list?.filter(({ id: chatId }) => chatId === deletedId),
        });
      });
    }
  }

  render(): JSX.Element {
    const { avatar = '' } = store.state.user ?? {};
    const { title } = this.props;
    const chat = this.props;
    console.log(chat);
    return chat.id ? (
      <section className={styles.root}>
        <Header id={chat.id} avatar={avatar} title={title!} deleteChat={this.deleteChat} />
        <main className={styles.messages}>
          {chat.messages && chat.messages.map((message: MessageProps) => <Message {...message} />)}
        </main>
        <Controls />
      </section>
    ) : (
      <div className={styles.placeholder}>
        <img className={styles.img} src={chatIcon} />
      </div>
    );
  }
}
