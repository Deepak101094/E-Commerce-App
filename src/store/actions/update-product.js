import {
   UPDATE_PRODUCT_INIT,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   PRODUCT_TO_EDIT,
} from "../actionTypes";
import axios from "../../utility/axios/withHeader";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

export const updateProduct = (reqBody, cbfunc) => {
   return async (dispatch) => {
      dispatch({
         type: UPDATE_PRODUCT_INIT,
         product: {
            data: {},
            isLoading: true,
            success: false,
            error: "",
         },
      });
      try {
         const response = await axios.post("/admin/update-product", reqBody);
         const data = _get(response, "data", {});
         let success = _get(response, "status", "") === 200 ? true : false;
         dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            product: {
               data,
               isLoading: false,
               success,
               error: "",
            },
         });
         cbfunc();
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         dispatch({
            type: UPDATE_PRODUCT_FAIL,
            product: {
               data: {},
               isLoading: false,
               success: false,
               error,
            },
         });
      }
   };
};

export const saveProductToEdit = (productDetail) => {
   return {
      type: PRODUCT_TO_EDIT,
      payload: {
         ...productDetail,
      },
   };
};
