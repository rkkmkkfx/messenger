import * as styles from './NotFoundPage.module.pcss';

export default `
  {#block Paper #}
    <img class=${styles.img} src="{{url}}">
    <div class=${styles.buttons}>
      {#with buttons.0 as button #}
        {#include ButtonPrimary #}
      {#with#}
      {#with buttons.1 as button #}
        {#include ButtonSecondary #}
      {#with#}
    </div>
  {#block#}
`;
