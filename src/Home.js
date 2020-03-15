import React, { Component } from "react";
import Products from "./containers/Products";
import Layout from "../src/Hoc/Layout";

class App extends Component {
  render() {
    return (
      <div>
      <Products />
      </div>
    );
  }
}

export default Layout(App);
