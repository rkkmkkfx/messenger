import Creact from '../../../core/Creact';

import Button from '../../Button';

import * as styles from './Profile.module.pcss';
import Input from '../../Input';

export default class Profile extends Creact.Component<UserData> {
  constructor(props: UserData) {
    super(props);

    this.state = {
      mode: 'view',
    };
  }

  submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    console.log(event);
  };

  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <h1>User profile</h1>
        {(this.state.mode === 'edit') && (
          <form className={styles.root} onSubmit={this.submitHandler} noValidate>
            <div className={styles.fields}>
              <Input name="email" type="email" autocomplete="email" label="Email*" />
              <Input name="login" label="Username*" type="text" autocomplete="username" />
              <Input name="first_name" type="text" autocomplete="given-name" label="First Name" />
              <Input name="last_name" type="string" autocomplete="family-name" label="Last Name" />
              <Input name="phone" type="tel" autocomplete="tel" label="Phone Number" />
            </div>
            <div className={styles.buttons}>
              <Button type="submit" variant="primary">Save</Button>
              <Button type="button" variant="secondary">Cancel</Button>
            </div>
          </form>
        )}
        {(this.state.mode === 'view') && (
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
            <Button variant="primary">Edit profile</Button>
            <Button variant="secondary">Change Password</Button>
          </div>
        )}
      </div>
    );
  }
}
