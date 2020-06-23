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
          .products {
            display: flex;
            margin-top: 50px;
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
        <div className="products">
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data, success, isLoading, errorMsg } = state?.userProducts ?? {};
  return { data, success, isLoading, errorMsg };
};

export default connect(mapStateToProps, { fetchProducts })(UserProducts);
