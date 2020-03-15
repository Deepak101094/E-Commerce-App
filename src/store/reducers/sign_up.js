import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actionTypes";

const signUpReducer = (state = {}, action) => {
  const { type, reqBody } = action;
  switch (type) {
    case SIGN_UP_INIT:
      return {
        ...state,
        type,
        reqBody
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        type,
        reqBody
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        type,
        reqBody
      };
    default:
      return state;
  }
};
export default signUpReducer;
