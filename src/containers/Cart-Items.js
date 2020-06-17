import React, { Component } from "react";
import CartItem from "../components/Cart-item";
import Layout from "../Hoc/Layout";
//? redux
import { connect } from "react-redux";
//? action
import { fetchCartItems } from "../store/actions/fetch-cart-items";
import { createOrder } from "../store/actions/create-order";
//? lodash
import _get from "lodash/get";
//? material ui 
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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

  // createOrderHandler = () => {
  //   const { createOrder } = this.props;
  //   createOrder();
  //    alert("your Order is Successfull");
  //  //this.props.history.push("/orders");
  // };

  render() {
    console.log(this.state);
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
      .button {
        display: flex;
        right: 20px;
        position: fixed;
        top: 5px;
      }
      .order {
        width: 100%;
        background: gray;
        marginTop: 0px;
        display: flex;
      }
      `}
        </style>
        {isLoading ? (
          <div className="loader">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="container">
          <h4 style={{margin: "1rem"}} > Shopping Cart </h4>
          <Divider style={{marginBottom: "1rem"}} />
          <Grid container spacing={2}>
            {success ? (
              (data || []).map((item) => {
                return (
                  <Grid item xs={12} sm={8} >                
                  <CartItem key={_get(item, "_id", "")} item={item} />
                  </Grid>             
                );
              })
            ) : (
              <p> {error} </p>
            )}
            <Grid item xs={12} sm={4}>
            <Paper className="order"> 
            <h6> SubTotal </h6>
            <Button color="primary" size="large" fullWidth > Proceed to checkout</Button>
            </Paper>
            </Grid>   
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
const cartPage= connect(null, { fetchCartItems, createOrder })(CartItems);

export default Layout(cartPage);