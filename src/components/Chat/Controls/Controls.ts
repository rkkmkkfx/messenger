import Component from '../../../core/Component';
import IconButton from '../../IconButton';
import Input from '../../Input';

import * as styles from './Controls.module.pcss';

export default class Controls extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
      attachButton: new IconButton('button', { icon: 'fas fa-paperclip', variant: 'secondary' }).element,
      messageInput: new Input('input', props.messageInput).element,
      sendButton: new IconButton('button', { icon: 'fas fa-paper-plane', variant: 'primary', type: 'submit' }).element,
    });
  }

  render(): string {
    return `
      {{ attachButton }}
      {{ messageInput }}
      {{ sendButton }}
    `;
  }
}
