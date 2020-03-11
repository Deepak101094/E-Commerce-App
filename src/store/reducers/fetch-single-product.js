import {
  FETCH_SINGLE_PRODUCT_INIT,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_FAIL
} from "../actionTypes";

const fetchSingleProduct = (state = {}, action) => {
  const { type, product } = action;
  switch (type) {
    case FETCH_SINGLE_PRODUCT_INIT:
      return {
        ...state,
        type,
        product
      };
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        product
      };
    case FETCH_SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        type,
        product
      };
    default:
      return state;
  }
};

export default fetchSingleProduct;
