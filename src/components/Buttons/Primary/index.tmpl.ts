import styles from './ButtonPrimary.module.pcss';

export default `
  <button class=${styles.root} onclick="{{button.clickHandler}}">
    <span>{{button.label}}</span>
  </button>
`;
