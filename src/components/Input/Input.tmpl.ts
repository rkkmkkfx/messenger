import * as styles from './Input.module.pcss';

export default `
  <div class="${styles.root}">
    <input
     name="{{input.name}}"
     class="${styles.input}"
     type="{{input.type}}"
     placeholder="{{input.label}}"
     autocomplete="{{input.autocomplete}}"
     value="{{input.value}}"
   >
  </div>
`;
