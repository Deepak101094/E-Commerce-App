import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//? react-hook-form
import { useForm, Controller } from "react-hook-form";
//? Layout
import Layout from "../Hoc/Layout";
//? actions
import { userSignUp } from "../store/actions/sign_up";
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
   errorMsg: {
      margin: "10px 0px",
      color: "red",
   },
}));

const SignUp = (props) => {
   const classes = useStyles();
   let history = useHistory();
   const [loading, setLoading] = useState(false);

   const { handleSubmit, register, reset, control, errors } = useForm({
      // mode: "onBlur",
      // reValidateMode: 'onBlur',
   });

   const signUpHandler = (reqBody, e) => {
      setLoading(true);
      const { userSignUp } = props;
      userSignUp(reqBody, (response) => {
         const { data, isLoading, success, error } = response || {};
         setLoading(isLoading);
         if (success) {
            e.target.reset();
            history.push("/login");
         }
      });
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(signUpHandler)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Name"
                        autoFocus
                        // error= {errors.name}
                        inputRef={register({ required: true, minLength: 4 })}
                     />
                     {errors.name && errors.name.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Your Name is Required
                        </div>
                     )}
                     {errors.name && errors.name.type === "minLength" && (
                        <div className={classes.errorMsg}>
                           <WarningIcon /> Name should be min. 4 character
                        </div>
                     )}
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        // error= {errors.name}
                        inputRef={register({
                           required: true,
                           pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        })}
                     />
                     {errors.email && errors.email.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Email is Required
                        </div>
                     )}
                     {errors.email && errors.email.type === "pattern" && (
                        <div className={classes.errorMsg}>
                           <WarningIcon /> Invalid Email
                        </div>
                     )}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        //  error= {errors.name}
                        inputRef={register({ required: true, minLength: 4 })}
                     />
                     {errors.password && errors.password.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Password is Required
                        </div>
                     )}
                     {errors.password && errors.password.type === "minLength" && (
                        <div className={classes.errorMsg}>
                           <WarningIcon /> Invalid Password
                        </div>
                     )}
                  </Grid>
                  <Grid item xs={12}>
                     <Controller
                        as={
                           <FormControl
                              variant="outlined"
                              className={classes.formControl}
                              fullWidth={true}
                              style={{ margin: "0px" }}
                           >
                              <InputLabel htmlFor="outlined-age-native-simple">
                                 User Type
                              </InputLabel>
                              <Select
                                 native
                                 label="User Type"
                                 inputProps={{
                                    name: "user-type",
                                    id: "user-type",
                                 }}
                                 // error= {errors.name}
                              >
                                 <option aria-label="None" value="" />
                                 <option value={1}>Admin</option>
                                 <option value={2}>Normal User</option>
                              </Select>
                           </FormControl>
                        }
                        rules={{ required: true }}
                        name="userType"
                        control={control}
                        type="number"
                        // ref={register({ required: true })}
                     />
                     {errors.userType && errors.userType.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Select User Type
                        </div>
                     )}
                  </Grid>
               </Grid>
               {loading ? (
                  <div style={{ textAlign: "center" }}>
                     <CircularProgress />
                  </div>
               ) : (
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                     disabled={errors.name || errors.email || errors.password || errors.userType}
                  >
                     Sign Up
                  </Button>
               )}

               <Grid container justify="flex-start">
                  <Grid item>
                     <Link to="/login" variant="body2">
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
};
const signForm = connect(null, { userSignUp })(SignUp);
export default Layout(signForm);
