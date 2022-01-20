import Creact from '../../core/Creact';

import router from '../../core/router';
import store from '../../core/store';

import {
  authAPI,
  ChatInstance,
  chatsAPI,
} from '../../core/api';

import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

import type { ChatData } from '../../core/api';

import * as styles from './MessengerPage.module.pcss';

export default class MessengerPage extends Creact.Component<EmptyObject, { currentChat?: ChatData }> {
  async componentDidMount(): Promise<void> {
    try {
      await authAPI.user().then((user) => {
        if (!user.id) {
          router.go('/');
        } else {
          store.dispatch({
            type: 'STORE_USER',
            payload: user,
          });
        }
      });
      await chatsAPI.list().then((chats) => {
        const { user } = store.state;
        if (user && user?.id) {
          const { id: userId } = user;
          const payload = chats.map((chatData: ChatData) => new ChatInstance(chatData, userId!));
          store.dispatch({
            type: 'CHATS_LIST',
            payload,
          });
        }
      });
    } catch (err) {
      console.error(err);
      router.go('/');
    }
  }

  render(): JSX.Element {
    return (
      <section className={styles.root}>
        <Sidebar />
        <Chat />
      </section>
    );
  }
}
