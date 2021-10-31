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
    chats: [
      {
        id: 123,
        title: 'my-chat',
        avatar: '/static/uploads/avatar1.jpg',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
    ],
  };
};