import Page from '../../core/Page';

import template from './Button.tmpl';

export default class Button extends Page {
  componentDidMount() { return this; }

  render() {
    return template(this.props.variant);
  }
}
