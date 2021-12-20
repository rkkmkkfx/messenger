import type { ChatInstance } from '../http';

const initialState: StoreState = {
  user: undefined,
  chats: [],
};

export type StoreState = {
  user?: UserData;
  chats?: ChatInstance[];
};

export default initialState;
