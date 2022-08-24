import {
  SET_USER,
  RESET_USER
} from '../actions/userAction';

const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...user
      };
    }
    case RESET_USER: {
      return {};
    }
    default:
      return state;
  }
};

export default userReducer;
