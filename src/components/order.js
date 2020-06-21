import React from "react";
//? material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

//? lodash
import _get from "lodash/get";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const { name, price, description, image, _id } = _get(
    props,
    "order.product",
    {}
  );
  return (
    <div className="container">
     <React.Fragment>
    <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary={name} secondary={description} />
          <Typography variant="body2">{price}</Typography>
        </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" className={classes.total}>
          $34.06
        </Typography>
      </ListItem>
    </List>    
  </React.Fragment>
  </div>
  );
};
export default Order;
