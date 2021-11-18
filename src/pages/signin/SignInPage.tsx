import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import router from '../../core/router';

import store from '../../core/store';

import * as styles from './SignInPage.module.pcss';
import { getFormValues } from '../../core/utils';

export type UserFormPageState = {
  isSignInForm: boolean;
};

export default class UserFormPage extends Creact.Component<EmptyObject, UserFormPageState> {
  submitHandler(event: Event): void {
    event.preventDefault();
    store.dispatch({
      type: 'REGISTER',
      payload: getFormValues(event.target as HTMLFormElement),
    });
    router.go('/messenger');
  }

  render(): JSX.Element {
    console.log('Page');
    return (
      <Card heading="Sign In">
        <form className={styles.root} onSubmit={this.submitHandler} noValidate>
          <div className={styles.fields}>
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
              name="password"
              type="password"
              autocomplete="password"
              label="Password*"
              pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              minLength={8}
              maxLength={40}
              required
            />
          </div>
          <div className={styles.buttons}>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
            <Button type="button" variant="secondary" to="/sign-up">
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}
