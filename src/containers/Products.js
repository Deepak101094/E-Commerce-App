import React, { Component } from "react";
import Product from "../components/products/Product";
import { connect } from "react-redux";
import { fetchProducts } from "../store/actions/fetch-products";
import { CircularProgress } from "@material-ui/core";
import _get from "lodash/get";

class Products extends Component {
  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }
  render() {
    const { productData, isLoading, success, error } = this.props;
    return (
      <div>
        {isLoading ? (
          <div>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="container">
            {success ? (
              (productData || []).map(product => {
                return <Product product={product} />;
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

const mapStateToProps = state => {
  const { products } = state.products;
  const productData = _get(products, "data", []);
  const isLoading = _get(products, "isLoading", false);
  const success = _get(products, "success", false);
  const error = _get(products, "error", "some error occurred!");
  return {
    productData,
    isLoading,
    success,
    error
  };
};

export default connect(mapStateToProps, { fetchProducts })(Products);
