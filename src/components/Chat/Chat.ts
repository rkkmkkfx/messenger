import Component from '../../core/Component';
import * as styles from './Chat.module.pcss';
import Controls from './Controls';
import Message from './Message';
import Header from './Header';

export default class Chat extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
      header: new Header('header', props.data).element,
      messages: props.data.messages.map((message: Message) => new Message('div', message).element),
      controls: new Controls('form', props.controls).element,
    });
  }

  render(): string {
    return `
      {{ header }}
      <main class="${styles.messages}">
        {{ messages }}
      </main>
      {{ controls }}
    `;
  }
}
