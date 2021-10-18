import * as styles from './SignUpPage.module.pcss';

export default `
  {#block Paper #}
    <div class="${styles.fields}">
      {#each inputs as input #}
        {#include Input #}
      {#each#}
    </div>
    <div class=${styles.buttons}>
      {#with buttons.0 as button #}
        {#include ButtonPrimary #}
      {#with#}
      {#with buttons.1 as button #}
        {#include ButtonSecondary #}
      {#with#}
    </div>
  {#block#}
`;
