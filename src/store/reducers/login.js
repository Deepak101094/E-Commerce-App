import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";

const loginReducer = (state = {}, action) => {
  const { type, reqBody } = action;
  switch (type) {
    case LOGIN_INIT:
      return {
        ...state,
        type,
        reqBody
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        type,
        reqBody
      };
    case LOGIN_FAIL:
      return {
        ...state,
        type,
        reqBody
      };
    default:
      return state;
  }
};

export default loginReducer;
