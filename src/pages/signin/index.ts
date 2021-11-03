export { default } from './SignInPage';

export const props = {
  heading: 'Sign In',
  form: {
    inputs: [
      {
        name: 'login',
        placeholder: 'Username',
        type: 'text',
        autocomplete: 'username',
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        autocomplete: 'password',
      },
    ],
    buttons: [
      { child: 'Sign In', variant: 'primary', type: 'submit' },
      { child: 'Sign Up', variant: 'secondary', to: '/signup' },
    ],
  },
};
