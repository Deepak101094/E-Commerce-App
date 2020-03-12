import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _get from "lodash/get";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 300
  }
});

const Product = props => {
  const classes = useStyles();
  const { name, price, description, imageUrl } = _get(props, "product", {});
  return (
    <div className="container">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography>Rs. {price}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="contained">
            Add to cart
          </Button>
          <Button size="small"  color="red" variant="contained">
          Delete Product
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
