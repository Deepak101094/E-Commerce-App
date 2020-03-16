import {
  FETCH_PRODUCTS_INIT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from "../actionTypes";

const fetchProductsReducer = (state = {}, action) => {
  const { type, products } = action;
  switch (type) {
    case FETCH_PRODUCTS_INIT:
      return {
        ...state,
        type,
        products
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        type,
        products
      };
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        type,
        products
      };
    default:
      return state;
  }
};
export default fetchProductsReducer;