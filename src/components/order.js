import React from 'react';
//? materail-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

});

const order = (props) => {
  const classes = useStyles();
 const { name, price, _id } = _get(props, "order", {} );
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Rs. {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"> Continue </Button>
      </CardActions>
    </Card>
  );
}
export default order;