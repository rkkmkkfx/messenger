import Creact from '../../core/Creact';

import * as styles from './Card.module.pcss';

type CardProps = {
  heading: string;
};

export default class Card extends Creact.Component<CardProps> {
  render(): JSX.Element {
    console.log('Card');
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>{this.props.heading}</h1>
        {this.children}
      </div>
    );
  }
}
