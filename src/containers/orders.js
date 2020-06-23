import React, { Component } from "react";
import { Link } from "react-router-dom";
import Order from "../components/order";
import Layout from "../Hoc/Layout"
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
    const { orderId, ordersLength } = this.props;
    //console.log(data, "response data");
    return (
      <div>
        <style>{`
      .loader {
        position: fixed; /* or absolute */
        top: 40%;
        left: 50%;
      }
      .order {
        margin: 1rem;
      }
    `}</style>
        {isLoading ? (
          <div className="loader">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <React.Fragment>
            {success ? (
              <>
              <div className="order">
              <Link to="/">Back to HomePage</Link>
              <div style={{marginTop: "1rem"}}><h5>Your OrderId:- {orderId} </h5> </div>
              </div>
              <div className="placeorder">
                <div className="placeorder-info">
                  <div>
                    <ul className="cart-list-container">
                      <li>
                        <h3>Orders</h3>
                        <p><b>Price</b></p>
                      </li>
                      {ordersLength === 0 ? (
                        <div>Your Order is empty</div>
                      ) : (
                        (data || []).map((item) => (
                          <li key={item?.product?._id ?? ""}>
                            <div className="cart-image">
                              <img
                                src={item?.product?.image ?? ""}
                                alt="product"
                              />
                            </div>
                            <div className="cart-name">
                              <div>{item?.product?.name ?? ""}</div>
                              <div>Qty: {item?.quantity ?? ""}</div>
                            </div>
                            <div className="cart-price">
                              ${item?.product?.price ?? ""}
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
                <Order data={data} />
              </div>
              </>
            ) : (
              <p>{error}</p>
            )}
          </React.Fragment>
        )}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const ordersLength = (state?.orders?.orders?.data ?? []).length;
  const orderId = state?.login?.loginData?.data?.userId ?? ""
  return {
    ordersLength,
    orderId
  };
};

const orderSummary = connect(mapStateToProps, { fetchOrder })(Orders);
export default Layout(orderSummary);