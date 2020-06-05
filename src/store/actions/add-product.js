import {
  ADD_PRODUCT_INIT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
} from "../actionTypes";
import axios from "../../utility/axios/withHeader";
import _get from "lodash/get";
//import _isEmpty from "lodash/isEmpty";

export const addProduct = (reqBody, cb) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_INIT,
      addProduct: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false,
      },
    });
    try {
      const response = await axios.post("/admin/add-product", reqBody);
      console.log(response.data);
      const data = _get(response, "data", {});

      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        addProduct: {
          data,
          isLoading: false,
          success,
          error: false,
        },
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "something went wrong!");
      dispatch({
        type: ADD_PRODUCT_FAIL,
        addProduct: {
          data: {},
          isLoading: false,
          success: false,
          error,
        },
      });
    }
  };
};
