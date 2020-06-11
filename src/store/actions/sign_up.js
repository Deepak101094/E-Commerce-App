import { SIGN_UP_INIT, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actionTypes";
//lodash
import _get from "lodash/get";
import axios from "../../utility/axios/withoutHeader";

export const userSignUp = (reqBody,cbfunc) => {
  reqBody = {
    ...reqBody,
    userType: Number(reqBody.userType),
  };
  return async (dispatch) => {
    dispatch({
      type: SIGN_UP_INIT,
      reqBody: {
        data: {},
        isLoading: true,
        success: false,
        error: false,
      },
    });
    try {
      const response = await axios.post("/signup", reqBody);
      console.log(response.data);
      const data = _get(response, "data", {});
      let success = _get(response, "status", "") === 200 ? true : false;
      dispatch({
        type: SIGN_UP_SUCCESS,
        reqBody: {
          data,
          isLoading: false,
          success,
          error: false,
        },
      });
      cbfunc();
    } catch (err) {
      const error = _get(err, "response.data.message", "some error occurred!");
      dispatch({
        type: SIGN_UP_FAIL,
        reqBody: {
          data: {},
          isLoading: false,
          success: false,
          error,
        },
      });
    }
  };
};
