import templator from '../../utils/Templator';
import Page from '../../utils/Page';

import template from './NotFound.tmpl';

type NotFoundPageProps = {
  url: string;
  heading: string;
  buttons: ButtonProps[];
};

export default class NotFoundPage extends Page<NotFoundPageProps> {
  async componentDidMount() {
    const res = await fetch('https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1');
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render() {
    const block = templator.compile(this.props, template);
    console.log(this.props, block);
    return block;
  }
}
