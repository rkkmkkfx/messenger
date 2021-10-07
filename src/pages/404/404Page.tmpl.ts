import Paper from '../../modules/Paper';
import * as styles from './404Page.module.pcss';

export default Paper({
  title: 'Ooups! It\'s 404',
  children: `<img class=${styles.img} src="{{url}}">`,
  withButtons: true,
});
