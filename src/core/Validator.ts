type Rule = {
  pattern: RegExp;
  errorMessage: string;
};

export const constraints: Record<string, Rule> = {
  first_name: {
    pattern: /[\u0400-\u04FFa-z-]+/gi,
    errorMessage: 'Pattern mismatch',
  },
  last_name: {
    pattern: /[\u0400-\u04FFa-z-]+/gi,
    errorMessage: 'Pattern mismatch',
  },
  login: {
    pattern: /^.*(?=.{3,20})(?=.*[a-z])\w+$/gi,
    errorMessage: 'Login should contains at least one letter',
  },
  email: {
    pattern: /^[a-z]+\w+[a-z-]+@([\w-]+\.)+[a-z]{2,4}$/gi,
    errorMessage: 'Wrong email address',
  },
  password: {
    pattern: /^(?=^.{8,40}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g,
    errorMessage: 'Password should contains at least one Uppercase letter and one digit',
  },
  phone: {
    pattern: /\+?\d{10,15}/g,
    errorMessage: 'Wrong phone number',
  },
  message: {
    pattern: /.+/gm,
    errorMessage: 'This field is required',
  },
};

export function validate({ type: eventType, target }: Event): ValidityState {
  const typedTarget = target as HTMLInputElement;
  if (typedTarget.name in constraints) {
    const rule = constraints[typedTarget.name];
    const constraint = new RegExp(rule.pattern);
    const valid = constraint.test(typedTarget.value);
    if (!valid) {
      typedTarget.setCustomValidity(rule.errorMessage);
    } else {
      typedTarget.setCustomValidity('');
    }
    if (eventType === 'submit') {
      typedTarget.reportValidity();
    } else {
      typedTarget.checkValidity();
    }
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
