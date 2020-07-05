import { FETCH_ORDER_INIT, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from "../actionTypes";
//? utility
import axios from "../../utility/axios/withHeader";
//?lodash
import _get from "lodash/get";

export const fetchOrder = () => {
   return async (dispatch) => {
      let orders = {
         data: [],
         isLoading: true,
         success: undefined,
         error: "",
      };
      dispatch({
         type: FETCH_ORDER_INIT,
         orders: { ...orders },
      });

      try {
         const response = await axios({
            method: "GET",
            url: "/orders",
            headers: {
               userid: localStorage.getItem("userId"),
            },
         });
         //  console.log(response.data.products);
         const data = _get(response, "data.products", []);
         let success = _get(response, "status", "") === 200 ? true : false;
         orders = {
            data,
            isLoading: false,
            success,
            error: "",
         };
         dispatch({
            type: FETCH_ORDER_SUCCESS,
            orders: { ...orders },
         });
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         orders = {
            data: [],
            isLoading: false,
            success: false,
            error,
         };
         dispatch({
            type: FETCH_ORDER_FAIL,
            orders: { ...orders },
         });
      }
   };
};
