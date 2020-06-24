import { combineReducers } from "redux";
//? own Reducer
import addProduct from "./add-product";
import updateProduct from "./update-product";
import fetchUserProducts from "./fetch-user-products";
import fetchProductById from "./fetch-single-product";
import login from "./login";
import signUp from "./sign_up";
//?shop
import fetchCartItems from "./fetch-cart-items";
import createOrderReducer from "./create-order";
import fetchOrderReducer from "./fetch-orders";

export default combineReducers({
   addProduct,
   updateProduct,
   userProducts: fetchUserProducts,
   product: fetchProductById,
   login,
   signUp,
   cartItems: fetchCartItems,
   createOrder: createOrderReducer,
   orders: fetchOrderReducer,
});
