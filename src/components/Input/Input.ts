import Component from '../../core/Component';

import * as styles from './Input.module.pcss';
import { validate } from '../../core/Validator';

export type InputProps = {
  name: string;
  placeholder: string;
  type: string;
  autocomplete: string;
  events: {
    [key: string]: EventListenerOrEventListenerObject;
  };
};

export default class Input extends Component {
  constructor(tag: string, props: InputProps) {
    super(tag, {
      ...props,
      className: styles.root,
      events: {
        ...props.events,
        blur: validate,
        focus: validate,
      },
    });
  }

  render(): string {
    return '';
  }
}
