import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import router from '../../core/router';

import { connect } from '../../core/store';
import auth from '../../core/api/auth-api';

import * as styles from './SignInPage.module.pcss';
import { getFormValues } from '../../core/utils';

class SignInPage extends Creact.Component {
  submitHandler(event: Event): void {
    event.preventDefault();
    const { currentTarget } = event;
    const typedTarget = currentTarget as HTMLFormElement;
    const credentials = getFormValues(typedTarget);
    auth.signin(credentials)
      .then(() => {
        router.go('/messenger');
      });
  }

  componentDidMount() {
    if (this.state.user) {
      // router.go('/messenger');
    }
  }

  render(): JSX.Element {
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

export default connect((state) => ({ user: state.user }))(SignInPage);
