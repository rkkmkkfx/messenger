import parseJSX from '../../core/VirtualDOM';
import Component from '../../core/Component';

import Card from '../../components/Card';
import Form from '../../components/Form';
import type { FormProps } from '../../components/Form';

export type UserFormPageProps = {
  heading: string;
  formType: string;
};

const formsDef: Record<string, FormProps> = {
  signup: {
    inputs: [
      {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        autocomplete: 'email',
      },
      {
        name: 'login',
        placeholder: 'Username',
        type: 'text',
        autocomplete: 'username',
      },
      {
        name: 'first_name',
        placeholder: 'First Name',
        type: 'text',
        autocomplete: 'given-name',
      },
      {
        name: 'last_name',
        placeholder: 'Last Name',
        type: 'text',
        autocomplete: 'family-name',
      },
      {
        name: 'phone',
        placeholder: 'Phone Number',
        type: 'tel',
        autocomplete: 'tel',
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        autocomplete: 'new-password',
      },
      {
        name: 'password',
        placeholder: 'Password (yeah, again...)',
        type: 'password',
        autocomplete: 'new-password',
      },
    ],
    buttons: [
      { label: 'Sign Up', type: 'submit', variant: 'primary' },
      { label: 'Sign In', to: '/signin', variant: 'secondary' },
    ],
  },
  signin: {
    inputs: [
      {
        name: 'login',
        placeholder: 'Username',
        type: 'text',
        autocomplete: 'username',
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        autocomplete: 'password',
      },
    ],
    buttons: [
      { label: 'Sign In', variant: 'primary', type: 'submit' },
      { label: 'Sign Up', variant: 'secondary', to: '/signup' },
    ],
  },
};

export default class UserFormPage extends Component<UserFormPageProps> {
  submitHandler(event: Event): void {
    event.preventDefault();
    console.log(event);
  }

  render(): JSX.Element {
    const formDef = formsDef[this.props.formType];
    return (
      <Card heading={this.props.heading}>
        <Form {...formDef} onSubmit={this.submitHandler} />
      </Card>
    );
  }
}
