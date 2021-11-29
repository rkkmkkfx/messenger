import type { ChatData } from '../../components/Chat/Chat';

const initialState: StoreState = {
  user: undefined,
  chats: {
    activeId: undefined,
    list: [],
  },
};

type ChatsState = {
  activeId?: number;
  list?: ChatData[];
};

export type StoreState = {
  user?: UserData;
  chats?: ChatsState;
};

export default initialState;
