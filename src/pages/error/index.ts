export { default } from './ErrorPage';

export const props = {
  url: '',
  heading: 'Internal Error',
  button: { child: 'Back to the App', to: '/', variant: 'primary' },
};
