import Component from '../../core/Component';

import template from './NotFoundPage.tmpl';
import { fetchWithRetry } from '../../core/HTTPTransport';
import Button from '../../components/Button/Button';

export default class NotFoundPage extends Component {
  name = 'NotFoundPage';

  constructor(root: HTMLElement, props: ComponentProps) {
    super(root, {
      ...props,
      button: new Button('button', props.button).element!,
    });
  }

  async componentDidMount(): Promise<void> {
    const { response } = await fetchWithRetry(
      'https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1',
      {},
    );
    const { results } = JSON.parse(response);
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render(): string {
    return template;
  }
}
