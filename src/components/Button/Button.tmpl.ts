import * as styles from './Button.module.pcss';

export default (variant: string) => `
  <a class="${styles.root} ${styles[variant]}" href="{{to}}">
    <span>{{child}}</span>
  </a>
`;
