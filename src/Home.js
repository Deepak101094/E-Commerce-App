import React, { Component } from "react";
import Products from "./containers/Products";
import ProductList from "./containers/ProductList";
import Layout from "../src/Hoc/Layout";

class App extends Component {
   render() {
      return <div>{localStorage.getItem("userType") == 1 ? <ProductList /> : <Products />}</div>;
   }
}

export default Layout(App);
