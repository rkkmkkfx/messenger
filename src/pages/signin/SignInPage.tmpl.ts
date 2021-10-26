import * as styles from './SignInPage.module.pcss';

export default `
  <form class="${styles.root}">
    <div class=${styles.fields}>
      {{ signInInputs }}
    </div>
    <div class=${styles.buttons}>
      {#with buttons.0 as button #}
        {#include ButtonPrimary #}
      {#with#}
      {#with buttons.1 as button #}
        {#include ButtonSecondary #}
      {#with#}
    </div>
  </form>
`;
