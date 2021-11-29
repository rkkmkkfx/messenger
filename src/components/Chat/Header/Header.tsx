import Creact from '../../../core/Creact';

import store from '../../../core/store';
import { userAPI } from '../../../core/http';

import Modal from '../../Modal';
import Input from '../../Input';
import Button from '../../Button';
import SearchUsers from './SearchUsers';
import IconButton from '../../IconButton';

import * as styles from './Header.module.pcss';

type HeaderProps = {
  id: number;
  avatar: string;
  title: string;
  deleteChat: (id?: number) => void;
};

type HeaderState = {
  showDeleteDialog?: boolean;
  showAddUserDialog?: boolean;
  users: UserData[];
};

export default class Header extends Creact.Component<HeaderProps, HeaderState> {
  deleteHandler(): void {
    this.props.deleteChat(this.props.id);
    store.dispatch({
      type: 'SET_ACTIVE_CHAT_ID',
      payload: undefined,
    });
    this.setState({
      showDeleteDialog: false,
      showAddUserDialog: false,
    });
  }

  render(): JSX.Element {
    console.log(this.state);
    return (
      <header className={styles.root}>
        {this.state.users && <input hidden value={this.state.users} />}
        <img
          className={styles.avatar}
          src={this.props.avatar ?? `https://avatars.dicebear.com/api/bottts/${this.props.id}.svg`}
          alt=""
        />
        <div className={styles.info}>
          <h3>{this.props.title}</h3>
          <span className={styles.status}>Online</span>
        </div>
        <div className={styles.controls}>
          <IconButton
            size="small"
            icon="fas fa-user-plus"
            variant="secondary"
            onClick={() => this.setState({ showAddUserDialog: true })}
          />
          <IconButton
            size="small"
            icon="fa fa-trash"
            variant="secondary"
            onClick={() => this.setState({ showDeleteDialog: true })}
          />
        </div>
        {this.state.showAddUserDialog && <Modal
          heading="Delete chat?"
          active={this.state.showDeleteDialog}
          size="small"
          onClose={() => this.setState({ showDeleteDialog: false })}
        >
          <h3>Are you sure want to delete this chat?</h3>
          <Button variant="secondary" onClick={() => this.setState({ showDeleteDialog: false })}>
            No
          </Button>
          <Button variant="primary" onClick={() => this.deleteHandler()}>
            Yes
          </Button>
        </Modal>}
        {this.state.showAddUserDialog && <Modal
          heading="Add User"
          active={this.state.showAddUserDialog}
          size="small"
          onClose={() => this.setState({ showAddUserDialog: false })}
        >
          <h3>Find user</h3>
          <Input
            name="login"
            label="User Login"
            type="text"
            onInput={async (event: Event) => {
              const typedTarget = event.currentTarget as HTMLInputElement;
              const { response } = await userAPI.find({ login: typedTarget.value });
              this.setState({ users: JSON.parse(response) });
            }}
          />
          <SearchUsers chatId={this.props.id} users={this.state.users} />
          <Button variant="secondary" onClick={() => this.setState({ showAddUserDialog: false })}>
            Close
          </Button>
        </Modal>}
      </header>
    );
  }
}
