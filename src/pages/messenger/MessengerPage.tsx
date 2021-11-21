import Creact from '../../core/Creact';

import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';

import * as styles from './MessengerPage.module.pcss';

export default class MessengerPage extends Creact.Component {
  render(): JSX.Element {
    return (
      <section className={styles.root}>
        <Sidebar />
        <Chat />
      </section>
    );
  }
}
