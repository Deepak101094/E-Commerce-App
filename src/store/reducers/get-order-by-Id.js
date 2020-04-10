import {
  GET_ORDER_BY_ID_INT,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
} from "../actionTypes";

const getOrderByIdReducer = (state= {}, action) => {
  const { type, order } = action;
  switch (type) {
    case GET_ORDER_BY_ID_INT:
      return {
        ...state,
        type,
        order,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        type,
        order,
      };
    case GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        type,
        order,
      };
    default:
      return state;
  }
};
export default getOrderByIdReducer;
