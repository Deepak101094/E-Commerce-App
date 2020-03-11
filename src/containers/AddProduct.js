import React, { Component } from "react";
//? Redux
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//? Utilities
import validate from "../../../utility/validate/validate";
//? Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//? Actions
import { addProduct } from "../../store/actions/add-product";

class AddProduct extends Component {
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
          <TextField {...input} type={type} placeholder={label} />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  formSubmit = formValue => {
    const { addProduct } = this.props;
    addProduct(formValue);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <Field
          name="productName"
          component={this.renderField}
          type="text"
          label="Product-Name"
        />
        <Field
          name="description"
          component={this.renderField}
          type="text"
          label="Description"
        />
        <Field
          name="price"
          component={this.renderField}
          type="number"
          label="Price"
        />
        <Field
          name="imageURL"
          component={this.renderField}
          type="text"
          label="Image"
        />
        <Button variant="contained" color="primary" size="medium">
          Add Product
        </Button>
      </form>
    );
  }
}

const productForm = reduxForm({
  form: "addProductForm",
  validate
})(AddProduct);

export default connect(null, { addProduct })(productForm);
