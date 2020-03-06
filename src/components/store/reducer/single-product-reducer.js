import {
  SINGLE_PRODUCT_INIT,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL
} from "../action/actionType";

const singleProduct = (state = {}, action) => {
  const { type, product } = action;
  switch (type) {
    case SINGLE_PRODUCT_INIT:
      return {
        ...state,
        type,
        product
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        product
      };
    case SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        type,
        product
      };
    default:
      return state;
  }
};

export default singleProduct;
