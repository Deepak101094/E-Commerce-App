import {
  CREATE_ORDER_INIT,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
} from "../actionTypes";
//? utility
import axios from "../../utility/axios/axiosInstance";
//? lodash
import _get from "lodash/get";

export const createOrder = () => {
  return async dispatch => {
    dispatch({
      type: CREATE_ORDER_INIT,
      Order: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.get("/create-order");
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        Order: {
          data,
          isLoading: false,
          success,
          error
        }
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: CREATE_ORDER_FAIL,
        Order: {
          data: {},
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
