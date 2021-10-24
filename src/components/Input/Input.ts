import Page from '../../core/Page';

import templator from '../../core/Templator';

import template from './Input.tmpl';

export default class Input extends Page<InputProps> {
  componentDidMount() { return this; }

  render() {
    return templator.compile(template, this.props);
  }
}
