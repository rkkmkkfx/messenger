import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Button from '../../components/Button/Button';

import router from '../../core/router';

import * as styles from './ErrorPage.module.pcss';

type ErrorPageProps = {
  status?: number;
  message?: string;
};

type ErrorPageState = {
  heading: string;
  url: string;
};

export default class ErrorPage extends Creact.Component<ErrorPageProps, ErrorPageState> {
  componentDidMount(): void {
    try {
      const { status, message } = router.state;
      if (!this.state.heading) {
        this.setState({
          heading: `${status}: ${message}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render(): JSX.Element {
    return (
      <Card heading={this.state.heading}>
        <div className={styles.buttons}>
          {router.state.message === 'User already in system' ? (
            <Button variant="primary" to="/messenger">Go to the messenger</Button>
          ) : (
            <Button variant="primary" to="/">Back to the App</Button>
          )}
        </div>
      </Card>
    );
  }
}
