import Creact from '../../../core/Creact';

import store from '../../../core/store';

import * as styles from './Message.module.pcss';

export type MessageProps = {
  chat_id: number,
  time: string,
  type: string,
  user_id: number,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  }
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
