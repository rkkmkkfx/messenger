import HTTPTransport from './HTTPTransport';

const userAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

class UserAPI {
  getById = (id: number): Promise<XMLHttpRequest> => userAPIInstance.get(`/${id}`);

  update = (props: UserData) => userAPIInstance.put('/profile', props);

  find = (props: { login: string }) => userAPIInstance.post('/search', props);

  updateAvatar = () => userAPIInstance.put('/profile/avatar');

  newPassword = (data: Record<'oldPassword' | 'newPassword', string>) => userAPIInstance.put('/password', data);
}

const userAPI = new UserAPI();

export default userAPI;
