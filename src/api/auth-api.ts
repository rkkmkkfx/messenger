import HTTPTransport, { BaseAPI } from '../core/http';

const authAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

class AuthAPI extends BaseAPI {
  signup(props) {
    return authAPIInstance.post('/signup', props);
  }

  signin(props) {
    return authAPIInstance.post('/signin', props);
  }

  user() {
    return authAPIInstance.get('/user');
  }

  signout() {
    return authAPIInstance.post('/logout', {});
  }
}

const auth = new AuthAPI();

export default auth;
