import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actionTypes";
//lodash
import _get from "lodash/get";
import axios from "../../utility/axios/axiosInstance";

export const userSignUp = reqBody => {
  return async dispatch => {
    dispatch({
      type: SIGN_UP_INIT,
      reqBody: {
        data: {},
        isLoading: true,
        success: false,
        error: false
      }
    });
    try {
      const response = axios.post("/signup", reqBody);
      console.log(response)
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true:false
      dispatch({
        type: SIGN_UP_SUCCESS,
        reqBody: {
          data,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "err.message", "some error occurred!");
      dispatch({
        type: SIGN_UP_FAIL,
        reqBody: {
          data: {},
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
