import Page from '../../core/Page';

import template from './Button.tmpl';

export default class Button extends Page {
  componentDidMount() {
    return this;
  }

  render() {
    console.log('render button');
    return template(this.props.variant);
  }
}
