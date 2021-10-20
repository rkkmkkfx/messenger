import * as styles from './ProfilePage.module.pcss';

export default `
  {#block ChatLayout #}
    <div class="${styles.fields}">
      <h1>User profile</h1>
      <dl>
        {#each fields as field #}
          <dt class="${styles.label}">{{field.label}}</dt>
          <dd class="${styles.value}">{{field.value}}</dd>
        {#each#}
      </dl>
    </div>
    {#with buttons.0 as button #}
      {#include ButtonPrimary #}
    {#with#}
    {#with buttons.1 as button #}
      {#include ButtonSecondary #}
    {#with#}
  {#block#}
`;
