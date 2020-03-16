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
      const response = await axios.post("/admin/add-product", reqBody);
      console.log(response.data);
      const data = _get(response, "data", {});
      // let success = false;
      // if (data && Array.isArray(data) && !_isEmpty(data)) {
      //   success = true;
      // }
      let success = _get(response, "status" , "") === 200 ? true: false;
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        addProduct: {
          data,
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