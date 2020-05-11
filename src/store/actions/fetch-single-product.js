import {
  GET_ORDER_BY_ID_INT,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
} from "../actionTypes";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_BY_ID_INT,
      product: {
        data: {},
        isLoading: true,
        success: false,
        error: "",
      },
    });
    try {
      const response = await axios.get(`/admin/product?id=${id}`);
     // console.log(response.data);
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: GET_ORDER_BY_ID_SUCCESS,
        product: {
          data,
          isLoading: false,
          success,
          error: "",
        },
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "something went wrong");
      dispatch({
        type: GET_ORDER_BY_ID_FAIL,
        product: {
          data: {},
          isLoading: false,
          success: false,
          error,
        },
      });
    }
  };
};
