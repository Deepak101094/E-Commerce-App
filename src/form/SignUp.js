import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//? react-hook-form
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "react-hook-form-devtools";
//? Layout
import Layout from "../Hoc/Layout";
//? actions
import { userSignUp } from "../store/actions/sign_up";
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [type, setType] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const handleChange = (event) => {
        setType(event.target.value);
    };

    const { handleSubmit, register, reset, control, errors } = useForm({
        mode: "onBlur",
    });

    const reqBodyHandler = (reqBody, e) => {
        setLoading(true);
        console.log(reqBody);
        e.target.reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <DevTool control={control} />
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(reqBodyHandler)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                as={
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="outlined-age-native-simple">
                                            User Type
                                        </InputLabel>
                                        <Select
                                            native
                                            label="User Type"
                                            inputProps={{
                                                name: "user-type",
                                                id: "user-type",
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>Admin</option>
                                            <option value={2}>Normal User</option>
                                        </Select>
                                    </FormControl>
                                }
                                name="userType"
                                control={control}
                                type="number"
                                // ref={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    {loading ? (
                        <div style={{ textAlign: "center" }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            reset={reset}
                        >
                            Sign Up
                        </Button>
                    )}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};
const signForm = connect(null, { userSignUp })(SignUp);
export default Layout(signForm);
