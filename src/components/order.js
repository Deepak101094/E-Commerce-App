import React from "react";
import { connect } from "react-redux";
//? material-ui
import { makeStyles } from "@material-ui/core/styles";

//? lodash
import _get from "lodash/get";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    width: "100%",
    height: 150,
  },
  ul: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
  },
}));

const Order = ({ orderLength }) => {
  const classes = useStyles();
  //const {} = data

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
          <div>18%</div>
        </li>
        <li>
          <h4>Order Total:</h4>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  const orderLength = (state?.orders?.orders?.data ?? []).length;
  return {
    orderLength,
  };
};

export default connect(mapStateToProps)(Order);
