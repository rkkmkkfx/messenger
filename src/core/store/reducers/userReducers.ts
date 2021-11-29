import { Reducer } from '../Store';

const userReducers: Reducer = (state, action) => {
  switch (action.type) {
    case 'STORE_USER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducers;
