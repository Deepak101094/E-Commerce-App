import { combineReducers } from "redux";
//?Reducer from redux-form
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
import fetchOrderReducer from "./fetch-orders";

export default combineReducers({
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
   createOrder: createOrderReducer,
   orders: fetchOrderReducer,
});
