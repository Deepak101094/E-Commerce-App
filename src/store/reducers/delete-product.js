import {
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../actionTypes";

const deleteProductReducer = (state = {}, action) => {
  const { type, product } = action;
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

export default deleteProductReducer;
