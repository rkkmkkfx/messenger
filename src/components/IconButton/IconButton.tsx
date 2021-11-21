import Creact from '../../core/Creact';

import * as styles from './IconButton.module.pcss';

type IconButtonProps = {
  icon: string;
  type?: string;
  active?: boolean;
  size: 'small' | 'large';
  variant: string;
  disabled?: boolean;
  onClick?: EventListenerOrEventListenerObject
};

export default class IconButton extends Creact.Component<IconButtonProps> {
  render(): JSX.Element {
    return (
      <button
        className={`
          ${styles.root}
          ${styles[this.props.variant]}
          ${styles[this.props.size]}
          ${this.props.active ? styles.active : ''}
        `}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        <i className={this.props.icon} />
      </button>
    );
  }
}
