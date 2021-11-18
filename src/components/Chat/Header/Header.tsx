import Creact from '../../../core/Creact';

import * as styles from './Header.module.pcss';

type HeaderProps = {
  avatar: string;
  title: string;
};

export default class Header extends Creact.Component<HeaderProps> {
  render(): JSX.Element {
    return (
      <header className={styles.root}>
        <img className={styles.avatar} src={this.props.avatar} alt="" />
        <div className={styles.info}>
          <h3>{this.props.title}</h3>
          <span className={styles.status}>Online</span>
        </div>
      </header>
    );
  }
}
