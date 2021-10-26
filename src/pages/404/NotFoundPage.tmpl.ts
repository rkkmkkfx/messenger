import * as styles from './NotFoundPage.module.pcss';

export default `
  <div class="${styles.root}">
    <h1>{{ heading }}</h1>
    <img class="${styles.img}" src="{{url}}" />
    <div class="${styles.buttons}">
      {{ button }}
    </div>
  </div>
`;
