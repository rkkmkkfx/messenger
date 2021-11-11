import parseJSX from '../../../core/VirtualDOM';
import Component from '../../../core/Component';

import * as styles from './ChatPreview.module.pcss';
import type { MessageProps } from '../../Chat/Message';

export type ChatPreviewProps = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: MessageProps;
};

export default class ChatPreview extends Component<ChatPreviewProps> {
  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <img className={styles.avatar} src={this.props.avatar} alt={this.props.title} />
        <div>
          <h3>{this.props.title}</h3>
          <span className={styles.message}>
            <b>{this.props.last_message.user.first_name}:&nbsp;</b>
            {this.props.last_message.content}
          </span>
        </div>
      </div>
    );
  }
}
