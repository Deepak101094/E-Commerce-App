import React, { Component } from "react";
import UserProducts from "./components/userProducts";
import ProductList from "./containers/ProductList";
import Layout from "./Hoc/Layout";

class App extends Component {
   render() {
      return (
         <div>{localStorage.getItem("userType") == 1 ? <ProductList /> : <UserProducts />}</div>
      );
   }
}

export default Layout(App);
