import Component from '../../../core/Component';

import * as styles from './Header.module.pcss';

export default class Header extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
    });
  }

  render(): string {
    return `
      <img class="${styles.avatar}" src="{{ avatar }}" alt="">
      <div class="${styles.info}">
        <h3>{{ title }}</h3>
        <span class="${styles.status}">Online</span>
      </div>
    `;
  }
}
