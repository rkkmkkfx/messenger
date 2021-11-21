import Creact from '../../../core/Creact';

import store from '../../../core/store';

import * as styles from './Message.module.pcss';

export type MessageProps = {
  user: UserData;
  time: Date | string;
  content: string;
};

export default class Message extends Creact.Component {
  render(): JSX.Element {
    return (
      <div className={`${styles.root} ${styles[store.state.user?.login === 'username' ? 'outgoing' : 'incoming']}`}>
        {this.props.content}
      </div>
    );
  }
}
