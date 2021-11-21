import Creact from '../../core/Creact';

import router from '../../core/router';
import store from '../../core/store';
import auth from '../../api/auth-api';

import Input from '../Input';
import ChatPreview from './ChatPreview';
import Profile from './Profile';
import IconButton from '../IconButton';

import type { ChatPreviewProps } from './ChatPreview';

import * as styles from './Sidebar.module.pcss';

export type SidebarState = {
  profileActive: boolean;
  userFetched: boolean;
};

export default class Sidebar extends Creact.Component<EmptyObject, SidebarState> {
  constructor(props: EmptyObject) {
    super(props);

    this.state = {
      profileActive: false,
      userFetched: false,
    };
  }

  componentDidMount(): void {
    auth.user()
      .then(({ status, response }) => {
        if (status !== 200) {
          const errorMessage = JSON.parse(response).reason;
          throw new Error(errorMessage);
        }
        const user = JSON.parse(response);
        if (!user.id && !this.state.userFetched) {
          router.go('/');
        } else {
          store.dispatch({
            type: 'STORE_USER',
            payload: user,
          });
          this.setState({ userFetched: true });
        }
      })
      .catch((err) => {
        console.error(err);
        router.go('/');
      });
  }

  async signout(): Promise<void> {
    await auth.signout();
    store.dispatch({
      type: 'STORE_USER',
      payload: undefined,
    });
    router.go('/');
  }

  render(): JSX.Element {
    const { profileActive } = this.state;
    const { user, chats } = store.state;

    console.log(profileActive);
    return (
      <aside className={styles.root}>
        {!!user && (
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <a className={styles.avatar} onClick={() => this.setState({ profileActive: !profileActive })}>
                <img src={user.avatar ?? ''} alt="" />
              </a>
              <b>{`${user.first_name} ${user.second_name}`}</b>
            </div>
            <div className={styles.userActions}>
              <IconButton
                active={profileActive}
                size="small"
                icon="fa fa-user"
                variant="secondary"
                onClick={() => this.setState({ profileActive: !profileActive })}
              />
              <IconButton
                size="small"
                icon="fa fa-sign-out-alt"
                variant="secondary"
                onClick={this.signout}
              />
            </div>
          </div>
        )}
        <Input name="search" label="Search" type="text" autocomplete="search" />
        {profileActive ? (
          <Profile {...user!} />
        ) : chats
          && (chats.map((chat: ChatPreviewProps) => <ChatPreview {...chat} />) ?? <></>)}
      </aside>
    );
  }
}
