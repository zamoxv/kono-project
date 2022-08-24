export const SET_USER = '@user/set-user';
export const RESET_USER = '@user/reset-user';

export const resetUser = () => {
  return (dispatch) => dispatch({
    type: RESET_USER
  });
}

export const setUser = (user) => {
  return (dispatch) => dispatch({
    type: SET_USER,
    payload: {
      user
    }
  });
}

export const logout = () => {
  return (dispatch) => dispatch({
    type: SET_USER,
    payload: {
      user: null
    }
  });
}