import parseJSX from '../../../core/VirtualDOM';
import Component from '../../../core/Component';

import * as styles from './Message.module.pcss';

export type MessageProps = {
  user: UserData;
  time: Date | string;
  content: string;
};

export default class Message extends Component<MessageProps> {
  render(): JSX.Element {
    return (
      <div className={`${styles.root} ${styles[this.props.user.login === 'username' ? 'outgoing' : 'incoming']}`}>
        {this.props.content}
      </div>
    );
  }
}
