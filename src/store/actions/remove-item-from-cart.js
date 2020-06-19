import {
  REMOVE_ITEM_FROM_CART_INIT,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL,
} from "../actionTypes";
//?utility
import axios from "../../utility/axios/withHeader";
//? lodash
import _get from "lodash/get";

export const removeItemFromCart = (itemId, cbfunc) => {
  return async (dispatch) => {
    let removeResponse = {
      isloading: true,
      success: undefined,
      error: false,
    };
    dispatch({
      type: REMOVE_ITEM_FROM_CART_INIT,
      removeResponse,
    });
    cbfunc({...removeResponse});
    try {
      const response = await axios.get(`/remove-item-from-cart?id=${itemId}`);
      const success = _get(response, "status", "") === 200 ? true : false;
      removeResponse = {
        isloading: false,
        success,
        error: false,
      };
      dispatch({
        type: REMOVE_ITEM_FROM_CART_SUCCESS,
        removeResponse,
      });
      cbfunc({...removeResponse});
    } catch (err) {
      const error = _get(err, "response.data.message", "something went wrong");
      removeResponse = {
        isloading: false,
        success: false,
        error,
      };
      dispatch({
        type: REMOVE_ITEM_FROM_CART_FAIL,
        removeResponse,
      });
      cbfunc({...removeResponse});
    }
  };
};
