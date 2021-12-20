import Creact from '../../../../core/Creact';

import { userAPI } from '../../../../core/http';
import type { ChatInstance } from '../../../../core/http';

import Input from '../../../Input';
import IconButton from '../../../IconButton';

import * as styles from './SearchUsers.module.pcss';

type SearchUsersProps = {
  chat: ChatInstance;
};

type SearchUsersState = {
  searchResults: UserData[];
  userSearch?: string;
};

export default class SearchUsers extends Creact.Component<SearchUsersProps, SearchUsersState> {
  isNew = (userId: number): boolean => !this.props.chat.users.find(({ id }) => userId === id);

  searchUsers = async (): Promise<void> => {
    if (this.state.userSearch) {
      const { response } = await userAPI.find({ login: this.state.userSearch });
      let newSearchResults: UserData[] = JSON.parse(response);
      newSearchResults = newSearchResults
        .filter((user) => !!this.props.chat.users.find(({ id }) => id !== user.id));
      this.setState({ searchResults: newSearchResults });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  renderUsers = (usersData: UserData[]): JSX.Element[] => !!usersData && usersData.map((user) => (
    <div className={styles.user}>
      {user.display_name ?? `${user.first_name} ${user.second_name}`}
      <IconButton
        size="small"
        icon={this.isNew(user.id!) ? 'fa fa-plus' : 'fa fa-times'}
        variant="secondary"
        onClick={async () => {
          console.log(this.isNew(user.id!));
          if (this.isNew(user.id!)) {
            await this.props.chat.addChatUser(user.id!);
            await this.searchUsers();
          } else {
            await this.props.chat.delChatUser(user.id!);
            await this.searchUsers();
          }
        }}
      />
    </div>
  ));

  render(): JSX.Element {
    const { searchResults } = this.state;
    return (
      <div className={styles.root}>
        <h4>Find user</h4>
        <Input
          name="login"
          label="User Login"
          type="text"
          value={this.state.userSearch ?? ''}
          onInput={async (event: Event) => {
            const typedTarget = event.currentTarget as HTMLInputElement;
            this.setState({ userSearch: typedTarget.value });
            await this.searchUsers();
          }}
        />
        <div className={styles.users}>
          {!!this.props.chat.users && this.renderUsers(this.props.chat.users)}
        </div>
        <div className={styles.users}>
          {!!searchResults && this.renderUsers(searchResults)}
        </div>
      </div>
    );
  }
}
