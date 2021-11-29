import { Reducer } from '../Store';

const userReducers: Reducer<'chats'> = (state, action) => {
  switch (action.type) {
    case 'CHATS_LIST':
      return {
        ...state,
        list: action.payload,
      };
    case 'SET_ACTIVE_CHAT_ID':
      return {
        ...state,
        activeId: action.payload,
      };

    case 'STORE_MESSAGES': {
      console.log(state);
      if (typeof state !== 'undefined') {
        const { list, activeId } = state;
        const currentChat = list?.find(({ id }) => id === activeId);
        if (currentChat) {
          if (!currentChat.messages) currentChat.messages = [];
          currentChat.messages.push(...action.payload);
          currentChat.last_message = currentChat.messages[0];
        }
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default userReducers;
