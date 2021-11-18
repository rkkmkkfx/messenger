import Input from '../components/Input';

type Constraint = Record<keyof ValidityState, string>;

export const constraints: Record<string, Partial<Constraint>> = {
  first_name: {
    patternMismatch: 'Pattern mismatch',
  },
  last_name: {
    patternMismatch: 'Pattern mismatch',
  },
  login: {
    patternMismatch: 'Login should contains at least one letter',
    tooShort: 'Too short',
    tooLong: 'Too long',
    valueMissing: 'This field is required',
  },
  email: {
    patternMismatch: 'Wrong email address',
    valueMissing: 'This field is required',
  },
  password: {
    patternMismatch: 'Password should contains at least one Uppercase letter and one digit',
    tooShort: 'Too short',
    tooLong: 'Too long',
    valueMissing: 'This field is required',
  },
  phone: {
    patternMismatch: 'Wrong phone number',
    tooShort: 'Too short',
    tooLong: 'Too long',
  },
  message: {
    valueMissing: 'This field is required',
  },
  search: {},
};

export function validate(this: Input, { currentTarget }: Event): void {
  console.log(currentTarget);
  const typedTarget = currentTarget as HTMLInputElement;
  const { name, validity } = typedTarget;
  if (name in constraints) {
    const rules = constraints[name];
    const errors = Object.entries(rules).map(([key, rule]) => {
      const typedKey = key as keyof ValidityState;
      if (validity[typedKey]) {
        return rule;
      }
      return '';
    }).filter((error) => error.length);

    typedTarget.setCustomValidity('Error');

    console.log(typedTarget.validity);

    this.setState({
      errors: ['Error'],
    });
  }
}
