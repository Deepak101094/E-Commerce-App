import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import "./index.css";

//? Components
import Products from "../src/containers/Products";
import AddProduct from "../src/containers/AddProduct";
import UpdateProduct from "../src/containers/UpdateProduct";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="/update-product">
          <UpdateProduct />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
