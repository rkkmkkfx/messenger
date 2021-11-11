import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import Input from '../Input';
import Button from '../Button';
import type { InputProps } from '../Input';
import type { ButtonProps } from '../Button';

import * as styles from './Form.module.pcss';

export type FormProps = {
  inputs: InputProps[];
  buttons: ButtonProps[];
  onSubmit?: GlobalEventHandlers['onsubmit'];
};

export default class Form extends Component<FormProps> {
  render(): JSX.Element {
    return (
      <form className={styles.root} onSubmit={this.props.onSubmit} noValidate>
        <div className={styles.fields}>
          {this.props.inputs.map((inputProps) => <Input {...inputProps} />)}
        </div>
        <div className={styles.buttons}>
          {this.props.buttons.map((buttonProps) => <Button {...buttonProps}>{buttonProps.label}</Button>)}
        </div>
      </form>
    );
  }
}
