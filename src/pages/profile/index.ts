export { default } from './ProfilePage';

export const props = {
  url: '',
  search: {
    name: 'search',
    label: 'Search',
    type: 'text',
    autocomplete: 'search',
  },
  fields: [
    {
      label: 'Email',
      value: 'some@email.com',
    },
    {
      label: 'Username',
      value: 'username',
    },
    {
      label: 'First Name',
      value: 'Ivan',
    },
    {
      label: 'Last Name',
      value: 'Ivanov',
    },
    {
      label: 'Phone Number',
      value: '+1234567890',
    },
  ],
  buttons: [
    { label: 'Edit profile', href: '/edit-profile' },
    { label: 'Change password', href: '/change-password' },
  ],
};
