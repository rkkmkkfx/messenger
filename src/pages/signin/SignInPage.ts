import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './SignInPage.tmpl';

type SignInPageProps = {
  heading: string;
  inputs: InputProps[];
  buttons: ButtonProps[];
};

export default class SignInPage extends Page<SignInPageProps> {
  componentDidMount(): SignInPage { return this; }

  render(): string {
    return templator.compile(this.props, template);
  }
}
