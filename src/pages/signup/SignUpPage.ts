import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './SignUpPage.tmpl';

type SignUpPageProps = {
  heading: string;
  inputs: InputProps[];
  buttons: ButtonProps[];
};

export default class SignUpPage extends Page<SignUpPageProps> {
  componentDidMount(): SignUpPage { return this; }

  render(): string {
    return templator.compile(this.props, template);
  }
}
