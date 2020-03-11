import {
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  FETCH_PRODUCTS_SUCCESS
} from "../action/actionType";

const deleteReducer = (state = {}, action) => {
  const { type, product, products } = action;
  switch (type) {
    case DELETE_PRODUCT_INIT:
      return {
        ...state,
        type,
        product
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        product
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        type,
        products
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        type,
        product
      };
    default:
      return state;
  }
};

export default deleteReducer;
