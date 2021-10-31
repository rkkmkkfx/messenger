import Component from '../../core/Component';

import template from './ErrorPage.tmpl';
import Button from '../../components/Button/Button';

export default class ErrorPage extends Component {
  constructor(root: HTMLElement, props: ComponentProps) {
    super(root, {
      ...props,
      button: new Button('button', props.button).element!,
    });
  }

  async componentDidMount(): Promise<void> {
    const params = (new URL(window.location.href)).searchParams;
    const status = params.get('status')!;
    const message = params.get('message') ?? 'Unknown error';
    const res = await fetch(`https://g.tenor.com/v1/random?q=${status}%20Unknown%20Server%20Error&key=9FE9RGPBR01S&limit=1`);
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({
      url,
      heading: `${status}: ${message}`,
    });
  }

  render(): string {
    return template;
  }
}
