import * as styles from './Paper.module.pcss';

export default `
  <form class=${styles.root}>
    <h1 class=${styles.title}>{{heading}}</h1>
    {{children}}
  </form>
`;
