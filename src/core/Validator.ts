type Rule = {
  value: string | number;
  errorMessage: string;
};

type Constraint = Record<string, Rule | string>;

export const constraints: Record<string, Constraint> = {
  first_name: {
    pattern: {
      value: '[а-яА-Яa-zA-Z-]+',
      errorMessage: 'Pattern mismatch',
    },
  },
  last_name: {
    pattern: {
      value: '[а-яА-Яa-zA-Z]+',
      errorMessage: 'Pattern mismatch',
    },
  },
  login: {
    pattern: {
      value: '^.*(?=.*)(?=.*[a-z])\\w+$',
      errorMessage: 'Login should contains at least one letter',
    },
    minLength: {
      value: 3,
      errorMessage: 'Too short',
    },
    maxLength: {
      value: 20,
      errorMessage: 'Too long',
    },
    required: 'This field is required',
  },
  email: {
    pattern: {
      value: '^[a-z]+\\w+[a-z-]+@([\\w-]+\\.)+[a-z]{2,4}$',
      errorMessage: 'Wrong email address',
    },
    required: 'This field is required',
  },
  password: {
    pattern: {
      value: '^(?=^.*$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$',
      errorMessage: 'Password should contains at least one Uppercase letter and one digit',
    },
    minLength: {
      value: 8,
      errorMessage: 'Too short',
    },
    maxLength: {
      value: 40,
      errorMessage: 'Too long',
    },
    required: 'This field is required',
  },
  phone: {
    pattern: {
      value: '\\+?\\d*',
      errorMessage: 'Wrong phone number',
    },
    minLength: {
      value: 10,
      errorMessage: 'Too short',
    },
    maxLength: {
      value: 15,
      errorMessage: 'Too long',
    },
  },
  message: {
    required: 'This field is required',
  },
};

export function setValidationProps(name: string): Record<string, string | boolean | number | RegExp> {
  const constraint = constraints[name];
  return Object.entries(constraint)
    .reduce<Record<string, string | boolean | number | RegExp>>((acc, [key, rule]) => {
      if (typeof rule === 'string') {
        acc[key] = true;
      } else {
        acc[key] = rule.value;
      }
      return acc;
    }, {});
}

export function validate({ target }: Event): ValidityState {
  const typedTarget = target as HTMLInputElement;
  if (typedTarget.name in constraints) {
    const rules = constraints[typedTarget.name];
    Object.entries(rules).forEach(([key, rule]) => {
      let value;
      let errorMessage;
      if (typeof rule === 'string') {
        value = true;
        errorMessage = rule;
      } else {
        value = rule.value;
        errorMessage = rule.errorMessage;
      }
    });
    // console.log(typedTarget.validity);
    // const constraint = new RegExp(rule.pattern);
    // const valid = constraint.test(typedTarget.value);
    // if (!valid) {
    //   typedTarget.setCustomValidity(rule.errorMessage);
    // } else {
    //   typedTarget.setCustomValidity('');
    // }
  }

  return typedTarget.validity;
}

export default function validateForm(form: HTMLFormElement, cb: () => void): void {
  const validity = [];
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements.item(i);
    if (element?.tagName === 'INPUT') {
      validity.push(validate({ target: element } as unknown as Event).valid);
    }
  }

  if (!validity.some(() => false)) {
    cb();
  }
}
