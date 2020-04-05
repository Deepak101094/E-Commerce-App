import {
  CREATE_ORDER_INIT,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
} from "../actionTypes";

const createOrderReducer = (state = {}, action) => {
  const { type, order } = action;
  switch (type) {
    case CREATE_ORDER_INIT:
      return {
        ...state,
        type,
        order
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        type,
        order
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        type,
        order
      };
    default:
      return state;
  }
};
export default createOrderReducer;
