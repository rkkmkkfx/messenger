type Constraint = Record<keyof ValidityState, string>;

export const constraints: Record<string, Partial<Constraint>> = {
  first_name: {
    patternMismatch: 'Pattern mismatch',
  },
  second_name: {
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

export function validate({ currentTarget }: Event): string[] {
  const typedTarget = currentTarget as HTMLInputElement;
  const { name, validity } = typedTarget;
  const constraintName = name.toLowerCase().includes('password') ? 'password' : name;
  if (constraintName in constraints) {
    const rules = constraints[constraintName];
    const errors = Object.entries(rules).map(([key, rule]) => {
      const typedKey = key as keyof ValidityState;
      if (validity[typedKey]) {
        return rule;
      }
      return '';
    }).filter((error) => error.length);

    return errors;
  }
  return [];
}
