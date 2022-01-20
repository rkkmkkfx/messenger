import Creact from '../../core/Creact';

import * as styles from './Input.module.pcss';
import { validate } from '../../core/Validator';

export type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  autocomplete?: string;
  value?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: true;
  hidden?: true;
  onInput?: EventListenerOrEventListenerObject;
};

export type InputState = {
  errors: string[],
  shouldValidate: boolean;
};

export default class Input extends Creact.Component<InputProps, InputState> {
  render(): JSX.Element {
    const { errors } = this.state;
    return (
      <label className={[styles.root, this.props.hidden ? styles.hidden : undefined].join(' ')}>
        <span className={styles.label}>{this.props.label}</span>
        <input
          {...this.props}
          className={styles.input}
          onBlur={(event: Event) => this.setState({
            errors: validate(event),
          })}
          onFocus={(event: Event) => this.setState({
            errors: validate(event),
          })}
          onInput={this.props.onInput}
        />
        <span className={styles.helperText}>{errors?.join('\n') ?? ''}</span>
      </label>
    );
  }
}
