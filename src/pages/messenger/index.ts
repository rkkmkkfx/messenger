import { ChatsPageProps } from './MessengerPage';

export { default } from './MessengerPage';
export type { ChatsPageProps } from './MessengerPage';

export const props: ChatsPageProps = {
  sidebar: {
    type: 'chats',
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
