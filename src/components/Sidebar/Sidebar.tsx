import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import Input from '../Input';
import Form from '../Form';
import ChatPreview from './ChatPreview';
import ProfileView from '../ProfileView';

import type { FormProps } from '../Form';
import type { ChatPreviewProps } from './ChatPreview';

import * as styles from './Sidebar.module.pcss';

export type SidebarProps = {
  type: string;
  profile?: UserData;
  form?: FormProps;
  chats?: ChatPreviewProps[];
};

const userFormDef: FormProps = {
  inputs: [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      autocomplete: 'email',
      value: 'some@email.com',
    },
    {
      name: 'login',
      placeholder: 'Username',
      type: 'text',
      autocomplete: 'username',
      value: 'username',
    },
    {
      name: 'first_name',
      placeholder: 'First Name',
      type: 'text',
      autocomplete: 'given-name',
      value: 'Ivan',
    },
    {
      name: 'last_name',
      placeholder: 'Last Name',
      type: 'text',
      autocomplete: 'family-name',
      value: 'Ivanov',
    },
    {
      name: 'phone',
      placeholder: 'Phone Number',
      type: 'tel',
      autocomplete: 'tel',
      value: '+1234567890',
    },
  ],
  buttons: [
    { label: 'Save', type: 'submit', variant: 'primary' },
    { label: 'Cancel', to: '/profile', variant: 'secondary' },
  ],
};

export default class Sidebar extends Component<SidebarProps> {
  constructor(props: SidebarProps, children: JSX.Element[]) {
    super({
      ...props,

    }, children);
  }

  getContent(): JSX.Element | JSX.Element[] {
    switch (this.props.type) {
      case 'chats':
        return this.props.chats?.map((chat: ChatPreviewProps) => <ChatPreview {...chat} />) ?? <></>;
      case 'profile':
        return <ProfileView {...this.props.profile!} />;
      case 'edit-profile':
        return <Form {...userFormDef} />;
      default:
        return <></>;
    }
  }

  render(): JSX.Element {
    return (
      <aside className={styles.root}>
        <div className={styles.user}>
          <a href="/profile" className={styles.avatar}>
            <img src={this.props.profile?.avatar} alt="" />
          </a>
        </div>
        <Input name="search" placeholder="Search" type="text" autocomplete="search" />
        {this.getContent()}
      </aside>
    );
  }
}
