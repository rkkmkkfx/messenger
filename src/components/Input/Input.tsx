import Creact from '../../core/Creact';

import * as styles from './Input.module.pcss';
import { validate } from '../../core/Validator';

export type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  autocomplete: string;
  value?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: true;
};

export type InputState = {
  errors: string[],
  shouldValidate: boolean;
};

export default class Input extends Creact.Component<InputProps, InputState> {
  render(): JSX.Element {
    const { errors } = this.state;
    return (
      <label className={styles.root}>
        <span className={styles.label}>{this.props.label}</span>
        <input
          {...this.props}
          className={styles.input}
          onBlur={validate.bind(this)}
          onFocus={validate.bind(this)}
          onInvalid={() => console.log('Error')}
        />
        <span className={styles.helperText}>{errors?.join('\n') ?? ''}</span>
      </label>
    );
  }
}
