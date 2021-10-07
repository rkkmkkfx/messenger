import * as styles from './ButtonPrimary.module.pcss';

export default `
  <a class="${styles.root}" href="{{button.href}}" onclick="{{button.clickHandler}}">
    <span>{{button.label}}</span>
  </a>
`;
