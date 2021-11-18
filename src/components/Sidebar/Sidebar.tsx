import Creact from '../../core/Creact';

import store from '../../core/store';

import Input from '../Input';
import ChatPreview from './ChatPreview';
import Profile from './Profile';

import type { ChatPreviewProps } from './ChatPreview';

import * as styles from './Sidebar.module.pcss';

export type SidebarState = {
  profileActive: boolean;
  chats?: ChatPreviewProps[];
  user?: UserData;
};

export default class Sidebar extends Creact.Component<EmptyObject, SidebarState> {
  constructor(props: EmptyObject) {
    super(props);
    store.subscribe((...rest) => {
      console.log(rest);
    });
    this.state = {
      profileActive: false,
      chats: store.state.chats,
      user: store.state.user,
    };
  }

  render(): JSX.Element {
    console.log(this.state);
    const { profileActive, user, chats } = this.state;
    return (
      <aside className={styles.root}>
        {!!user && (
          <div className={styles.user}>
            <a onClick={() => this.setState({ profileActive: !profileActive })} className={styles.avatar}>
              <img src={user.avatar ?? ''} alt="" />
            </a>
          </div>
        )}
        <Input name="search" label="Search" type="text" autocomplete="search" />
        {profileActive ? (
          <Profile {...user!} />
        ) : (
          <>
            {chats && (chats.map((chat: ChatPreviewProps) => <ChatPreview {...chat} />) ?? <></>)}
          </>
        )}
      </aside>
    );
  }
}
