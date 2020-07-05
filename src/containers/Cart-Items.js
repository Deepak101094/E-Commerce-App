import React, { useState, useEffect } from "react";
//? UI/Modal
import Modal from "../components/UI/Modal/Modal";
//? React Router
import { Link } from "react-router-dom";
//? hoc
import Layout from "../Hoc/Layout";
//? utitlity
import axios from "../utility/axios/withHeader";
//? redux
import { connect, useDispatch } from "react-redux";
//? action
import { fetchCartItems } from "../store/actions/fetch-cart-items";
import setCartItemsCount from "../store/actions/set-cartitems-count";
//? lodash
import _get from "lodash/get";
//? material ui
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";

const CartItems = ({ data, isLoading, success, error, fetchCartItems, cartItemLength }) => {
   const [showModal, setshowModal] = useState(false);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      fetchCartItems();
   }, []);
   const dispatch = useDispatch();
   const removeItemHandler = (itemId) => {
      axios({
         method: "GET",
         url: `/remove-item-from-cart?id=${itemId}`,
         headers: {
            userid: localStorage.getItem("userId"),
         },
      }).then((response) => {
         if (response.status === 200) {
            const items = response?.data?.cart?.items ?? [];
            const itemsCount = Array.isArray(items) ? items.length : 0;
            dispatch(setCartItemsCount(itemsCount));
            fetchCartItems();
         }
      });
   };

   const createOrderHandler = () => {
      setLoading(true);
      axios({
         method: "GET",
         url: "/create-order",
         headers: {
            userid: localStorage.getItem("userId"),
         },
      }).then((response) => {
         // console.log(response);
         if (response.status === 200) {
            setLoading(false);
            setshowModal(true);
            fetchCartItems();
         }
      });
   };

   return (
      <div>
         <Modal show={showModal} />
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
                                       <img src={item?.productId?.image ?? ""} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                       <div style={{ color: "blue" }}>
                                          {item?.productId?.name ?? ""}
                                       </div>
                                       <div>
                                          Qty: <b>{item?.quantity ?? ""}</b>
                                          <DeleteIcon
                                             className="delete-icon"
                                             onClick={() =>
                                                removeItemHandler(item?.productId?._id ?? "")
                                             }
                                          />
                                       </div>
                                       <div style={{ color: "green", marginTop: "20px" }}>
                                          <p> Delivery Free</p>
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
                        <h5>
                           Subtotal ( {data.reduce((a, c) => a + c.quantity, 0)} items) : Rs.{" "}
                           {data.reduce((a, c) => a + c.productId.price * c.quantity, 0)}
                        </h5>
                        {loading ? (
                           <div style={{ textAlign: "center" }}>
                              <CircularProgress />
                           </div>
                        ) : (
                           <button
                              onClick={createOrderHandler}
                              className="button primary full-width"
                              disabled={cartItemLength === 0}
                           >
                              <h4> Place Order</h4>
                           </button>
                        )}
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
   const cartItemLength = (state?.cartItems?.data ?? []).length;
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
})(CartItems);

export default Layout(cartPage);
