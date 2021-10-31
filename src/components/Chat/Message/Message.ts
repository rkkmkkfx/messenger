import Component from '../../../core/Component';

import * as styles from './Message.module.pcss';

export default class Message extends Component {
  constructor(tag: string, props: ComponentProps) {
    const messageType = props.user.login === 'username' ? 'outgoing' : 'incoming';
    super(tag, {
      ...props,
      className: `${styles.root} ${styles[messageType]}`,
    });
  }

  render(): string {
    return '{{ content }}';
  }
}
