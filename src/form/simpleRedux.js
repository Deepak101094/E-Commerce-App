import React, { Component } from "react";
//? Redux
import { Field, reduxForm } from "redux-form";
//? Utilities
import validate from "../utility/validate/index";

//? Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MUCard from "@material-ui/core/Card";
import { styled } from "@material-ui/styles";
//? Actions

//? Layout
import Layout from "../Hoc/Layout";

const Card = styled(MUCard)({
  padding: "30px",
  margin: "30px"
});

class SimpleForm extends Component {
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

  formSubmit = (reqBody) => { 
  console.log(reqBody);
  };
 
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <Card>
          <form onSubmit={handleSubmit(this.formSubmit)}>
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
              Submit
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}


const ProductForm = reduxForm({
  form: "addProductForm",
  validate
})(SimpleForm);

export default Layout(ProductForm);