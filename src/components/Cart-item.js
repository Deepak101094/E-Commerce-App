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
//?lodash
import _get from "lodash/get";

const Style = makeStyles({
    root: {
      maxWidth: 345
    },
    media: {
      height: 300
    },
  });
  
const cartItem = props => {
  const removeItemHandler = id => {
    const { removeItemFromCart } = props;
    removeItemFromCart(id);
  };

  const classes = Style();
  const { name, price, description, imageUrl, _id } = _get(props, "item", {});
  return (
    <div className="container">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography> Rs: {price} </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => removeItemHandler(_id)}
          >
            Remove Item
          </Button>
          <Button size="small" color="primary">
            Contine to Purchage
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default connect(null, { removeItemFromCart })(cartItem);
