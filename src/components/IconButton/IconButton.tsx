import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import * as styles from './IconButton.module.pcss';

type IconButtponProps = {
  icon: string;
  type?: string;
  variant: string;
};

export default class IconButton extends Component<IconButtponProps> {
  render(): JSX.Element {
    return (
      <button className={`${styles.root} ${styles[this.props.variant]}`} type={this.props.type}>
        <i className={this.props.icon} />
      </button>
    );
  }
}
