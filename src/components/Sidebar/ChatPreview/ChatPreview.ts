import Component from '../../../core/Component';

import * as styles from './ChatPreview.module.pcss';

export type ChatPreviewProps = Chat;

export default class ChatPreview extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
    });
  }

  render(): string {
    return `
      <img class="${styles.avatar}" src="{{avatar}}" alt="{{title}}">
      <div>
        <h3>{{title}}</h3>
        <span class="${styles.message}">
          <b>{{last_message.user.first_name}}:&nbsp;</b>
          {{last_message.content}}
        </span>
      </div>
    `;
  }
}
