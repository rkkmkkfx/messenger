import Component from '../../core/Component';

import Input from '../Input';
import Button from '../Button';
import type { InputProps } from '../Input';
import type { ButtonProps } from '../Button';

import * as styles from './Form.module.pcss';
import validateForm from '../../core/Validator';

export default class Form extends Component {
  constructor(tag: string, props: ComponentProps) {
    super(tag, {
      ...props,
      className: styles.root,
      events: {
        ...props.event,
        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;

          validateForm(form, () => {
            const formData = new FormData(form);
            formData.forEach(console.log);
          });
        },
      },
      inputs: props.inputs.map((input: InputProps) => new Input('input', input).element),
      buttons: props.buttons.map((button: ButtonProps) => new Button('button', button).element),
    });
  }

  render(): string {
    return `
      <div class=${styles.fields}>
        {{ inputs }}
      </div>
      <div class=${styles.buttons}>
        {{ buttons }}
      </div>
    `;
  }
}
