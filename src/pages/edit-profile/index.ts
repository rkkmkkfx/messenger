export { default } from './EditProfilePage';

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
        { child: 'Save', type: 'submit', variant: 'primary' },
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
