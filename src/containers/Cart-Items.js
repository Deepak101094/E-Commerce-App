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
import DeleteIcon from "@material-ui/icons/Delete";

class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      success: undefined,
      error: false,
    };
  }

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
    // createOrder(() => {
    //   const { fetchCartItems } =  this.props;
    //   fetchCartItems(this.cartItemsResponseHandler)
    // });
    createOrder();
  };

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
          <React.Fragment>
            {success ? (
              <div className="cart">
                <div className="cart-list">
                  <ul className="cart-list-container">
                    <li>
                      <h3>My Cart</h3>
                      <div>
                        <b>Price</b>
                      </div>
                    </li>
                    {cartItemLength === 0 ? (
                      <div style={{textAlign: 'center'}}>
                       Your cart is empty!
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
                                className="delete-icon"
                                onClick={() => {
                                  const { removeItemFromCart } = this.props;
                                  removeItemFromCart(
                                    item.productId._id,
                                    ({ isloading, success, error }) => {
                                      if (success) {
                                       const { fetchCartItems } = this.props;  
                                       fetchCartItems(this.cartItemsResponseHandler);                                  
                                      }                                      
                                    }
                                  );
                                }}
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
                  <h4>Subtotal ( {cartItemLength} items) totalPrice:()</h4>
                  <button
                    onClick={this.createOrderHandler}
                    className="button primary full-width"
                    disabled={cartItemLength === 0}
                  >
                  <h4>Order</h4>
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

const cartPage = connect(mapstateToProps, {
  fetchCartItems,
  createOrder,
  removeItemFromCart,
})(CartItems);

export default Layout(cartPage);
