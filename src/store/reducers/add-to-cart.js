import {
  ADD_TO_CART_INIT,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL
} from "../actionTypes";

const addToCartReducer = (state = {}, action) => {
  const { type, items } = action;
  switch (type) {
    case ADD_TO_CART_INIT:
      return {
        ...state,
        type,
        items
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        type,
        items
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        type,
        items
      };
    default:
      return state;
  }
};
export default addToCartReducer;
