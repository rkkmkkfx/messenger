import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './ErrorPage.tmpl';

type ErrorPageProps = {
  url: string;
  status: string;
  message: string;
  buttons: ButtonProps[];
};

export default class ErrorPage extends Page<ErrorPageProps> {
  async componentDidMount(): Promise<void> {
    const params = (new URL(window.location.href)).searchParams;
    const status = params.get('status')!;
    const message = params.get('message') ?? 'Unknown error';
    const res = await fetch(`https://g.tenor.com/v1/random?q=${status}%20Unknown%20Server%20Error&key=9FE9RGPBR01S&limit=1`);
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url, status, message });
  }

  render(): string {
    return templator.compile(this.props, template);
  }
}
