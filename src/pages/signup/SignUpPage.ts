import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './SignUpPage.tmpl';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

type SignUpPageProps = {
  heading: string;
  inputs: string[] | InputProps[];
  buttons: string[] | ButtonProps[];
};

export default class SignUpPage extends Page<SignUpPageProps> {
  constructor(tagOrParent: HTMLElement | string, props: SignUpPageProps) {
    super(tagOrParent, {
      ...props,
      inputs: props.inputs.map((inputProps) => new Input('input', inputProps as InputProps).render()),
      buttons: props.buttons.map((buttonProps) => new Button('button', buttonProps as ButtonProps).render()),
    });
  }

  componentDidMount(): SignUpPage { return this; }

  render(): string {
    return templator.compile(template, this.props);
  }
}
