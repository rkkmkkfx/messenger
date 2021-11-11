import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import * as styles from './Card.module.pcss';

type CardProps = {
  heading: string;
};

export default class Card extends Component<CardProps> {
  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>{this.props.heading}</h1>
        {this.children}
      </div>
    );
  }
}
