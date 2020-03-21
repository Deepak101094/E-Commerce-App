import React, { Component } from "react";
//? Redux
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//? Utilities
import validate from "../utility/validate/index";
//? Actions
import { updateProduct } from "../store/actions/update-product";
import { fetchProducts } from "../store/actions/fetch-products";
//? Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MUCard from "@material-ui/core/Card";
import { styled } from "@material-ui/styles";
//? Layout
import Layout from "../Hoc/Layout";
//?lodash
import _get from "lodash/get";


const Card = styled(MUCard)({
  padding: "30px",
  margin: "30px"
});

class UpdateProduct extends Component {
  // componentDidMount () {
  //   const { fetchProducts } = this.props;
  //   fetchProducts()
  // }
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="error">
          <style jsx>{`
            .error {
              margin: 10px 0px;
              color: red;
            }
          `}</style>
          {error}
        </div>
      );
    }
  };

  renderField = ({ input, label, type, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <div>
          <TextField
            {...input}
            type={type}
            placeholder={label}
            fullWidth={true}
          />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  formSubmit = ( reqBody) => { 
  console.log(reqBody);
  const { updateProduct } = this.props
  updateProduct(reqBody)
  }
 
  render() {
   // console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <Card>
          <form onSubmit={handleSubmit(this.formSubmit)}>
             <Field
              name="id"
              component={this.renderField}
              type="text"
              label="Product-id"
             />
            <Field
              name="name"
              component={this.renderField}
              type="text"
              label="Name"
            />
            <Field
              name="price"
              component={this.renderField}
              type="number"
              label="Price"
            />
            <Field
              name="description"
              component={this.renderField}
              type="text"
              label="Description"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              UpdateProduct
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
 // console.log(ownProps);
  const {products} = state.products;
  const productData = _get(products,"data", {});
  const {name, price, description} = productData;
  let initialValues = {name, price, description}
  return { initialValues }
}

UpdateProduct = connect(mapStateToProps, { updateProduct, fetchProducts })(UpdateProduct);

const ProductForm = reduxForm({
  form: "updateProductForm",
  validate
})(UpdateProduct);

export default Layout(ProductForm);
