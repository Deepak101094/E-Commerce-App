import {
  REMOVE_ITEM_FROM_CART_INIT,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL
} from "../actionTypes";

const removeItemFromCart = (state = {}, action) => {
  const { type, item } = action;
  switch (type) {
    case REMOVE_ITEM_FROM_CART_INIT:
      return {
        ...state,
        type,
        item
      };
    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        type,
        item
      };
    case REMOVE_ITEM_FROM_CART_FAIL:
      return {
        ...state,
        type,
        item
      };
    default:
      return state;
  }
};
export default removeItemFromCart;
