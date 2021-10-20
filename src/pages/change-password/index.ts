export { default } from './ChangePasswordPage';

export const props = {
  url: '',
  search: {
    name: 'search',
    label: 'Search',
    type: 'text',
    autocomplete: 'search',
  },
  inputs: [
    {
      name: 'oldPassword',
      label: 'Old password',
      type: 'password',
      autocomplete: 'password',
    },
    {
      name: 'newPassword',
      label: 'New password',
      type: 'password',
      autocomplete: 'new-password',
    },
    {
      name: 'newPassword',
      label: 'New password (yeah, again)',
      type: 'password',
      autocomplete: 'new-password',
    },
  ],
  buttons: [
    { label: 'Save changes', href: '/profile' },
    { label: 'Cancel', href: '/profile' },
  ],
};
