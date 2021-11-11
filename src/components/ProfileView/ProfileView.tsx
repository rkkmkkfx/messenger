import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import Button from '../Button';

import * as styles from './ProfileView.module.pcss';

export default class ProfileView extends Component<UserData> {
  getLabel(key: string) {
    return key.replaceAll('_', ' ');
  }

  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <h1>User profile</h1>
        <dl>
          {Object.entries(this.props).map(([key, value]) => (
            <>
              <dt className={styles.label}>{this.getLabel(key)}</dt>
              <dd className={styles.value}>{value}</dd>
            </>
          ))}
        </dl>
        <Button variant="primary">Edit profile</Button>
        <Button variant="secondary">Change Password</Button>
      </div>
    );
  }
}
