import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as formReducer } from "redux-form";
import addProduct from "./add-product";
import updateProduct from "./update-product";
import deleteProduct from "./delete-product";
import fetchProducts from "./fetch-products";
import fetchProductById from "./fetch-single-product";

export default combineReducers({
  // toastr: toastrReducer,
  form: formReducer,
  addProduct,
  updateProduct,
  deleteProduct,
  products: fetchProducts,
  product: fetchProductById
});
