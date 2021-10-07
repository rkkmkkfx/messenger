import * as styles from './Paper.module.pcss';
import Buttons from '../../components/Buttons';

type PaperProps = {
  title: string;
  children: string;
  withButtons?: boolean;
};

export default ({ title, children, withButtons = false }: PaperProps): string => (`
  <section class=${styles.root}>
    <h1 class=${styles.title}>${title}</h1>
    ${children}
    ${withButtons ? `
      <div class=${styles.buttons}>
        {#with buttons.0 as button #}
          ${Buttons.primary}
        {#with#}
        {#with buttons.1 as button #}
          ${Buttons.secondary}
        {#with#}
      </div>
    ` : ''}
  </section>
`);
