import Component from '../../core/Component';

import Input from '../Input';
import Form from '../Form/Form';
import ChatPreview from './ChatPreview';
import type { ChatPreviewProps } from './ChatPreview';

import * as styles from './Sidebar.module.pcss';
import ProfileView from '../ProfileView';

function getContent(props: ComponentProps) {
  switch (props.type) {
  case 'chats':
    return props.chats.map((chat: ChatPreviewProps) => new ChatPreview('div', chat).element);
  case 'profile':
    return new ProfileView('div', props.profile).element;
  case 'form':
    return new Form('form', props.form).element;
  default:
    return null;
  }
}

export default class Sidebar extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
      search: new Input('input', props.search).element,
      content: getContent(props),
    });
  }

  render(): string {
    return `
      <div class="${styles.user}">
        <a href="/profile" class="${styles.avatar}">
          <img src="{{ userpic }}" alt="" />
        </a>
      </div>
      {{ search }}
      {{ content }}
    `;
  }
}
