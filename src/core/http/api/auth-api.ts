import HTTPTransport from '../HTTPTransport';

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI {
  signup(props: UserData) {
    return authAPIInstance.post('/signup', props);
  }

  signin(props: Record<'login' | 'password', string>) {
    return authAPIInstance.post('/signin', props);
  }

  user() {
    return authAPIInstance.get('/user').then((data) => {
      if (data.status !== 200) {
        const error = JSON.parse(data.response);
        const errorMessage = `Error: ${error.reason}`;
        throw new Error(errorMessage);
      }
      return JSON.parse(data.response);
    });
  }

  signout() {
    return authAPIInstance.post('/logout', {});
  }
}

const authAPI = new AuthAPI();

export default authAPI;
