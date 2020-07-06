import React from "react";
//?libraries
import { connect } from "react-redux";

const Order = ({ orderLength, data }) => {
  return (
    <div className="placeorder-action">
      <ul>
        <li>
          <h4>Order Summary</h4>
        </li>
        <li>
          <div>Items</div>
          <div>
            <b>{orderLength}</b>
          </div>
        </li>
        <li>
          <div>Shipping</div>
          <div>Free</div>
        </li>
        <li>
          <div>Tax</div>
          <div>Free</div>
        </li>
        <li>
          <h4>Order Total:</h4>
          <h4>
            Rs.{data.reduce((a, c) => a + c.product.price * c.quantity, 0)}
          </h4>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  const orderLength = (state?.orders?.data ?? []).length;
  return {
    orderLength,
  };
};

export default connect(mapStateToProps)(Order);
