import Component from '../../core/Component';

import template from './SignInPage.tmpl';
import Form from '../../components/Form/Form';

export default class SignInPage extends Component {
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
