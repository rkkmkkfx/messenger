export { default } from './NotFoundPage';

export const props = {
  url: '',
  heading: 'Ooups! It\'s 404',
  button: { child: 'Back to the App', to: '/', variant: 'primary' },
};
