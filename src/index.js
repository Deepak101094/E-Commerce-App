import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./store/reducers";
import "./index.css";

//? Components
import Home from "./Home";
import AddProduct from "./containers/AddProduct";
import ProductList from "./containers/ProductList";
import UpdateProduct from "./containers/UpdateProduct";
import Login from "../src/form/Login";
import SignUp from "../src/form/SignUp";
import CartItems from "../src/containers/Cart-Items";
import Orders from "../src/containers/orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
   key: "root",
   storage,
   //  blacklist: [],
   //  whitelist: ["addProduct"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
persistStore(store);

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <Switch>
            <Route exact path="/orders">
               <Orders />
            </Route>
            <Route exact path="/product-list">
               <ProductList />
            </Route>
            <Route exact path="/add-product">
               <AddProduct />
            </Route>
            <Route exact path="/update-product/:id">
               <UpdateProduct />
            </Route>
            <Route exact path="/cart-item">
               <CartItems />
            </Route>
            <Route exact path="/login">
               <Login />
            </Route>
            <Route exact path="/signup">
               <SignUp />
            </Route>
            <Route exact path="/">
               <Home />
            </Route>
         </Switch>
      </Router>
   </Provider>,
   document.getElementById("root")
);
