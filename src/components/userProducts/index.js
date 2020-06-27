import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/fetch-user-products";
import { CircularProgress } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import _get from "lodash/get";
import Product from "./Product";

const UserProducts = ({
  fetchProducts,
  data,
  success,
  isLoading,
  errorMsg,
}) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <style>{`
          .loader {
            position: fixed; /* or absolute */
            top: 40%;
            left: 50%;
          }
          .product {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 30px;
            
          }
        `}</style>
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
        <h2 className="product">Products</h2>
        <div>
          <Grid container spacing={4}>
            {success ? (
              (data || []).map((product) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Product key={_get(product, "_id", "")} product={product} />
                  </Grid>
                );
              })
            ) : (
              <p>{errorMsg}</p>
            )}
          </Grid>
        </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, success, isLoading, errorMsg } = state?.userProducts ?? {};
  return { data, success, isLoading, errorMsg };
};

export default connect(mapStateToProps, { fetchProducts })(UserProducts);
