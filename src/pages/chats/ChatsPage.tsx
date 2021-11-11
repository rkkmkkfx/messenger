import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

import type { SidebarProps } from '../../components/Sidebar';

import * as styles from './ChatsPage.module.pcss';

export type ChatsPageProps = {
  sidebar: SidebarProps;
  profile: UserData;
};

export default class ChatsPage extends Component<ChatsPageProps> {
  render(): JSX.Element {
    return (
      <section className={styles.root}>
        <Sidebar
          profile={this.props.profile}
          chats={this.props.sidebar.chats}
          type={this.props.sidebar.type ?? 'chats'}
        />
        <Chat />
      </section>
    );
  }
}
