export { default } from './ChatsPage';

export const props = {
  url: '',
  sidebar: {
    type: 'chats',
    userpic: 'https://i.pravatar.cc/72',
    search: {
      name: 'search',
      placeholder: 'Search',
      type: 'text',
      autocomplete: 'search',
    },
    chats: [
      {
        id: 123,
        title: 'my-chat',
        avatar: 'https://i.pravatar.cc/48?u=username',
        unread_count: 15,
        last_message: {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: '/path/to/avatar.jpg',
            email: 'my@email.com',
            login: 'username',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      },
      {
        id: 234,
        title: 'my-chat',
        avatar: 'https://i.pravatar.cc/48?u=userLogin',
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
  },
  chat: {
    header: {
      chatName: 'Petya Pupkin',
    },
    controls: {
      messageInput: {
        name: 'message',
        placeholder: 'Message',
        type: 'text',
        autocomplete: 'off',
      },
    },
    data: {
      id: 234,
      title: 'my-chat',
      avatar: 'https://i.pravatar.cc/48?u=userLogin',
      unread_count: 15,
      messages: [
        {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: 'https://i.pravatar.cc/48?u=username',
            email: 'my@email.com',
            login: 'username',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'Hi',
        },
        {
          user: {
            first_name: 'Petya',
            second_name: 'Pupkin',
            avatar: 'https://i.pravatar.cc/48?u=userLogin',
            email: 'my@email.com',
            login: 'userLogin',
            phone: '8(911)-222-33-22',
          },
          time: '2020-01-02T14:22:22.000Z',
          content: 'this is message content',
        },
      ],
    },
  },
};
