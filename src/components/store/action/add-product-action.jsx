import  {
    ADD_PRODUCT_INIT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL
} from './actionType';
import axios from "axios";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

 export const addProduct = (requestBody) => {
    return async dispatch => {
      dispatch({
          type: ADD_PRODUCT_INIT,
          product: {
              data: [],
              isLoading: true,
              success: undefined,
              error: false
         }
      })
      try {
          const response = await axios.post(
              "http://localhost:3000",requestBody 
          )
          const product = _get(response,"data", []);
          console.log(product);
          let success = false
          if(product && Array.isArray(product) && !_isEmpty(product)) {
              success = true
          }
          dispatch({
              type: ADD_PRODUCT_SUCCESS,
              product: {
                  data: product,
                  isLoading: false,
                  success,
                  error: false                  
              }
          })
      }
      catch (err) {
        const error = _get(err, "err.message" , "something went wrong!")
        dispatch ({
            type: ADD_PRODUCT_FAIL,
            product: {
                data: [],
                isLoading: false,
                success: false,
                error               
            }
        })
      }
    }
}