import {
  SINGLE_PRODUCT_INIT,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL
} from "./actionType";
import axios from "../../../utility/axios/axiosInstance";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

export const singleProduct = id => {
  return async dispatch => {
    dispatch({
      type: SINGLE_PRODUCT_INIT,
      product: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.get(`/product${id}`);
      const product = _get(response, "data", {});
      let success = false;
      if (product && Array.isArray(product) && !_isEmpty(product)) {
        success = true;
      }
      dispatch({
        type: SINGLE_PRODUCT_SUCCESS,
        product: {
          data: product,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "err.message", "some error occurred!");
      dispatch({
        type: SINGLE_PRODUCT_FAIL,
        product: {
          data: {},
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
