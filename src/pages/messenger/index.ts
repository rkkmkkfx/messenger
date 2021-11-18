import { ChatsPageProps } from './MessengerPage';

export { default } from './MessengerPage';
export type { ChatsPageProps } from './MessengerPage';

export const props: ChatsPageProps = {
  sidebar: {
    type: 'chats',
  },
  chat: {
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
  profile: {
    id: 123,
    first_name: 'Petya',
    second_name: 'Pupkin',
    display_name: 'Petya Pupkin',
    login: 'userLogin',
    email: 'my@email.com',
    phone: '89223332211',
    avatar: 'https://i.pravatar.cc/72',
  },
};
