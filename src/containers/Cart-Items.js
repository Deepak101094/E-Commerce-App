import React, { Component } from "react";
import CartItem from "../components/Cart-item";
//? redux
import { connect } from "react-redux";
//? action
import { fetchCartItems } from "../store/actions/fetch-cart-items";
//? lodash
import _get from "lodash/get";
//? material ui
import CircularProgress from "@material-ui/core/CircularProgress";

class CartItems extends Component {
  state = {
    data: [],
    isLoading: false,
    success: undefined,
    error: false
  };
  componentDidMount() {
    const { fetchCartItems } = this.props;
    fetchCartItems(this.cartItemsResponseHandler);
  }
  cartItemsResponseHandler = ({ data, isLoading, success, error }) => {
    this.setState({
      data,
      isLoading,
      success,
      error
    });
  };

  render() {
    const { data, isLoading, success, error } = this.state;
    return (
      <div className="container">
        <style>
          {`
      .cartItems {
        display: flex;
        margin-top: 40px;
      }
      .loader {
        position: fixed; /* or absolute */
        top: 40%;
        left: 50%;
      }
      `}
        </style>
        {isLoading ? (
          <div className="loader">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="cartItems">
            {success ? (
              (data || []).map(item => {
                return <CartItem key={_get(item, "_id", "")} item={item} />;
              })
            ) : (
              <p> {error} </p>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { fetchCartItems })(CartItems);
