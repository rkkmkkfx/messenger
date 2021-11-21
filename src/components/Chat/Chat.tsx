import Creact from '../../core/Creact';

import store from '../../core/store';

import Header from './Header';
import Controls from './Controls';
import Message from './Message';
import type { MessageProps } from './Message';

import * as styles from './Chat.module.pcss';

export type CurrentChat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  messages: MessageProps[];
};

export default class Chat extends Creact.Component<EmptyObject, CurrentChat> {
  constructor(props: EmptyObject) {
    super(props);
    this.state = {
      ...store.state.chat!,
    };
  }

  render(): JSX.Element {
    const { messages } = store.state;
    const { avatar = '' } = store.state.user ?? {};
    const { title } = this.state;
    return (
      <section className={styles.root}>
        <Header avatar={avatar} title={title} />
        <main className={styles.messages}>
          {messages && messages.map((message: MessageProps) => <Message {...message} />)}
        </main>
        <Controls />
      </section>
    );
  }
}
