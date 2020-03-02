import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from '../store/action/add-product-action';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: ""
    };
  }

  clickProductHandler = () => {
      const { addProduct } = this.props;
      const { name, description, price } = this.state;
      let requestBody= {
          name,
          description,
          price
      };
      addProduct (requestBody)
  };

  render() {
    return (
      <div>
        <h3> Product Form </h3>
        <input
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="name"
        />{" "}
        <br /> <br/>
        <input
          onChange={(e) => this.setState({ description: e.target.value })}
          placeholder="discription"
        />{" "}
        <br /> <br/>
        <input
          onChange={(e) => this.setState({ price: e.target.value })}
          placeholder="price"
        /> {" "}
        <br /> <br/>
        <button onClick={this.clickProductHandler} >Add Product</button>

      </div>
    );
  }
}

export default connect(null, { addProduct } )(Form);
