import type { ChatInstance } from '../api';

const initialState: StoreState = {
  user: undefined,
  chats: [],
};

export type StoreState = {
  user?: UserData;
  chats?: ChatInstance[];
};

export default initialState;
