import {
  ADD_PRODUCT_INIT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL
} from "../actionTypes";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

export const addProduct = (reqBody, cb) => {
  return async dispatch => {
    dispatch({
      type: ADD_PRODUCT_INIT,
      addProduct: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.post("/add-product", reqBody);
      const product = _get(response, "data", {});
      console.log(product);
      let success = false;
      if (product && Array.isArray(product) && !_isEmpty(product)) {
        success = true;
      }
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        addProduct: {
          data: product,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "err.message", "something went wrong!");
      dispatch({
        type: ADD_PRODUCT_FAIL,
        addProduct: {
          data: {},
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
