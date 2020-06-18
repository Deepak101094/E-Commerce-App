import React, { Component } from "react";
import { Link } from "react-router-dom";
import Layout from "../Hoc/Layout";
//? redux
import { connect } from "react-redux";
//? action
import { fetchCartItems } from "../store/actions/fetch-cart-items";
import { createOrder } from "../store/actions/create-order";
import { removeItemFromCart } from "../store/actions/remove-item-from-cart";
//? lodash
import _get from "lodash/get";
//? material ui
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Divider, Grid, Paper } from "@material-ui/core";

class CartItems extends Component {
  state = {
    data: [],
    isLoading: false,
    success: undefined,
    error: false,
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
      error,
    });
  };

  createOrderHandler = () => {
    const { createOrder } = this.props;
    createOrder();
     alert("your Order is Successfull");
   //this.props.history.push("/orders");
  };

  deleteItemHandler = (productId) => {
   const { removeItemFromCart } = this.props;
   removeItemFromCart(productId)
  }

  render() {
    console.log(this.state);
    const { data, isLoading, success, error } = this.state;
    const { cartItemLength } = this.props;
    return (
      <div>
        <style>
          {`
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
          // <div className="container">
          // <h4 style={{margin: "1rem"}} > Shopping Cart </h4>
          // <Divider style={{marginBottom: "1rem"}} />

          //   {success ? (
          //     (data || []).map((item) => {
          //       return (
          //         <Grid container spacing={2} direction="column" >
          //         <Grid item xs={12} sm={2} md={2} />
          //         <Grid item xs={12} sm={10} md={10} >
          //         <CartItem key={_get(item, "_id", "")} item={item} />
          //         </Grid>
          //         <Grid item xs={12} sm={2} md={2} />
          //         </Grid>
          //       );
          //     })
          //   ) : (
          //     <p> {error} </p>
          //   )}

          // </div>
          <React.Fragment>
            {success ? (
              <div className="cart">
                <div className="cart-list">
                  <ul className="cart-list-container">
                    <li>
                      <h3>Shopping Cart</h3>
                      <div>Price</div>
                    </li>
                    {cartItemLength === 0 ? (
                      <div>
                        Cart is empty
                        <Link to="/">
                          <h6>Go Shopping</h6>
                        </Link>
                      </div>
                    ) : (
                      (data || []).map((item) => (
                        <li>
                          <div className="cart-image">
                            <img src={item.productId.image} alt="product" />
                          </div>
                          <div className="cart-name">
                            <div style={{ color: "blue" }}>
                              {item.productId.name}
                            </div>
                            <div>
                              Qty: <b>{item.quantity}</b>
                              <DeleteIcon
                                style={{
                                  color: "tomato",
                                  marginLeft: "1rem",
                                  cursor: "pointer",                                  
                                }}
                                onClick={() => this.deleteItemHandler(item.productId._id)}
                              />
                            </div>
                          </div>
                          <div className="cart-price">
                            Rs. {item.productId.price}{" "}
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="cart-action">
                  <h4>
                    Subtotal ( {cartItemLength} items) : ${" "}
                    {data.reduce((a, c) => a + c.price * c.qty, 0)}
                  </h4>
                  <button
                     onClick={this.createOrderHandler}
                    className="button primary full-width"
                    // size="large"
                    // fullWidth
                    // color="secondary"
                    disabled={cartItemLength === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <p> {error} </p>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  const cartItemLength = (state?.cart?.item?.data ?? []).length;
  return { cartItemLength };
};

const cartPage = connect(mapstateToProps, { fetchCartItems, createOrder,removeItemFromCart })(
  CartItems
);

export default Layout(cartPage);
