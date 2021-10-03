import second from './ChatPreview/second.tmpl';

import styles from './Chats.module.css';

export default `
  {#each arr as arrVal #}
    ${second}
  {#each#}
  <p class=${styles.test}>{{ value }}</p>
`
