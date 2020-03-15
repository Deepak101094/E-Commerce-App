import React, { Component } from "react";
//?redux
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//Material import
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MUCard from "@material-ui/core/Card";
import { styled } from "@material-ui/styles";
//?utility
import validate from "../utility/validate";
//? actions
import { userSignUp } from "../store/actions/sign_up";
//? Layout
import Layout from "../Hoc/Layout";

const Card = styled(MUCard)({
  padding: "30px",
  margin: "30px"
});
class SignUp extends Component {
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

  renderField = ({ input, type, label, meta }) => {
    return (
      <div>
        <label> {label} </label>
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

  formSubmit = reqBody => {
    const { userSignUp } = this.props;
    console.log(reqBody);
    userSignUp(reqBody);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <Card>
          <form onSubmit={handleSubmit(this.formSubmit)}>
            <Field
              name="name"
              type="text"
              component={this.renderField}
              label="Name"
            />
            <Field
              name="email"
              type="email"
              component={this.renderField}
              label= "Email"
            />
            <Field
              name="password"
              type="password"
              component={this.renderField}
              label="Password"
            />
            <Field
              name="userType"
              component="select"
              label="UserType"
            >
              <option />
              <option value=""> select your usertype</option>
              <option value="admin">admin</option>
              <option value="normal user">normal user</option>
            </Field>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="medium"
            >
              SignUp
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

const signUp = connect(null, { userSignUp })(SignUp);
const signUpForm = reduxForm({
  form: "signUpForm",
  validate
})(signUp);

export default Layout(signUpForm);
