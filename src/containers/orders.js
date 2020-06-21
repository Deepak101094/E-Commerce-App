import React, { Component } from "react";
import Order from "../components/order";
//? redux
import { connect } from "react-redux";
//? action
import { fetchOrder } from "../store/actions/fetch-orders";
//? material-ui
import { CircularProgress } from "@material-ui/core";
//? lodash
import _get from "lodash/get";

class Orders extends Component {
  state = {
    data: [],
    isLoading: false,
    success: undefined,
    error: "",
  };

  componentDidMount() {
    const { fetchOrder } = this.props;
    fetchOrder(this.fetchOrderHandler);
  }

  fetchOrderHandler = ({ data, isLoading, success, error }) => {
    this.setState({
      data,
      isLoading,
      success,
      error,
    });
  };

  render() {
    const { data, isLoading, success, error } = this.state;
    //console.log(data, "response data");
    return (
      <div>
        <style>{`
      .loader {
        position: fixed; /* or absolute */
        top: 40%;
        left: 50%;
      }
    `}</style>
        {isLoading ? (
          <div className="loader">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <React.Fragment>
            <div className="placeorder">
              <div className="placeorder-info">
                <div>
                  <ul className="cart-list-container">
                    <li>
                      <h3>Orders</h3>
                      <div>Price</div>
                    </li>
                    {this.props.ordersLength === 0 ? (
                      <div>Cart is empty</div>
                    ) : (
                      (data || []).map((item) => (
                        <li key={item.product._id}>
                          <div className="cart-image">
                            <img src={item.product.image} alt="product" />
                          </div>
                          <div className="cart-name">
                            <div>{item.product.name}</div>
                            <div>Qty: {item.quantity}</div>
                          </div>
                          <div className="cart-price">
                            ${item.product.price}
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="placeorder-action">
                <ul>
                  <li>
                    <h3>Order Summary</h3>
                  </li>
                  <li>
                    <div>Items</div>
                    <div>${this.props.ordersLength}</div>
                  </li>
                  <li>
                    <div>Shipping</div>
                    <div>Free</div>
                  </li>
                  <li>
                    <div>Tax</div>
                    <div>18%</div>
                  </li>
                  <li>
                    <div>Order Total</div>
                    <div>Total-Price:</div>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const ordersLength = (state?.orders?.orders?.data ?? []).length;
  return {
    ordersLength,
  };
};

export default connect(mapStateToProps, { fetchOrder })(Orders);
