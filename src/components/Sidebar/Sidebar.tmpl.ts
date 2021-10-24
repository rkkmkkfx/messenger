import * as styles from './Sidebar.module.pcss';

export default `
  <aside class="${styles.root}">
    <div class="${styles.user}">
      <a href="/profile" class="${styles.avatar}" onclick={{profileClick}}"></a>
    </div>
    {#with search as input #}
      {#include Input #}
    {#with#}
    {{children}}
  </aside>
`;
