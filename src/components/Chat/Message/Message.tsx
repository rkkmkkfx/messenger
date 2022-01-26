import Creact from '../../../core/Creact';

import store from '../../../core/store';

import * as styles from './Message.module.pcss';

const FIRTS_SCREEN_INDEX = 0;

export default class Message extends Creact.Component {
  componentDidMount(): void {
    queueMicrotask(() => {
      const chat = document.querySelector('#chat');
      if (chat && chat.scrollTop === 0) {
        chat.children[FIRTS_SCREEN_INDEX]?.scrollIntoView();
      }
    });
  }

  render(): JSX.Element {
    return (
      <div className={`${styles.root} ${styles[store.state.user?.id === this.props.user_id ? 'outgoing' : 'incoming']}`}>
        {(store.state.user?.id !== this.props.user_id) && (
          <span className={styles.username}>{this.props.username}</span>
        )}
        {this.props.content}
      </div>
    );
  }
}
