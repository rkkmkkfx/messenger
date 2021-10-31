import Component from '../../core/Component';

import * as styles from './IconButton.module.pcss';

export default class IconButton extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: `${styles.root} ${styles[props.variant]}`,
    });
  }

  render(): string {
    return '<i class="{{icon}}"></i>';
  }
}
