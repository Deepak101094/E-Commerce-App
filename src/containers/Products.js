import React, { Component } from "react";
import Product from "../components/Product";
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/fetch-products";
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";
import { Grid } from "@material-ui/core";


class Products extends Component {
  state = {
    data: [],
    success: undefined,
    isLoading: false,
    errorMsg: ""
  };
  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts(this.responseHandler);
  }

  responseHandler = ({ data, success, isLoading, errorMsg }) => {
    this.setState({
      data,
      success,
      isLoading,
      errorMsg
    });
  };

  render() {
   // console.log(this.props);
    const { data, success, isLoading, errorMsg } = this.state;
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
              (data || []).map(product => {
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
  }
}

export default connect(null, { fetchProducts })(Products);
