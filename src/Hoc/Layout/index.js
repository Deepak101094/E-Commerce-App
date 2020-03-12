import React, { Component } from "react";
import Header from "./header";

const Layout = InputComponent => {
  return class extends Component {
    render() {
      return (
        <>
          <Header />
          <InputComponent />
        </>
      );
    }
  };
};

export default Layout;
