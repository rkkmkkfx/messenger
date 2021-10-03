export default async () => {
  const result = await new Promise((resolve) => setTimeout(() => resolve({
    inputs: [
      { label: 'Login', type: 'text' },
      { label: 'Password', type: 'text' },
    ],
    buttons: [
      { label: 'Войти', type: 'submit' },
      { label: 'Зарегистрироваться' },
    ],
  }), 100));

  return result;
};
