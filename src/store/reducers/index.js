import { combineReducers } from "redux";
//?Reducer from redux-form
import { reducer as formReducer } from "redux-form";
//? own Reducer
import addProduct from "./add-product";
import updateProduct from "./update-product";
import deleteProduct from "./delete-product";
import fetchProducts from "./fetch-products";
import fetchProductById from "./fetch-single-product";
import login from "./login";
import signUp from "./sign_up";
//?shop
import addTocartReducer from "./add-to-cart";
import removeItemFromCart from "./remove-item-from-cart";
import fetchCartItems from "./fetch-cart-items";
import createOrderReducer from "./create-order";
import fetchOrderReducer from "./fetch-order";

export default combineReducers({
  form: formReducer,
  addProduct,
  updateProduct,
  deleteProduct,
  products: fetchProducts,
  product: fetchProductById,
  login,
  signUp,
  cart: addTocartReducer,
  removeItemFromCart,
  cartItems: fetchCartItems,
  craetOrder: createOrderReducer,
  orders: fetchOrderReducer
});
