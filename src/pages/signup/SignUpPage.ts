import Component from '../../core/Component';

import template from './SignUpPage.tmpl';
import Form from '../../components/Form/Form';

export default class SignUpPage extends Component {
  constructor(root: HTMLElement, props: ComponentProps) {
    super(root, {
      ...props,
      form: new Form('form', props.form).element!,
    });
  }

  render(): string {
    return template;
  }
}
