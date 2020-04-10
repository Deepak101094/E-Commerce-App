import {
  GET_ORDER_BY_ID_INT,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
} from "../actionTypes";
//? utitlity
import axios from "../../utility/axios/axiosInstance";
//?
import _get from "lodash/get";

export const getOrderById = (orderId) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ORDER_BY_ID_INT,
      order: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false,
      },
    });
    try {
      const response = await axios.get(`/get-order?id=${orderId}`);
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: GET_ORDER_BY_ID_SUCCESS,
        order: {
          data,
          isLoading: false,
          success,
          error: false,
        },
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: GET_ORDER_BY_ID_FAIL,
        order: {
          data: {},
          isLoading: false,
          success: false,
          error,
        },
      });
    }
  };
};
