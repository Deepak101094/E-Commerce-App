import {
  REMOVE_ITEM_FROM_CART_INIT,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAIL
} from "../actionTypes";
//?utility
import axios from "../../utility/axios/axiosInstance";
//? lodash
import _get from "lodash/get";

export const removeItemFromCart = itemId => {
  return async dispatch => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART_INIT,
      item: {
        data: {},
        isLoading: true,
        success: false,
        error: false
      }
    });
    try {
      const response = await axios.get(`/remove-item-from-cart?id=${itemId}`);
      console.log(response);
      const item = _get(response, "data", {});
      dispatch({
        type: REMOVE_ITEM_FROM_CART_SUCCESS,
        item: {
          data: item,
          isLoading: false,
          success: true,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: REMOVE_ITEM_FROM_CART_FAIL,
        item: {
          data: {},
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
