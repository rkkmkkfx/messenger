import styles from './Input.module.pcss';

export default `
  <div class=${styles.root}>
    <input class=${styles.input} type="{{input.type}}" placeholder="{{input.label}}">
  </div>
`;
