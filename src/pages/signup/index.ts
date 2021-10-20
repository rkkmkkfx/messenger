export { default } from './SignUpPage';

export const props = {
  heading: 'Create new user',
  inputs: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      autocomplete: 'email',
    },
    {
      name: 'login',
      label: 'Username',
      type: 'text',
      autocomplete: 'username',
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      autocomplete: 'given-name',
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      autocomplete: 'family-name',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      autocomplete: 'tel',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autocomplete: 'new-password',
    },
    {
      name: 'password',
      label: 'Password (yeah, again...)',
      type: 'password',
      autocomplete: 'new-password',
    },
  ],
  buttons: [
    { label: 'Sign Up', href: '/chats' },
    { label: 'Sign In', href: '/signin' },
  ],
};
