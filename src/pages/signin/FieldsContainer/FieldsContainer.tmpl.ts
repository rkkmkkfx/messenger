import Input from '../../../components/Input/Input.tmpl';

import * as styles from './FieldsContainer.module.pcss';

export default `
    <div class=${styles.fields}>
      {#each inputs as input #}
        ${Input}
      {#each#}
    </div>
`;
