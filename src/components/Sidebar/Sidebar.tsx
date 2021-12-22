import Creact from '../../core/Creact';

import router from '../../core/router';
import store, { connect } from '../../core/store';

import {
  authAPI,
  ChatData,
  chatsAPI,
  ChatInstance,
} from '../../core/api';

import { getFormValues } from '../../core/utils';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import Profile from './Profile';
import IconButton from '../IconButton';
import ChatPreview from './ChatPreview';

import * as styles from './Sidebar.module.pcss';

export type SidebarState = {
  user: UserData,
  chats: ChatInstance[],
  search: string;
  profileActive: boolean;
  showNewChatDialog: boolean;
};

class Sidebar extends Creact.Component<EmptyObject, SidebarState> {
  async signout(): Promise<void> {
    await authAPI.signout();
    router.go('/');
  }

  newChat = (event: SubmitEvent) => {
    event.preventDefault();
    const typedTarget = event.currentTarget as HTMLFormElement;
    const values = getFormValues(typedTarget);
    const { user } = this.state;
    if (user?.id) {
      chatsAPI.newChat(values)
        .then(({ status, statusText }) => {
          if (status === 200) {
            return chatsAPI.list()
              .then((chats) => {
                if (user && user?.id) {
                  const { id: userId } = user;
                  const payload = chats.map((chatData: ChatData) => new ChatInstance(chatData, userId!));
                  store.dispatch({
                    type: 'CHATS_LIST',
                    payload,
                  });
                }
              })
              .then(() => this.setState({ showNewChatDialog: false }));
          }
          throw new Error(statusText);
        });
    }
  };

  searchHandler = (event: Event) => {
    const currentTarget = event.currentTarget as HTMLInputElement;
    this.setState({ search: currentTarget?.value ?? '' });
  };

  render(): JSX.Element {
    const {
      user,
      chats,
      profileActive,
      showNewChatDialog,
    } = this.state;
    return (
      <aside className={styles.root}>
        {!!user && (
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <a className={styles.avatar} onClick={() => this.setState({ profileActive: !profileActive })}>
                <img src={user.avatar ?? `https://avatars.dicebear.com/api/bottts/${user.id}.svg`} alt="" />
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
        <div className={styles.search}>
          <Input
            name="search"
            label="Search"
            type="text"
            autocomplete="search"
            onInput={this.searchHandler}
          />
        </div>
        <div className={styles.newChat}>
          <Button
            variant="primary"
            onClick={() => this.setState({ showNewChatDialog: !showNewChatDialog })}
          >
            New Chat
          </Button>
          <Modal
            size="small"
            heading="New chat"
            active={showNewChatDialog}
            onClose={() => this.setState({ showNewChatDialog: !showNewChatDialog })}
          >
            <form onSubmit={this.newChat}>
              <Input name="title" label="Chat title:*" type="text" autocomplete="no" required />
              <Button
                variant="primary"
              >
                Create
              </Button>
            </form>
          </Modal>
        </div>
        {profileActive ? (
          <Profile {...user!} />
        ) : (
          <div className={styles.chats}>
            {chats
              && chats
                .filter((chat) => (
                  !this.state.search
                  || chat.title?.toLowerCase().includes(this.state.search.toLowerCase())))
                .map((chat) => <ChatPreview chat={chat} />)}
          </div>
        )}
      </aside>
    );
  }
}

export default connect((state) => ({
  user: state.user,
  chats: state.chats,
}))(Sidebar);
