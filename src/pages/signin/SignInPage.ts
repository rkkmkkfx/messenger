import Page from '../../core/Page';

import template from './SignInPage.tmpl';

type SignInPageProps = {
  heading: string;
  inputs: InputProps[];
  buttons: ButtonProps[];
};

export default class SignInPage extends Page {
  componentDidMount(): SignInPage { return this; }

  render() {
    return template;
  }
}
