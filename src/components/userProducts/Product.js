import React, { useState} from "react";
import { useHistory } from "react-router-dom";
//? utility
import axios from "../../utility/axios/withHeader";
//? redux
import { connect } from "react-redux";

//?material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//?import from lodash
import _get from "lodash/get";

const useStyles = makeStyles((theme) => ({
   root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
   },
   cardMedia: {
      paddingTop: "56.25%", // 16:9
   },
   cardContent: {
      flexGrow: 1,
   },
   cardActions: {
      display: "flex",
      justifyContent: "space-between",
   },
}));

const Product = (props) => {
   const history = useHistory();
   const [loading, setLoading] = useState(false);

   const addTocartHandler = (productId) => {
      setLoading(true);
      // const { addToCartAction } = props;
      // addToCartAction(productId);
      // history.push("/cart-item")
      axios({
         method: "GET",
            url: `/add-to-cart?id=${productId}`,
            headers: {
               userid: localStorage.getItem("userId"),
            },
      }).then(response => {
         if(response.status === 200) {
            setLoading(false)
         }
      });
   };

   const classes = useStyles();
   const { name, price, description, imageUrl, _id } = _get(props, "product", {});
   return (
      <div className="container" maxWidth="md">
         <Card className={classes.root}>
            <CardActionArea>
               <CardMedia className={classes.cardMedia} image={imageUrl} title={name} />
               <CardContent className={classes.CardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                     {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                     {description}
                  </Typography>
                  <Typography>Rs. {price}</Typography>
               </CardContent>
            </CardActionArea>
            {localStorage.getItem("userId") ? (
               <CardActions className={classes.cardActions}>
                  {loading ? (
                     <div style={{ textAlign: "center" }}>
                        <CircularProgress />
                     </div>
                  ) : (
                     <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => addTocartHandler(_id)}
                     >
                        Add to cart
                     </Button>
                  )}
               </CardActions>
            ) : null}
         </Card>
      </div>
   );
};

export default Product;
