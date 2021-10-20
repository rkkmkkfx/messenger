import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './NotFoundPage.tmpl';

type NotFoundPageProps = {
  url: string;
  heading: string;
  buttons: ButtonProps[];
};

export default class NotFoundPage extends Page<NotFoundPageProps> {
  async componentDidMount(): Promise<void> {
    const res = await fetch('https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1');
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render(): string {
    return templator.compile(this.props, template);
  }
}
