import {
  CREATE_ORDER_INIT,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
} from "../actionTypes";

const createOrderReducer = (state = {}, action) => {
  const { type, Order } = action;
  switch (type) {
    case CREATE_ORDER_INIT:
      return {
        ...state,
        type,
        Order
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        type,
        Order
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        type,
        Order
      };
    default:
      return state;
  }
};
export default createOrderReducer;
