import {
  FETCH_CART_ITEMS_INIT,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAIL
} from "../actionTypes";
//? utility
import axios from "../../utility/axios/axiosInstance";
//?lodash
import _get from "lodash/get";

export const fetchCartItems = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_CART_ITEMS_INIT,
      cartItems: {
        data: [],
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.get("/fetch-cart-items");
      console.log(response);
      const items = _get(response, "data.item", []);
      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: FETCH_CART_ITEMS_SUCCESS,
        cartItems: {
          data: items,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: FETCH_CART_ITEMS_FAIL,
        cartItems: {
          data: [],
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
