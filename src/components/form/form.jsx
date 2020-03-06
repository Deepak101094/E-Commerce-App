import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux';
import validate from "./validate";
import { addProduct } from '../store/action/add-product-action';

class Form extends Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <div> {error} </div>;
    }
  };

  renderField = ({ input, label, type, meta }) => {
    return (
      <div>
        <label> {label} </label>
        <div>
          <input {...input} type={type} placeholder={label} />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  formSubmit = formValue => {
    console.log(formValue);
    const {addProduct} = this.props;
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
        <button>AddProduct</button>
      </form>
    );
  }
}

const productForm =  reduxForm({
  form: "addProduct",
  validate
})(Form);

export default connect(null, { addProduct })(productForm);