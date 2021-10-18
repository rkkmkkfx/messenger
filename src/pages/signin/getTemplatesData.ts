export default async (): Promise<unknown> => ({
  heading: 'Sign In',
  inputs: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      autocomplete: 'username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autocomplete: 'password',
    },
  ],
  buttons: [
    { label: 'Sign In', href: '/chats' },
    { label: 'Sign Up', href: '/signup' },
  ],
});
