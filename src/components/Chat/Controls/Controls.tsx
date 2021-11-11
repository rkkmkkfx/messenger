import parseJSX from '../../../core/VirtualDOM';
import Component from '../../../core/Component';
import IconButton from '../../IconButton';
import Input from '../../Input';

import * as styles from './Controls.module.pcss';

export default class Controls extends Component<Record<string, any>> {
  render(): JSX.Element {
    return (
      <form className={styles.root}>
        <IconButton icon="fas fa-paperclip" variant="secondary" />
        <Input name="message" placeholder="Type your message here" type="text" autocomplete="off" />
        <IconButton icon="fas fa-paper-plane" variant="primary" type="submit" />
      </form>
    );
  }
}
