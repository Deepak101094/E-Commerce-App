import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//? NextJs imports
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  links: {
    color: "#fff"
  },
  shop: {
    cursor: "pointer",
    "& :hover" : {
      backgroundColor: "#fff"
    }
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Products
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              history.push("/signup");
            }}
          >
            SignUp
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/add-product");
            }}
            color="inherit"
          >
            Add Product
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              history.push("/products-list");
            }}
          >
            ProductList
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              history.push("/");
            }}
          >
            Products
          </Button>
          <ShoppingCartIcon
          className={classes.shop}
            onClick={() => {
              history.push("/cart-item");
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
