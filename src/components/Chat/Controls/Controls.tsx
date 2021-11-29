import Creact from '../../../core/Creact';

import IconButton from '../../IconButton';
import Input from '../../Input';

import * as styles from './Controls.module.pcss';
import { messageAPI } from '../../../core/http';
import { getFormValues } from '../../../core/utils';

export default class Controls extends Creact.Component<Record<string, any>> {
  formHandler(event: Event) {
    event.preventDefault();
    const typedTarget = event.currentTarget as HTMLFormElement;
    const { content } = getFormValues(typedTarget);
    messageAPI.send('message', content);
  }

  render(): JSX.Element {
    return (
      <form className={styles.root} onSubmit={this.formHandler}>
        <IconButton type="button" size="large" icon="fas fa-paperclip" variant="secondary" onClick={console.log} />
        <Input name="content" label="Type your message here" type="text" autocomplete="off" />
        <IconButton size="large" icon="fas fa-paper-plane" variant="primary" type="submit" />
      </form>
    );
  }
}
