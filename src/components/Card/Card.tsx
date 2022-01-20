import Creact from '../../core/Creact';

import * as styles from './Card.module.pcss';

type CardProps = {
  heading: string;
  className?: string;
};

export default class Card extends Creact.Component<CardProps> {
  render(): JSX.Element {
    return (
      <div className={[styles.root, this.props.className].join(' ')}>
        <h1 className={styles.title}>{this.props.heading}</h1>
        {this.children}
      </div>
    );
  }
}
