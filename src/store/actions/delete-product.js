import {
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  FETCH_PRODUCTS_SUCCESS
} from "./actionType";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

export const deleteProduct = id => {
  return async dispatch => {
    dispatch({
      type: DELETE_PRODUCT_INIT,
      product: {
        data: {},
        isloading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.delete(`/product${id}`);
      const product = _get(response, "data", {});
      let success = false;
      if (product && Array.isArray(product) && !_isEmpty(product)) {
        success = true;
      }
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        product: {
          data: product,
          success,
          isloading: false,
          error: false
        }
      });
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        products: {
          data: products,
          isloading: false,
          success: true,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "response.err", "something went wrong");
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        product: {
          data: {},
          isloading: false,
          success: false,
          error
        }
      });
    }
  };
};
