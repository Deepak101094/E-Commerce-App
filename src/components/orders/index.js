import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Order from "./Order";
import Layout from "../../hoc/layout";
//? redux
import { connect } from "react-redux";
//? action
import { fetchOrder } from "../../store/actions/fetch-orders";
//? material-ui
import { CircularProgress } from "@material-ui/core";

const Orders = ({ data, isLoading, success, error, fetchOrder, orderId, ordersLength }) => {
   useEffect(() => {
      fetchOrder();
   }, []);

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
                        <div style={{ marginTop: "1rem" }}>
                           {ordersLength ? <h5>Your OrderId:- {orderId} </h5> : null}
                        </div>
                     </div>
                     <div className="placeorder">
                        <div className="placeorder-info">
                           <div>
                              <ul className="cart-list-container">
                                 <li>
                                    <h3>Orders</h3>
                                    <p>
                                       <b>Price</b>
                                    </p>
                                 </li>
                                 {ordersLength === 0 ? (
                                    <div>Your Order is empty</div>
                                 ) : (
                                    (data || []).map((item) => (
                                       <li key={item?.product?._id ?? ""}>
                                          <div className="cart-image">
                                             <img src={item?.product?.image ?? ""} alt="product" />
                                          </div>
                                          <div className="cart-name">
                                             <div>{item?.product?.name ?? ""}</div>
                                             <div>Qty: {item?.quantity ?? ""}</div>
                                          </div>
                                          <div className="cart-price">
                                             Rs.{item?.product?.price ?? ""}
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
};

const mapStateToProps = (state) => {
   const { data, isLoading, success, error } = state?.orders ?? {};
   const ordersLength = (state?.orders?.data ?? []).length;
   const orderId = state?.logIn?.data?.userId ?? "";
   return {
      ordersLength,
      orderId,
      data,
      isLoading,
      success,
      error,
   };
};

const orderSummary = connect(mapStateToProps, { fetchOrder })(Orders);
export default Layout(orderSummary);
