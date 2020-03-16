import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actionTypes";
import axios from "../../utility/axios/axiosInstance";
//import from lodash
import _get from "lodash/get";

export const loginUser = reqBody => {
  return async dispatch => {
    dispatch({
      type: LOGIN_INIT,
      reqBody: {
        data: {},
        isLoading: true,
        success: false,
        error: false
      }
    });
    try {
      const response = await axios.post("/admin/login", reqBody);
      console.log(response.data);
      const data = _get(response, "data", {});
      let success = _get(response, "status" , "") === 200 ? true : false
      dispatch({
        type: LOGIN_SUCCESS,
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
        type: LOGIN_FAIL,
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