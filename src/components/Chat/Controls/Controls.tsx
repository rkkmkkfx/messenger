import Creact from '../../../core/Creact';

import IconButton from '../../IconButton';
import Input from '../../Input';

import * as styles from './Controls.module.pcss';

export default class Controls extends Creact.Component<Record<string, any>> {
  render(): JSX.Element {
    return (
      <form className={styles.root}>
        <IconButton size="large" icon="fas fa-paperclip" variant="secondary" onClick={console.log} />
        <Input name="message" label="Type your message here" type="text" autocomplete="off" />
        <IconButton size="large" icon="fas fa-paper-plane" variant="primary" type="submit" />
      </form>
    );
  }
}
