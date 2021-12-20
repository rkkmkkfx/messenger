import Creact from '../../../core/Creact';

import userAPI from '../../../core/http/api/user-api';

import Button from '../../Button';
import Input from '../../Input';

import store from '../../../core/store';
import { getFormValues } from '../../../core/utils';

import * as styles from './Profile.module.pcss';

export default class Profile extends Creact.Component<UserData> {
  constructor(props: UserData) {
    super(props);

    this.state = {
      mode: 'view',
    };
  }

  saveUser = (event: SubmitEvent): void => {
    event.preventDefault();
    const { currentTarget } = event;
    const typedTarget = currentTarget as HTMLFormElement;
    const user = getFormValues(typedTarget) as UserData;
    user.display_name = `${user.first_name} ${user.second_name}`;
    userAPI.update(user)
      .then(({ response, status, statusText }) => {
        const res = JSON.parse(response);
        if (status !== 200) {
          throw new Error(res.reason ?? statusText);
        }
        userAPI.getById(user.id!).then(() => {
          store.dispatch({
            type: 'STORE_USER',
            payload: user,
          });
        });
        this.setState({ mode: 'view' });
      });
  };

  updatePassword = ({ currentTarget }: SubmitEvent): void => {
    const typedTarget = currentTarget as HTMLFormElement;
    userAPI.newPassword(getFormValues(typedTarget))
      .then(({ response, status, statusText }) => {
        const res = JSON.parse(response);
        if (status !== 200) {
          throw new Error(res.reason ?? statusText);
        }
        this.setState({ mode: 'view' });
      });
  };

  render(): JSX.Element {
    const { mode } = this.state;
    const user = this.props;
    return (
      <div className={styles.root}>
        <h1>User profile</h1>
        {(() => {
          switch (mode) {
            case 'edit':
              return (
                <form className={styles.form} onSubmit={this.saveUser} noValidate>
                  <div className={styles.fields}>
                    <Input
                      name="email"
                      type="email"
                      autocomplete="email"
                      label="Email*"
                      value={user?.email}
                    />
                    <Input
                      name="login"
                      label="Username*"
                      type="text"
                      autocomplete="username"
                      value={user?.login}
                    />
                    <Input
                      name="first_name"
                      type="text"
                      autocomplete="given-name"
                      label="First Name"
                      value={user?.first_name}
                    />
                    <Input
                      name="second_name"
                      type="string"
                      autocomplete="family-name"
                      label="Last Name"
                      value={user?.second_name}
                    />
                    <Input
                      name="phone"
                      type="tel"
                      autocomplete="tel"
                      label="Phone Number"
                      value={user?.phone}
                    />
                  </div>
                  <div className={styles.buttons}>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => this.setState({ mode: 'view' })}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              );
            case 'view':
              return (
                <div>
                  <dl>
                    <dt className={styles.label}>Email:</dt>
                    <dd className={styles.value}>{this.props.email}</dd>
                    <dt className={styles.label}>Username:</dt>
                    <dd className={styles.value}>{this.props.login}</dd>
                    <dt className={styles.label}>First Name:</dt>
                    <dd className={styles.value}>{this.props.first_name}</dd>
                    <dt className={styles.label}>Last Name:</dt>
                    <dd className={styles.value}>{this.props.second_name}</dd>
                    <dt className={styles.label}>Phone Number:</dt>
                    <dd className={styles.value}>{this.props.phone}</dd>
                  </dl>
                  <div className={styles.buttons}>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ mode: 'edit' })}
                    >
                      Edit profile
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => this.setState({ mode: 'password' })}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              );
            case 'password':
              return (
                <form className={styles.root} onSubmit={this.updatePassword} noValidate>
                  <div className={styles.fields}>
                    <Input
                      name="login"
                      label="Username*"
                      type="text"
                      autocomplete="username"
                      hidden
                      value={user?.login}
                    />
                    <Input
                      name="oldPassword"
                      type="password"
                      autocomplete="password"
                      label="Old password*"
                      pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                      minLength={8}
                      maxLength={40}
                      required
                    />
                    <Input
                      name="newPassword"
                      type="password"
                      autocomplete="new-password"
                      label="Password*"
                      pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                      minLength={8}
                      maxLength={40}
                      required
                    />
                    <Input
                      name="passwordControl"
                      type="password"
                      autocomplete="new-password"
                      label="Password (yeah, again...)*"
                      pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                      minLength={8}
                      maxLength={40}
                      required
                    />
                  </div>
                  <div className={styles.buttons}>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => this.setState({ mode: 'view' })}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              );
            default: return <></>;
          }
        })()}
      </div>
    );
  }
}
