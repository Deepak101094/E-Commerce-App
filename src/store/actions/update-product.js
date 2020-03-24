import {
  UPDATE_PRODUCT_INIT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL
} from "../actionTypes";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";


export const updateProduct = (id, reqBody) => {
  return async dispatch => {
    dispatch({
      type: UPDATE_PRODUCT_INIT,
      product: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.put(`/admine/update-product${id}`, reqBody);
     // console.log(response)
      const product = _get(response, "data", []);
      let success = false;
      if (product && Array.isArray(product) && !_isEmpty(product)) {
        success = true;
      }
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        product: {
          data: product,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
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
