import Input from '../../../components/Input/index.tmpl';
import Buttons from '../../../components/Buttons';

import styles from './SignInForm.module.pcss';

export default `
  <form class=${styles.root}>
    <h1 class=${styles.title}>Вход</h1>
    <div class=${styles.fields}>
      {#each inputs as input #}
        ${Input}
      {#each#}
    </div>
    <div class=${styles.buttons}>
      {#with buttons.0 as button #}
        ${Buttons.primary}
      {#with#}
      {#with buttons.1 as button #}
        ${Buttons.secondary}
      {#with#}
</div>
  </form>
`;
