import type { Reducer } from '../Store';

const userReducers: Reducer<'chats'> = (state, action) => {
  switch (action.type) {
    case 'CHATS_LIST':
      return action.payload;

    case 'UPDATE_CHAT': {
      if (state) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        if (index >= 0) {
          const nextState = [...state];
          nextState[index] = action.payload;
          return [...nextState];
        }
      }
      return state;
    }
    default:
      return state;
  }
};

export default userReducers;
