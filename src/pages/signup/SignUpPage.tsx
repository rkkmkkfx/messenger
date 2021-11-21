import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import router from '../../core/router';

import store from '../../core/store';

import * as styles from './SignUpPage.module.pcss';
import { getFormValues } from '../../core/utils';
import auth from '../../api/auth-api';

export default class SignUpPage extends Creact.Component {
  submitHandler(event: Event): void {
    event.preventDefault();
    auth.signup(getFormValues(event.target as HTMLFormElement)).then(console.log);
    store.dispatch({
      type: 'STORE_USER',
      payload: getFormValues(event.target as HTMLFormElement),
    });
    router.go('/messenger');
  }

  render(): JSX.Element {
    return (
      <Card heading="Create User">
        <form className={styles.root} onSubmit={this.submitHandler} noValidate>
          <div className={styles.fields}>
            <Input
              name="email"
              type="email"
              autocomplete="email"
              label="Email*"
              pattern="^[a-z]+\w+[a-z-]+@([\w-]+\.)+[a-z]{2,4}$"
              required
            />
            <Input
              name="login"
              label="Username*"
              type="text"
              autocomplete="username"
              pattern="^.*(?=.*)(?=.*[a-z])\w+$"
              minLength={3}
              maxLength={20}
              required
            />
            <Input
              name="first_name"
              type="text"
              autocomplete="given-name"
              label="First Name"
              pattern="[а-яА-Яa-zA-Z-]+"
            />
            <Input
              name="second_name"
              type="string"
              autocomplete="family-name"
              label="Last Name"
              pattern="[а-яА-Яa-zA-Z-]+"
            />
            <Input
              name="phone"
              type="tel"
              autocomplete="tel"
              label="Phone Number"
              pattern="\+?\d*"
            />
            <Input
              name="password"
              type="password"
              autocomplete="new-password"
              label="Password*"
              pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              minLength={8}
              maxLength={40}
              required
            />
            <Input
              name="password"
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
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <Button
              type="button"
              variant="secondary"
              to="/"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}
