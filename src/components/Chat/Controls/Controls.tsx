import Creact from '../../../core/Creact';

import IconButton from '../../IconButton';
import Input from '../../Input';

import * as styles from './Controls.module.pcss';
import { getFormValues } from '../../../core/utils';

type ControlsProps = {
  send(type: string, content: string): void;
};

export default class Controls extends Creact.Component<ControlsProps> {
  formHandler = (event: Event): void => {
    event.preventDefault();
    const typedTarget = event.currentTarget as HTMLFormElement;
    const { content } = getFormValues(typedTarget);
    this.props.send('message', content);
    typedTarget.reset();
  };

  render(): JSX.Element {
    return (
      <div className={styles.root}>
        <form onSubmit={this.formHandler} className={styles.form}>
          <IconButton type="button" size="large" icon="fas fa-paperclip" variant="secondary" onClick={console.log} />
          <Input name="content" label="Type your message here" type="text" autocomplete="off" required />
          <IconButton size="large" icon="fas fa-paper-plane" variant="primary" type="submit" />
        </form>
      </div>
    );
  }
}
