import Creact from '../../../../core/Creact';

import { chatsAPI } from '../../../../core/http';

import IconButton from '../../../IconButton';

import * as styles from './SearchUsers.module.pcss';

type SearchUsersProps = {
  chatId: number;
  users: UserData[];
};

export default class SearchUsers extends Creact.Component<SearchUsersProps> {
  render(): JSX.Element {
    const { chatId, users } = this.props;
    return (
      <div>
        {!!users && users.map((user) => (
          <div className={styles.user}>
            {user.display_name ?? `${user.first_name} ${user.second_name}`}
            <IconButton
              size="small"
              icon="fa fa-plus"
              variant="secondary"
              onClick={() => {
                chatsAPI.addUsers({
                  chatId,
                  users: users && users.length ? users.map(({ id }) => id!) : [],
                });
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
