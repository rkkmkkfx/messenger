import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './HomePage.tmpl';

type HomePageProps = {
  url: string;
  status: string;
  message: string;
  buttons: ButtonProps[];
};

export default class HomePage extends Page<HomePageProps> {
  async componentDidMount(): Promise<HomePage> { return this; }

  render(): string {
    return templator.compile(this.props, template);
  }
}
