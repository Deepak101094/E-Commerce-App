import { combineReducers } from "redux";
//? own Reducer
import addProduct from "./add-product";
import updateProduct from "./update-product";
import fetchUserProducts from "./fetch-user-products";
import login from "./login";
import signUp from "./sign_up";
//?shop
import fetchCartItems from "./fetch-cart-items";
import fetchOrderReducer from "./fetch-orders";

export default combineReducers({
   addProduct,
   updateProduct,
   userProducts: fetchUserProducts,
   login,
   signUp,
   cartItems: fetchCartItems,
   orders: fetchOrderReducer,
});
