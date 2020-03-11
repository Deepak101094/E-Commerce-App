import {
  FETCH_PRODUCTS_INIT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from "./actionType";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import api from "../../../API/productApi";
//import axios from 'axios';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch({
      type: FETCH_PRODUCTS_INIT,
      products: {
        data: [],
        isLoading: true,
        success: undefined,
        error: false
      }
    });
    try {
      const response = await api.get("/products");
      const products = _get(response, "data", []);
      console.log(products);
      let success = false;
      if (products && Array.isArray(products) && !_isEmpty(products)) {
        success = true;
      }
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        products: {
          data: products,
          isLoading: false,
          success,
          error: false
        }
      });
    } catch (err) {
      const error = _get(err, "err.message", "some error occurred!");
      dispatch({
        type: FETCH_PRODUCTS_FAIL,
        products: {
          data: [],
          isLoading: false,
          success: false,
          error
        }
      });
    }
  };
};
