import Component from '../../core/Component';

import Button from '../Button';
import type { ButtonProps } from '../Button';

import * as styles from './ProfileView.module.pcss';

export default class ProfileView extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
      buttons: props.buttons.map((button: ButtonProps) => new Button('button', button).element),
    });
  }

  render(): string {
    return `
      <h1>User profile</h1>
      <dl>
        {#each fields as field #}
          <dt class="${styles.label}">{{field.label}}</dt>
          <dd class="${styles.value}">{{field.value}}</dd>
        {#each#}
      </dl>
      {{ buttons }}
    `;
  }
}
