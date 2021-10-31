import Component from '../../core/Component';

import * as styles from './Button.module.pcss';

export type ButtonProps = {
  child: string;
  variant: 'primary' | 'secondary';
  to?: string;
  events: {
    [key: string]: EventListenerOrEventListenerObject;
  };
};

export default class Button extends Component {
  constructor(tag: string, props: ButtonProps) {
    super(tag, {
      ...props,
      className: `${styles.root} ${styles[String(props.variant)]}`,
    });
  }

  render(): string {
    return '<span>{{child}}</span>';
  }
}
