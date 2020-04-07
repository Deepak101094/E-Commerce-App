import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import "./index.css";

//? Components
import AddProduct from "../src/containers/AddProduct";
import UpdateProduct from "../src/containers/UpdateProduct";
import Login from "../src/form/Login";
import SignUp from "../src/form/SignUp";
import ProductList from "../src/containers/ProductList";
import CartItems from "../src/containers/Cart-Items";
import Orders from "../src/containers/orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/orders">
        <Orders />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products-list">
        <ProductList />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="/update-product/:id">
        <UpdateProduct />
        </Route>
        <Route path="/cart-item">
        <CartItems />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
