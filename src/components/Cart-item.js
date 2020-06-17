import React from "react";
//? redux
import { connect } from "react-redux";
//? action
import { removeItemFromCart } from "../store/actions/remove-item-from-cart";
//? material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import { styled} from "@material-ui/styles";

//? lodash
import _get from "lodash/get";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
 root: {
   width: "100%",
   height:"150px",
  // marginTop: '1rem',
   borderRadius: '0.5rem',
   border: '1px solid'
 },
 image: {
   width: "150px",
   height: "150px",
  //  float: "left",
  alignItems: "flex-start"
 },
 itemName : {
   textAlign: 'center',
   paddingTop: "1rem"
 },
 ul:{
   display: 'flex',
  // flexDirection: 'wrap',
   listStyle: 'none'
 }

});

const CartScreen = (props) => {
  const {cartItemLength} = props;
  const removeItemHandler = (_id) => {
    const { removeItemFromCart } = props;
    removeItemFromCart(_id);
  };

  const classes = useStyles();
  const { name, price, description, image, _id } = _get(
    props,
    "item.productId",
    {}
  );
  const { quantity } = _get(props,"item", {});
  return (
    <div className="container">
        <Paper className={classes.root}> 
         <ul className={classes.ul}>
          
         <li> <div className={classes.image}> <img /></div>  </li>
         <li style={{textAlign: 'center',paddingTop: "1rem"}} >
          <div style={{alignItems:"flex-start"}}><h6>{name}</h6></div> 
          <div>Quantity:<b>{quantity}</b></div>
          </li>
         <li> <div style={{flexDirection: "row-reverse"}}> Price: {price}</div> </li>
         <li> <div style={{paddingBottom: "0px"}}><Button> Remove </Button></div> </li>
         
       
         </ul>    
        </Paper>          
     </div>
  );
};

const mapstateToProps = (state) => {
  const cartItemLength = (state?.cart?.item?.data ?? []).length;
  return { cartItemLength }
}

export default connect(null, { removeItemFromCart })(CartScreen);
