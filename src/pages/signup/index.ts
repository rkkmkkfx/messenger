export { default } from './SignUpPage';

export const props = {
  heading: 'Create new user',
  form: {
    inputs: [
      {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        autocomplete: 'email',
      },
      {
        name: 'login',
        placeholder: 'Username',
        type: 'text',
        autocomplete: 'username',
      },
      {
        name: 'first_name',
        placeholder: 'First Name',
        type: 'text',
        autocomplete: 'given-name',
      },
      {
        name: 'last_name',
        placeholder: 'Last Name',
        type: 'text',
        autocomplete: 'family-name',
      },
      {
        name: 'phone',
        placeholder: 'Phone Number',
        type: 'tel',
        autocomplete: 'tel',
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        autocomplete: 'new-password',
      },
      {
        name: 'password',
        placeholder: 'Password (yeah, again...)',
        type: 'password',
        autocomplete: 'new-password',
      },
    ],
    buttons: [
      { child: 'Sign Up', type: 'submit', variant: 'primary' },
      { child: 'Sign In', to: '/signin', variant: 'secondary' },
    ],
  },
};
