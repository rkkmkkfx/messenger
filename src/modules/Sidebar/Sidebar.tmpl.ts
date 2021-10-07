import Input from '../../components/Input';

import * as styles from './Sidebar.module.pcss';

type PaperProps = {
  children: string;
};

export default ({ children }: PaperProps): string => (`
  <aside class="${styles.root}">
    <div class="${styles.user}">
      <a href="/profile" class="${styles.avatar}"></a>
    </div>
    {#with search as input #}
      ${Input}
    {#with#}
    ${children}
  </aside>
`);
