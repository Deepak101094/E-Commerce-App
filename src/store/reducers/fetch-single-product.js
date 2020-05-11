import {
  GET_ORDER_BY_ID_INT,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
} from "../actionTypes";

const fetchSingleProduct = (state = {}, action) => {
  const { type, product } = action;
  switch (type) {
    case GET_ORDER_BY_ID_INT:
      return {
        ...state,
        type,
        product,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        type,
        product,
      };
    case GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        type,
        product,
      };
    default:
      return state;
  }
};
export default fetchSingleProduct;
