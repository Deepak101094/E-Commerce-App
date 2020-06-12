import {
   DELETE_PRODUCT_INIT,
   DELETE_PRODUCT_SUCCESS,
   DELETE_PRODUCT_FAIL,
} from "../actionTypes/index";
import axios from "../../utility/axios/withHeader";
import _get from "lodash/get";
//import _isEmpty from "lodash/isEmpty";

export const deleteProduct = (productId, cb) => {
   return async (dispatch) => {
      let deleteResponse = {
         isloading: true,
         success: undefined,
         error: false,
      };
      dispatch({
         type: DELETE_PRODUCT_INIT,
         deleteResponse,
      });
      cb({ ...deleteResponse });
      try {
         const response = await axios.get(`/admin/delete-product?id=${productId}`);
         const status = _get(response, "status", 0);
         deleteResponse = {
            isloading: false,
            success: status === 200,
            error: false,
         };
         dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            deleteResponse,
         });
         cb({ ...deleteResponse });
      } catch (err) {
         const error = _get(err, "response.data.message", "something went wrong");
         deleteResponse = {
            isloading: false,
            success: false,
            error,
         };
         dispatch({
            type: DELETE_PRODUCT_FAIL,
            deleteResponse,
         });
         cb({ ...deleteResponse });
      }
   };
};
