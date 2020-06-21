import {
   FETCH_CART_ITEMS_INIT,
   FETCH_CART_ITEMS_SUCCESS,
   FETCH_CART_ITEMS_FAIL,
   FETCH_CART_ITEMS_EMPTY
} from "../actionTypes";
//? utility
import axios from "../../utility/axios/withHeader";
//?lodash
import _get from "lodash/get";

export const fetchCartItems = (callback) => {
   return async (dispatch) => {
      let cartItems = {};
      cartItems = {
         data: [],
         isLoading: true,
         success: undefined,
         error: false,
      };
      dispatch({
         type: FETCH_CART_ITEMS_INIT,
         cartItems: { ...cartItems },
      });
      callback({...cartItems});
      try {
         const response = await axios.get("/fetch-cart-items");
         console.log(response.data);
         const data = _get(response, "data", []);
         let success = _get(response, "status", "") === 200 ? true : false;
         cartItems = {
            data,
            isLoading: false,
            success,
            error: false,
         };
         dispatch({
            type: FETCH_CART_ITEMS_SUCCESS,
            cartItems: { ...cartItems },
         });
         // dispatch({
         //    type: FETCH_CART_ITEMS_EMPTY,
         //    cartItems: {
         //       data: []
         //    }
         // });
         callback({...cartItems});
      } catch (err) {
         const error = _get(err, "response.data.message", "something error occurred!");
         cartItems = {
            data: [],
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: FETCH_CART_ITEMS_FAIL,
            cartItems: { ...cartItems },
         });
         callback({...cartItems});
      }
   };
};

// export const fetchCartItemEmpty = () => {
//    return {
//       type: FETCH_CART_ITEMS_EMPTY,
//       cartItems :{
//          data: [],
//       }
//    }
// }