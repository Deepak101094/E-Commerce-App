import {
  ADD_TO_CART_INIT,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL
} from "../actionTypes/index";
import axios from "../../utility/axios/axiosInstance";
//? lodash
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export const addToCartAction = productId => {
  return async dispatch => {
    dispatch({
      type: ADD_TO_CART_INIT,
      items: {
        data: [],
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.get(`/add-to-cart?productId=${productId}`);
      //console.log(response);
      const items = _get(response, "data.cart.items", []);
      //console.log(items);
      let success = false;
      if (items && Array.isArray(items) && !_isEmpty(items)) {
        success = true;
      }
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        items: {
          data: items,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "err.message", "some error occurred!");
      dispatch({
        type: ADD_TO_CART_FAIL,
         items: {
            data: [],
            isLoading: false,
            success:false,
            error 
       }
      });
    }
  };
};
