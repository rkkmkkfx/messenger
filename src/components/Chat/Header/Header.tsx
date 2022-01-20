import Creact from '../../../core/Creact';

import IconButton from '../../IconButton';

import * as styles from './Header.module.pcss';

type HeaderProps = {
  id: number;
  avatar?: string;
  title: string;
  toggle: {
    addUserDialog: () => void;
    deleteChatDialog: () => void;
  }
};

type HeaderState = {
  showDeleteDialog?: boolean;
  showAddUserDialog?: boolean;
  users: UserData[];
};

export default class Header extends Creact.Component<HeaderProps, HeaderState> {
  render(): JSX.Element {
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
          <span className={styles.status}>{''}</span>
        </div>
        <div className={styles.controls}>
          <IconButton
            size="small"
            icon="fas fa-user-plus"
            variant="secondary"
            onClick={this.props.toggle.addUserDialog}
          />
          <IconButton
            size="small"
            icon="fa fa-trash"
            variant="secondary"
            onClick={this.props.toggle.deleteChatDialog}
          />
        </div>
      </header>
    );
  }
}
