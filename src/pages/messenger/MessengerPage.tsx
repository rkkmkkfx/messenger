import Creact from '../../core/Creact';

import store from '../../core/store';
import router from '../../core/router';

import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import type { SidebarProps } from '../../components/Sidebar';

import * as styles from './MessengerPage.module.pcss';

export type ChatsPageProps = {
  sidebar: SidebarProps;
  profile: UserData;
};

export default class MessengerPage extends Creact.Component<ChatsPageProps> {
  render(): JSX.Element {
    console.log(store.state.user);
    if (!store.state.user || !('login' in store.state.user)) {
      router.go('/');
    }
    return (
      <section className={styles.root}>
        <Sidebar />
        <Chat />
      </section>
    );
  }
}
