import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux';
import validate from "../validate/validate";
import { addProduct } from '../store/action/add-product-action';
//import TextField from '@material-ui/core/TextField';

class AddProduct extends Component {
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
        <Field
        name="imageURL"
        component={this.renderField}
        type="text"
        label="image"
      />
        <button>AddProduct</button>
      </form>
    );
  }
}

const productForm =  reduxForm({
  form: "addProduct",
  validate
})(AddProduct);

export default connect(null, { addProduct })(productForm);