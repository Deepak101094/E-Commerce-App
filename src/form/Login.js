import React, { Component } from "react";
//? Redux
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//? Utilities
import validate from "../utility/validate/index";
//? action
import { loginUser } from "../store/actions/login";
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

class Login extends Component {
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
 const { loginUser } = this.props;
  console.log(reqBody); 
  loginUser(reqBody);
  };
 
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <Card>
          <form onSubmit={handleSubmit(this.formSubmit)}>
            <Field
              name="email"
              component={this.renderField}
              type="email"
              label="Email"
            />
            <Field
              name="password"
              component={this.renderField}
              type="password"
              label="Password"
            />
           
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

Login = connect(null, { loginUser })(Login);

const ProductForm = reduxForm({
  form: "addProductForm",
  validate
})(Login);

export default Layout(ProductForm);
