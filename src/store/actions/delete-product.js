import {
  DELETE_PRODUCT_INIT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from "../actionTypes/index";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";
//import _isEmpty from "lodash/isEmpty";

export const deleteProduct = _id => {
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
      const response = await axios.delete(`/admin/delete-product?_id=${_id}`);
      console.log(response.data.status);     
      const product = _get(response, "data.status", {});
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        product: {
          data: product,
          success: true,
          isloading: false,
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
