import { combineReducers } from "redux";
//?Reducer from redux-form
import { reducer as formReducer } from "redux-form";
//? own Reducer
import addProduct from "./add-product";
import updateProduct from "./update-product";
import deleteProduct from "./delete-product";
import fetchProducts from "./fetch-products";
import fetchProductById from "./fetch-single-product";
import addTocartReducer from "./add-to-cart";
import login from "./login";
import signUp from "./sign_up";

export default combineReducers({
  form: formReducer,
  addProduct,
  updateProduct,
  deleteProduct,
  products: fetchProducts,
  product: fetchProductById,
  cart: addTocartReducer,
  login,
  signUp
});
