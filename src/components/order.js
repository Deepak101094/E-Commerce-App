import React from "react";
//? material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//? lodash
import _get from "lodash/get";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
});

const Order = (props) => {
  const classes = useStyles();
  const { name, price, description, image, _id } = _get(
    props,
    "order.product",
    {}
  );
  return (
    <div className="container">
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
            <Typography> Rs.{price} </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default Order;
