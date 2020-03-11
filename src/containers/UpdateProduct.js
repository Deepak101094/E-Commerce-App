import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import validate from "../utility/validate";
import Layout from "../Hoc/Layout";
class UpdateProduct extends Component {
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
        <button>UpdateProduct</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "updateProduct",
  validate
})(Layout(UpdateProduct));
