import Creact from '../../core/Creact';

import * as styles from './IconButton.module.pcss';

type IconButtonProps = {
  icon: string;
  type?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  size: 'small' | 'large';
  variant: 'primary' | 'secondary' | 'plain';
  onClick?: EventListenerOrEventListenerObject
};

export default class IconButton extends Creact.Component<IconButtonProps> {
  render(): JSX.Element {
    return (
      <button
        className={[
          styles.root,
          styles[this.props.variant],
          styles[this.props.size],
          this.props.active ? styles.active : '',
          this.props.className,
        ].join(' ')}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        <i className={this.props.icon} />
      </button>
    );
  }
}
