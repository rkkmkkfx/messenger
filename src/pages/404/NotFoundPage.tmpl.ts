import * as styles from './NotFoundPage.module.pcss';

export default `
  <div class="${styles.root}">
    <h1 class="${styles.title}">{{ heading }}</h1>
    <img class=${styles.img} src="{{url}}" alt="">
    <div class=${styles.buttons}>
      {{ button }}
    </div>
  </div>
`;
