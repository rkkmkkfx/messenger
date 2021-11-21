import Creact from '../../core/Creact';
import Router from '../../core/router/Router';

import * as styles from './Button.module.pcss';

export type ButtonProps = {
  variant: 'primary' | 'secondary';
  type?: string;
  to?: string;
  label?: string;
  onClick?: GlobalEventHandlers['onclick'];
};

const router = new Router();

export default class Button extends Creact.Component<ButtonProps> {
  onClick(event: MouseEvent): void {
    if (this.props.to) {
      event.preventDefault();
      router.go(this.props.to);
    }
  }

  render(): JSX.Element {
    return (
      <button
        type={this.props.type}
        className={`${styles.root} ${styles[String(this.props.variant)]}`}
        onClick={this.props.onClick ?? this.onClick.bind(this)}
      >
        <span>{this.children ?? this.props.label}</span>
      </button>
    );
  }
}
