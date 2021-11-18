import type { ChatPreviewProps } from '../../components/Sidebar/ChatPreview';
import type {CurrentChat} from '../../components/Chat/Chat';

const initialState: StoreState = {
};

export type StoreState = {
  user?: UserData;
  chats?: ChatPreviewProps[];
  chat?: CurrentChat;
  [key: string]: any;
};

export default initialState;
