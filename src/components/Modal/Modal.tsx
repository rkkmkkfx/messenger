import Creact from '../../core/Creact';

import Card from '../Card';
import IconButton from '../IconButton';

import * as styles from './Modal.module.pcss';

type DialogProps = {
  heading: string;
  active?: boolean;
  size: 'small' | 'large';
  onClose: (event?: Event) => void;
};

export default class Modal extends Creact.Component<DialogProps> {
  close = (): void => {
    this.props.onClose();
  };

  render(): JSX.Element {
    return (
      <div className={[styles.root, this.props.active ? styles.visible : ''].join(' ')}>
        <Card className={styles.card} heading={this.props.heading}>
          <IconButton
            size="small"
            variant="plain"
            icon="fas fa-times"
            className={styles.close}
            onClick={this.close}
          />
          {this.children}
        </Card>
      </div>
    );
  }
}
