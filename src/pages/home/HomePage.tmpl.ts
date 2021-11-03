import * as styles from './HomePage.module.pcss';

export default `
  <div class="${styles.root}">
    {#each links as link #}
      <a href="{{link.href}}" target="_blank">{{link.title}}</a>
    {#each#}
  </div>
`;
