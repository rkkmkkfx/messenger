import Creact from '../../../core/Creact';

import store from '../../../core/store';
import { ChatInstance } from '../../../core/api';

import * as styles from './ChatPreview.module.pcss';

type ChatPreviewProps = {
  chat: ChatInstance,
};

type ChatPreviewState = {
  username: string;
};

export default class ChatPreview extends Creact.Component<ChatPreviewProps, ChatPreviewState> {
  clickHandler = () => {
    store.state.chats?.forEach((chat) => chat.close());
    this.props.chat.setActive();
  };

  render(): JSX.Element {
    const {
      id,
      avatar,
      title,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      last_message,
    } = this.props.chat ?? {};
    return (typeof id !== 'undefined') ? (
      <a className={styles.root} onClick={this.clickHandler}>
        <img
          className={styles.avatar}
          src={avatar ?? `https://avatars.dicebear.com/api/bottts/${id}.svg`}
          alt={title}
        />
        <div className={styles.content}>
          <h3>{title}</h3>
          {last_message?.username && (
            <span className={styles.message}>
              <b>{last_message.username}:&nbsp;</b>
              {last_message.content}
            </span>
          )}
        </div>
        {(this.props.chat.unread_count ?? 0) > 0 && (
          <span className={styles.count}>{this.props.chat.unread_count}</span>
        )}
        {this.props.chat.active && <span className={styles.active} />}
      </a>
    ) : <p />;
  }
}
