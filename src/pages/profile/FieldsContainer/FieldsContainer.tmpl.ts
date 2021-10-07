import * as styles from './FieldsContainer.module.pcss';

export default `
    <div class="${styles.fields}">
      <h1>User profile</h1>
      <dl>
        {#each fields as field #}
          <dt class="${styles.label}">{{field.label}}</dt>
          <dd class="${styles.value}">{{field.value}}</dd>
        {#each#}
      </dl>
    </div>
`;
