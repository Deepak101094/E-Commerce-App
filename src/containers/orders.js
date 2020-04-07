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
   // console.log(data, "response data");
    return (
      <div className="container">
        <style>{`
      .order {
        display: flex;
        margin-top: 60px;
      }
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
          <div className="order">
            {success ? (
              (data || []).map((order) => {
                return <Order key={_get(order, "_id", "")} order={order} />;
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
export default connect(null, { fetchOrder })(Orders);
