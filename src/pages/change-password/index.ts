export { default } from './ChangePasswordPage';

export const props = {
  url: '',
  sidebar: {
    type: 'form',
    userpic: 'https://i.pravatar.cc/72',
    search: {
      name: 'search',
      placeholder: 'Search',
      type: 'text',
      autocomplete: 'search',
    },
    form: {
      inputs: [
        {
          name: 'login',
          label: 'Username',
          type: 'text',
          autocomplete: 'username',
          hidden: true,
          value: 'username',
        },
        {
          name: 'oldPassword',
          placeholder: 'Old password',
          type: 'password',
          autocomplete: 'password',
        },
        {
          name: 'newPassword',
          placeholder: 'New password',
          type: 'password',
          autocomplete: 'new-password',
        },
        {
          name: 'newPassword',
          placeholder: 'New password (yeah, again)',
          type: 'password',
          autocomplete: 'new-password',
        },
      ],
      buttons: [
        { child: 'Save changes', type: 'submit', variant: 'primary' },
        { child: 'Cancel', to: '/profile', variant: 'secondary' },
      ],
    },
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
