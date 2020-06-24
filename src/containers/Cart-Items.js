import React, { useEffect } from "react";
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

const CartItems = ({
  data,
  isLoading,
  success,
  error,
  fetchCartItems,
  createOrder,
  cartItemLength,
  removeItemFromCart,
}) => {
  useEffect(() => {
    fetchCartItems();
  }, []);

  const createOrderHandler = () => {
    createOrder();
  };

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
                    <div style={{ textAlign: "center" }}>
                      Your cart is empty!
                      <Link to="/">
                        <h6>Go Shopping</h6>
                      </Link>
                    </div>
                  ) : (
                    (data || []).map((item) => (
                      <li>
                        <div className="cart-image">
                          <img
                            src={item?.productId?.image ?? ""}
                            alt="product"
                          />
                        </div>
                        <div className="cart-name">
                          <div style={{ color: "blue" }}>
                            {item?.productId?.name ?? ""}
                          </div>
                          <div>
                            Qty: <b>{item?.quantity ?? ""}</b>
                            <DeleteIcon
                              className="delete-icon"
                              onClick={() => {
                                removeItemFromCart(
                                  item?.productId?._id ?? "",
                                  ({ isloading, success, error }) => {
                                    if (success) {
                                      fetchCartItems();
                                    }
                                  }
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="cart-price">
                          Rs. {item?.productId?.price ?? ""}{" "}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="cart-action">
                <h4>Subtotal ( {cartItemLength} items) totalPrice:()</h4>
                <button
                  onClick={createOrderHandler}
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
};

const mapstateToProps = (state) => {
  const { data, isLoading, success, error } = state?.cartItems ?? {};
  const cartItemLength = (state?.cart?.item?.data ?? []).length;
  return {
    cartItemLength,
    data,
    isLoading,
    success,
    error,
  };
};

const cartPage = connect(mapstateToProps, {
  fetchCartItems,
  createOrder,
  removeItemFromCart,
})(CartItems);

export default Layout(cartPage);
