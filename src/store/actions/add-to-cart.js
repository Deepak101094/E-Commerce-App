import {
  ADD_TO_CART_INIT,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL
} from "../actionTypes/index";
//? utility
import axios from "../../utility/axios/axiosInstance";
//? lodash
import _get from 'lodash/get';
//import _isEmpty from 'lodash/isEmpty';

export const addToCartAction = productId => {
  return async dispatch => {
    dispatch({
      type: ADD_TO_CART_INIT,
      item: {
        data: {},
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await axios.get(`/add-to-cart?id=${productId}`);
      console.log(response);
      const item = _get(response, "data.cart.items", {});
      // if (item && Array.isArray(item) && !_isEmpty(item)) {
      //   success = true;
      // }
     let success = _get(response , "status", "") === 200 ? true: false
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        item: {
          data: item,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: ADD_TO_CART_FAIL,
         item: {
            data: {},
            isLoading: false,
            success:false,
            error 
       }
      });
    }
  };
};
