import Creact from '../../core/Creact';

import store, { connect } from '../../core/store';
import {
  chatsAPI,
  ChatInstance,
  ChatData,
} from '../../core/api';

import Header from './Header';
import Controls from './Controls';
import Modal from '../Modal';
import Button from '../Button';
import SearchUsers from './Header/SearchUsers';
import Message from './Message';

import * as styles from './Chat.module.pcss';

const chatIcon = new URL('./assets/chat.svg', import.meta.url);

function scrollToBottom(query: string) {
  const element = document.querySelector(query);
  if (element) {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
}

type ChatState = {
  user: UserData;
  chats: ChatInstance[];
  chat: ChatInstance;
  showDeleteDialog?: boolean;
  showAddUserDialog?: boolean;
  userSearch?: string;
};

class Chat extends Creact.Component<EmptyObject, ChatState> {
  async deleteChat(id?: number): Promise<void> {
    if (id) {
      await chatsAPI.deleteChat(id);
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
    }
    this.setState({
      showDeleteDialog: false,
    });
  }

  render(): JSX.Element {
    const { avatar = '' } = this.state.user ?? {};
    const chat = this.state.chats.find((item: ChatInstance) => item.active);
    scrollToBottom(styles.root);
    return chat?.id ? (
      <section className={styles.root}>
        <Header
          id={chat.id}
          avatar={avatar}
          title={chat.title!}
          toggle={{
            addUserDialog: () => this.setState({ showAddUserDialog: true }),
            deleteChatDialog: () => this.setState({ showDeleteDialog: true }),
          }} />
        <main className={styles.messages} id="chat">
          {chat.messages && chat.messages.map((message) => <Message {...message} />)}
        </main>
        <Controls send={chat.send.bind(chat)} />
        {this.state.showDeleteDialog && <Modal
          heading="Delete chat?"
          active={this.state.showDeleteDialog}
          size="small"
          onClose={() => this.setState({ showDeleteDialog: false })}
        >
          <h3>Are you sure want to delete this chat?</h3>
          <Button variant="secondary" onClick={() => this.setState({ showDeleteDialog: false })}>
            No
          </Button>
          <Button variant="primary" onClick={() => this.deleteChat(chat.id!)}>
            Yes
          </Button>
        </Modal>}
        {this.state.showAddUserDialog && <Modal
          heading="Add User"
          active={this.state.showAddUserDialog}
          size="small"
          onClose={() => this.setState({ showAddUserDialog: false })}
        >
          <SearchUsers chat={chat} />
          <Button variant="secondary" onClick={() => this.setState({ showAddUserDialog: false })}>
            Close
          </Button>
        </Modal>}
      </section>
    ) : (
      <div className={styles.placeholder}>
        <img className={styles.img} src={chatIcon} alt="Chat Placeholder image" />
      </div>
    );
  }
}

export default connect((state) => ({
  user: state.user,
  chats: state.chats,
}))(Chat);
