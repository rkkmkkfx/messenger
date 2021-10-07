export default async (): Promise<unknown> => {
  const res = await fetch('https://g.tenor.com/v1/gifs?ids=12136175&key=9FE9RGPBR01S');
  const { results } = await res.json();
  const { url } = results[0].media[0].gif;

  return {
    url,
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
};
