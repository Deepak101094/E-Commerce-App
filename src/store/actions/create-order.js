import {
  CREATE_ORDER_INIT,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../actionTypes";
//? utility
import axios from "../../utility/axios/withHeader";
//? lodash
import _get from "lodash/get";

export const createOrder = () => {
  return async (dispatch) => {
    let order = {
      data: [],
      isLoading: true,
      success: undefined,
      error: false,
    };
    dispatch({
      type: CREATE_ORDER_INIT,
      order: { ...order },
    });
    try {
      const response = await axios.get("/create-order");
      //console.log(response.data);
      const data = _get(response, "data.products", []);
      let success = _get(response, "status", "") === 200 ? true : false;
      order = {
        data,
        isLoading: false,
        success,
        error: false,
      };
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        order: { ...order },
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      order = {
        data: [],
        isLoading: false,
        success: false,
        error,
      };
      dispatch({
        type: CREATE_ORDER_FAIL,
        order: { ...order },
      });
    }
  };
};
