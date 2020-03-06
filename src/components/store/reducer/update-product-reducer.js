import {
  UPDATE_PRODUCT_INIT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL
} from "../action/actionType";

const updateProductReducer = (state = {}, action) => {
  const { type, product } = action;
  switch (type) {
    case UPDATE_PRODUCT_INIT:
      return {
        ...state,
        type,
        product
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        product
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        type,
        product
      };
    default:
      return state;
  }
};

export default updateProductReducer;
