import Creact from '../../../core/Creact';

import store from '../../../core/store';
import { messageAPI, chatsAPI, userAPI } from '../../../core/http';

import type { ChatData } from '../../Chat/Chat';

import * as styles from './ChatPreview.module.pcss';

type ChartPreviewState = {
  user: UserData;
};

export default class ChatPreview extends Creact.Component<ChatData, ChartPreviewState> {
  componentDidMount(): void {
    console.log(this.props);
    if (this.props.last_message && this.props.last_message.user_id) {
      userAPI.getById(this.props.last_message.user_id).then(({ response }) => {
        const user = JSON.parse(response);
        this.setState({ user });
      });
    }
  }

  setActiveChat(id: number | undefined) {
    if (id) {
      store.dispatch({
        type: 'SET_ACTIVE_CHAT_ID',
        payload: id,
      });
      chatsAPI.getUserWssToken(id).then(({ response }) => {
        const { token } = JSON.parse(response);
        if (store.state.user?.id) {
          messageAPI.connect(store.state.user.id, id, token);
        }
      });
    }
  }

  render(): JSX.Element {
    return (typeof this.props.id !== 'undefined') ? (
      <a className={styles.root} onClick={() => this.setActiveChat(this.props.id)}>
        <img
          className={styles.avatar}
          src={this.props.avatar ?? `https://avatars.dicebear.com/api/bottts/${this.props.id}.svg`}
          alt={this.props.title}
        />
        <div>
          <h3>{this.props.title}</h3>
          {this.props.last_message && (
            <span className={styles.message}>
              {this.state.user && <b>{this.state.user.first_name}:&nbsp;</b>}
              {this.props.last_message.content}
            </span>
          )}
        </div>
      </a>
    ) : <p></p>;
  }
}
