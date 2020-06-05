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
import Badge from "@material-ui/core/Badge";
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
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

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
        {props.userType === 1 ? (
          <ListItem button component={Link} to={"/add-product"}>
            <ListItemText
              className={classes.listItem}
              primary={"Add Product"}
            />
          </ListItem>
        ) : null}
        {props.userType === 2 ? (
          <React.Fragment>
            <ListItem button component={Link} to={"/"}>
              <ListItemText className={classes.listItem} primary={"Products"} />
            </ListItem>
            <ListItem button component={Link} to={"/orders"}>
              <ListItemText className={classes.listItem} primary={"Orders"} />
            </ListItem>
            <ListItem button component={Link} to={"/cart-item"}>
              <Badge
                badgeContent={props.cartItemLength}
                style={{ justify: "center" }}
              >
                <ListItemText className={classes.listItem} primary={"Cart"} />
              </Badge>
            </ListItem>
          </React.Fragment>
        ) : null}
        {!props.userType ? (
          <React.Fragment>
            <ListItem button component={Link} to={"/signup"}>
              <ListItemText className={classes.listItem} primary={"SignUp"} />
            </ListItem>

            <ListItem button component={Link} to={"/login"}>
              <ListItemText className={classes.listItem} primary={"LogIn"} />
            </ListItem>
          </React.Fragment>
        ) : (
          <ListItem
            button
            component={Link}
            to={"/"}
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userType");
              localStorage.removeItem("persist:root");
              localStorage.clear();
              window.location.reload();
            }}
          >
            <ListItemText className={classes.listItem} primary={"Logout"} />
          </ListItem>
        )}
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

            {props.userType === 1 ? (
              <Button
                onClick={() => {
                  history.push("/add-product");
                }}
                color="inherit"
              >
                Add Product
              </Button>
            ) : null}

            {props.userType === 2 ? (
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
                  Orders
                </Button>
                <Badge badgeContent={props.cartItemLength} color="red">
                  <ShoppingCartIcon
                    className={classes.shop}
                    onClick={() => {
                      history.push("/cart-item");
                    }}
                  />
                </Badge>
              </React.Fragment>
            ) : null}

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
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userType");
                  localStorage.removeItem("persist:root");
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const userType = state?.login?.loginData?.data?.userType ?? "";
  const cartItemLength = (state?.cart?.item?.data ?? []).length;
  return { userType, cartItemLength };
};

export default connect(mapStateToProps)(ButtonAppBar);
