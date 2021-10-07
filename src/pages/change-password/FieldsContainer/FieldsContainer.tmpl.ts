import Input from '../../../components/Input/Input.tmpl';

import * as styles from './FieldsContainer.module.pcss';

export default `
    <div class="${styles.fields}">
      <h1>Change password</h1>
      {#each inputs as input #}
        ${Input}
      {#each#}
    </div>
`;
