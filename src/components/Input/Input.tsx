import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import * as styles from './Input.module.pcss';
import { validate, setValidationProps } from '../../core/Validator';

export type InputProps = {
  name: string;
  placeholder?: string;
  type: string;
  autocomplete: string;
  value?: string;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
};

export default class Input extends Component<InputProps> {
  render(): JSX.Element {
    return (
      <input
        {...this.props}
        {...setValidationProps(this.props.name)}
        className={styles.root}
        onBlur={validate}
        onFocus={validate}
        onInvalid={console.log}
      />
    );
  }
}
