export { default } from './EditProfile';

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
      name: 'email',
      label: 'Email',
      type: 'email',
      autocomplete: 'email',
      value: 'some@email.com',
    },
    {
      name: 'login',
      label: 'Username',
      type: 'text',
      autocomplete: 'username',
      value: 'username',
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      autocomplete: 'given-name',
      value: 'Ivan',
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      autocomplete: 'family-name',
      value: 'Ivanov',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      autocomplete: 'tel',
      value: '+1234567890',
    },
  ],
  buttons: [
    { label: 'Save changes', href: '/profile' },
    { label: 'Cancel', href: '/profile' },
  ],
};
