import * as styles from './ChangePasswordPage.module.pcss';

export default `
  {#block ChatLayout #}
    <div class="${styles.fields}">
      <h1>Change password</h1>
      {#each inputs as input #}
        {#include Input #}
      {#each#}
    </div>
    {#with buttons.0 as button #}
      {#include ButtonPrimary #}
    {#with#}
    {#with buttons.1 as button #}
      {#include ButtonSecondary #}
    {#with#}
  {#block#}
`;
