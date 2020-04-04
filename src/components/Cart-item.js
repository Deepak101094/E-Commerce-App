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
//? lodash
import _get from "lodash/get";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 250,
  },
});

const CartItem = (props) => {
  const removeItemHandler = (_id) => {
    const { removeItemFromCart } = props;
    removeItemFromCart(_id);
  };

  const classes = useStyles();
  //? data item.productId k andar aa rha tha line 37 me bas productId add kiya h
  const { name, price, description, image, _id } = _get(
    props,
    "item.productId",
    {}
  );
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography> Rs. {price} </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => removeItemHandler(_id)}
        >
          Remove item
        </Button>
      </CardActions>
    </Card>
  );
};

export default connect(null, { removeItemFromCart })(CartItem);
