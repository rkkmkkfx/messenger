import Creact from '../../../core/Creact';

import store from '../../../core/store';

import Button from '../../Button';
import Input from '../../Input';

import * as styles from './Profile.module.pcss';

export default class Profile extends Creact.Component<UserData> {
  constructor(props: UserData) {
    super(props);

    this.state = {
      mode: 'view',
    };
  }

  submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
  };

  render(): JSX.Element {
    const { mode } = this.state;
    const { user } = store.state;
    return (
      <div className={styles.root}>
        <h1>User profile</h1>
        {(() => {
          switch (mode) {
            case 'edit':
              return (
                <form className={styles.root} onSubmit={this.submitHandler} noValidate>
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
                      name="last_name"
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
                    <Button type="submit" variant="primary">Save</Button>
                    <Button type="button" variant="secondary">Cancel</Button>
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
                    <Button variant="primary" onClick={() => this.setState({ mode: 'edit' })}>Edit profile</Button>
                    <Button variant="secondary">Change Password</Button>
                  </div>
                </div>
              );
            default: return <></>;
          }
        })()}
      </div>
    );
  }
}
