import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//? material-ui
import { makeStyles } from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { List, ListItem, ListItemText, Avatar } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import avatar from "../../Image/avatar.png";
//? NextJs imports
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: "#fff",
  },
  shop: {
    cursor: "pointer",
    "& :hover": {
      backgroundColor: "#fff",
    },
  },
  menuSliderContainer: {
    width: 250,
    height: "100%",
    background: "#3333ff",
  },
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  listItem: {
    textAlign: "center",
    color: "white",
  },
}));

const menuItems = [
  { listText: "Produsts", listPath: "/" },
  { listText: "MyOrder", listPath: "/orders" },
  { listText: "SignUp", listPath: "/signup" },
  { listText: "Signin", listPath: "/login" },
];

function ButtonAppBar(props) {
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(slider, false)}
    >
      <Avatar className={classes.avatar} src={avatar} alt="Deepak" />
      <List>
        {menuItems.map((lsItem, key) => (
          <ListItem button key={key} component={Link} to={lsItem.listPath}>
            <ListItemText
              className={classes.listItem}
              primary={lsItem.listText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Box className={classes.root} component="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleSlider("right", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            <MobilRightMenuSlider
              anchor="left"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobilRightMenuSlider>

            {!props.userType ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}

            {props.userType === "1" ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}

              {props.userType === "2" ? (
              <React.Fragment>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Products
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    history.push("/orders");
                  }}
                >
                  My Orders
                </Button>
                <ShoppingCartIcon
                  className={classes.shop}
                  onClick={() => {
                    history.push("/cart-item");
                  }}
                />
              </React.Fragment>
                ) : null}  
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const userType = state?.login?.loginData?.data?.userType ?? "";
  return { userType };
};

export default connect(mapStateToProps)(ButtonAppBar);
