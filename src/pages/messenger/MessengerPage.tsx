import Creact from '../../core/Creact';

import store from '../../core/store';

import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';
import type { ChatData } from '../../components/Chat/Chat';

import * as styles from './MessengerPage.module.pcss';

export default class MessengerPage extends Creact.Component<EmptyObject, { currentChat?: ChatData }> {
  componentDidMount(): void {
    store.subscribe((state) => {
      if (state.chats) {
        const { activeId } = state.chats;
        const currentChat = state.chats.list.find(({ id }: ChatData) => id === activeId);
        if (state.chats?.list && currentChat) {
          this.setState({ currentChat });
        } else {
          this.setState({ currentChat: undefined });
        }
      }
    });
  }

  render(): JSX.Element {
    const chat = this.state.currentChat;
    return (
      <section className={styles.root}>
        <Sidebar />
        <Chat {...chat!} />
      </section>
    );
  }
}
