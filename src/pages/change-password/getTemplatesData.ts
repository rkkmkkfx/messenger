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
};
