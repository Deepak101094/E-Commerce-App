import {
  FETCH_PRODUCTS_INIT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from "../actionTypes";
import axios from "../../utility/axios/axiosInstance";
import _get from "lodash/get";
//import _isEmpty from "lodash/isEmpty";

export const fetchProducts = cb => {
  return async dispatch => {
    let products = {};
    products = {
      data: [],
      isLoading: true,
      success: undefined,
      errorMsg: ""
    };
    dispatch({
      type: FETCH_PRODUCTS_INIT,
      products: { ...products }
    });
    cb(products);
    try {
      const response = await axios.get("/products");
      //console.log(response);
      const data = _get(response, "data", []);
      let success = _get(response, "status", "") === 200 ? true : false;
      products = {
        data,
        success,
        isLoading: false,
        errorMsg: ""
      };
      cb(products);
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        products: {
          ...products
        }
      });
    } catch (err) {
      const errorMsg = _get(
        err,
        "response.data.message",
        "Something went wrong!"
      );
      products = {
        data: [],
        isLoading: false,
        success: false,
        errorMsg
      };
      cb(products);
      dispatch({
        type: FETCH_PRODUCTS_FAIL,
        products: { ...products }
      });
    }
  };
};
