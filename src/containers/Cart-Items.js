import React, { Component } from "react";
import CartItem from "../components/Cart-item";
import { connect } from "react-redux";
//?action
import { fetchCartItems } from "../store/actions/fetch-cart-items";
//? lodash
import _get from "lodash/get";
//?materail-ui
import { CircularProgress } from "@material-ui/core";

class CartItems extends Component {
  componentDidMount() {
    const { fetchCartItems } = this.props;
    fetchCartItems();
  }

  render() {
    const { ItemData, isLoading, success, error } = this.props;
    return (
      <div className="container">
        <style>
          {`
              .items {
                display: flex;
                margin-top: 50px;
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
          <div className="items">
            {success ? (
              (ItemData || []).map(item => {
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

const mapStateToProps = state => {
  const { cartItems } = state;
  const ItemData = _get(cartItems , "data", {})
  const { isLoading, success, error } = ItemData;
  return { ItemData, isLoading, success, error };
};

export default connect(mapStateToProps, { fetchCartItems })(CartItems);
