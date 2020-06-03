import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";

const loginReducer = (state = {}, action) => {
  const { type, loginData } = action;
  switch (type) {
    case LOGIN_INIT:
      return {
        ...state,
        type,
        loginData
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        type,
        loginData
      };
    case LOGIN_FAIL:
      return {
        ...state,
        type,
        loginData
      };
    default:
      return state;
  }
};

export default loginReducer;
