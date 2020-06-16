import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//?react-hook-form
import { useForm } from "react-hook-form";
//? hoc
import Layout from "../Hoc/Layout";
//?action
import { updateProduct } from "../store/actions/update-product";
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import EditIcon from "@material-ui/icons/Edit";

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {"Copyright © "}
         <Link color="inherit" href="https://material-ui.com/">
            Your Website
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

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
   errorMsg: {
      margin: "10px 0px",
      color: "red",
   },
}));

function UpdateProduct(props) {
   const classes = useStyles();
   const history = useHistory();
   const [loading, setLoading] = React.useState(false);
   const { productData } = props;
   const { handleSubmit, errors, reset, register } = useForm({
      defaultValues: {
         ...productData,
         // imageUrl: image,
      },
   });
   const updateProductHandler = (reqBody, e) => {
      // console.log(reqBody);
      setLoading(true);
      const { updateProduct } = props;
      reqBody.id = productData._id;
      updateProduct(reqBody, () => {
         history.push("/product-list");
      });
      e.target.reset();
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Update-Product
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(updateProductHandler)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        type="text"
                        id="name"
                        label="Product Name"
                        autoFocus
                        inputRef={register({ required: true })}
                     />
                     {errors.name && errors.name.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Product-Name is Required
                        </div>
                     )}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        type="text"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        inputRef={register({ required: true })}
                     />
                     {errors.description && errors.description.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Add Product Description
                        </div>
                     )}
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="price"
                        type="number"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        inputRef={register({ required: true })}
                     />
                     {errors.price && errors.price.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Add Product Price
                        </div>
                     )}
                  </Grid>
                  {/* <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="imageUrl"
                        label="Image"
                        type="text"
                        id="image"
                        autoComplete="image"
                        inputRef={register({ required: true })}
                     />
                     {errors.imageUrl && errors.imageUrl.type === "required" && (
                        <div className={classes.errorMsg}>
                           <ErrorIcon /> Add Product Image
                        </div>
                     )}
                  </Grid> */}
               </Grid>
               {loading ? (
                  <div style={{ textAlign: "center" }}>
                     <CircularProgress />
                  </div>
               ) : (
                  <Button
                     type="submit"
                     fullWidth
                     reset={reset}
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                     reset={reset}
                     disabled={errors.name || errors.description || errors.price || errors.imageUrl}
                  >
                     Update Product
                  </Button>
               )}
            </form>
         </div>
         <Box mt={5}>
            <Copyright />
         </Box>
      </Container>
   );
}

const mapStateToProps = (state) => {
   const { productToEdit } = state?.updateProduct ?? {};
   return {
      productData: productToEdit,
   };
};

const updateProductForm = connect(mapStateToProps, { updateProduct })(UpdateProduct);

export default Layout(updateProductForm);
