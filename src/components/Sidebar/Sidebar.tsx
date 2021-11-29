import Creact from '../../core/Creact';

import router from '../../core/router';
import store from '../../core/store';
import authAPI from '../../core/http/api/auth-api';
import chatsAPI from '../../core/http/api/chat-api';

import { getFormValues } from '../../core/utils';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import Profile from './Profile';
import IconButton from '../IconButton';
import ChatPreview from './ChatPreview';

import type { ChatData } from '../Chat/Chat';

import * as styles from './Sidebar.module.pcss';

export type SidebarState = {
  userFetched: boolean;
  profileActive: boolean;
  isUpdateNeeded: boolean;
  showNewChatDialog: boolean;
};

export default class Sidebar extends Creact.Component<EmptyObject, SidebarState> {
  constructor(props: EmptyObject) {
    super(props);

    this.state = {
      userFetched: false,
      profileActive: false,
      isUpdateNeeded: false,
      showNewChatDialog: false,
    };

    store.subscribe(() => {
      this.setState({ isUpdateNeeded: true });
    });
  }

  componentDidMount(): void {
    Promise.all([authAPI.user(), chatsAPI.list()])
      .then((data) => {
        if (data.find(({ status }) => status !== 200)) {
          const errorMessage = `Errors: ${data.map(({ response }) => JSON.parse(response).reason)}`;
          throw new Error(errorMessage);
        }
        return data.map(({ response }) => JSON.parse(response));
      })
      .then(([user, chats]) => {
        if (!user.id && !this.state.isUpdateNeeded) {
          router.go('/');
        } else {
          store.dispatch({
            type: 'STORE_USER',
            payload: user,
          });

          console.log(chats);

          store.dispatch({
            type: 'CHATS_LIST',
            payload: chats,
          });
          this.setState({ isUpdateNeeded: true });
        }
      })
      .catch((err) => {
        console.error(err);
        router.go('/');
      });
  }

  async signout(): Promise<void> {
    await authAPI.signout();
    store.dispatch({
      type: 'STORE_USER',
      payload: undefined,
    });
    router.go('/');
  }

  newChat = (event: SubmitEvent) => {
    event.preventDefault();
    const typedTarget = event.currentTarget as HTMLFormElement;
    const values = getFormValues(typedTarget);
    chatsAPI.newChat(values)
      .then(({ status, statusText }) => {
        if (status === 200) {
          return chatsAPI.list();
        }
        throw new Error(statusText);
      })
      .then(({ response }) => {
        const chats = JSON.parse(response);
        store.dispatch({
          type: 'CHATS_LIST',
          payload: chats,
        });

        this.setState({ showNewChatDialog: false });
      });
  };

  render(): JSX.Element {
    const { profileActive, showNewChatDialog } = this.state;
    const { user, chats } = store.state;

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
        <Input name="search" label="Search" type="text" autocomplete="search" />
        <Button
          variant="primary"
          onClick={() => this.setState({ showNewChatDialog: !showNewChatDialog })}
        >
          New Chat
        </Button>
        {profileActive ? (
          <Profile {...user!} />
        ) : (
          <div className={styles.chats}>
            {chats?.list
              && chats.list.map((chat: ChatData) => <ChatPreview {...chat} />)}
          </div>
        )}
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
      </aside>
    );
  }
}
