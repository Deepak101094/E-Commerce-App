import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";
import axios from "../../utility/axios/withoutHeader";
//import from lodash
import _get from "lodash/get";

export const loginUser = (reqBody, cbFunc) => {
   return async (dispatch) => {
      dispatch({
         type: LOGIN_INIT,
         logInRes: {
            data: {},
            isLoading: true,
            success: null,
            error: false,
         },
      });
      try {
         const response = await axios.post("/admin/login", reqBody);
         const data = _get(response, "data", {});
         let success = _get(response, "status", "") === 200 ? true : false;
         localStorage.setItem("userId", data?.userId ?? "");
         localStorage.setItem("userType", data?.userType ?? "");
         dispatch({
            type: LOGIN_SUCCESS,
            logInRes: {
               data,
               isLoading: false,
               success,
               error: false,
            },
         });
         cbFunc();
      } catch (err) {
         const error = _get(err, "response.data.message", "some error occurred!");
         dispatch({
            type: LOGIN_FAIL,
            logInRes: {
               data: {},
               isLoading: false,
               success: false,
               error,
            },
         });
      }
   };
};
