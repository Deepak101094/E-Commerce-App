import {
  ADD_PRODUCT_INIT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL
} from "../actionTypes";

const addProductReducer = (state = {}, action) => {
  const { type, addProduct } = action;
  switch (type) {
    case ADD_PRODUCT_INIT:
      return {
        ...state,
        type,
        addProduct
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        type,
        addProduct
      };
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        type,
        addProduct
      };
    default:
      return state;
  }
};

export default addProductReducer;
