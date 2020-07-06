import React from "react";
import ReactDOM from "react-dom";
//?Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./store/reducers";
import "./index.css";

//? own Components
import App from "./App";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CartItems from "./components/CartItems";
import Orders from "./components/orders";

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
   {/* rendered different component based on different Routes  */}
      <Router>
         <Switch>
            <Route exact path="/orders">
               <Orders />
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
               <App />
            </Route>
         </Switch>
      </Router>
   </Provider>,
   document.getElementById("root")
);
