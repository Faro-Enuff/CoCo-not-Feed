import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// React Router Dom
import { useHistory, Link } from "react-router-dom";
// Internal Imports
import { AuthContext } from "../../Context/authContext";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// Core Imports
import {
  Container,
  Typography,
  Avatar,
  Button,
  IconButton,
  CssBaseline,
  TextField,
  Grid,
  Box,
} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="secondary" align="center">
      {"Copyright © "}
      My CoCo(not) Feed
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((muiTheme) => ({
  closeIcon: {
    display: "flex",
    justifyContent: "right",
  },
  paper: {
    marginTop: muiTheme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: muiTheme.spacing(1),
    color: muiTheme.palette.secondary.contrastText,
    backgroundColor: muiTheme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: muiTheme.spacing(1),
  },
  submit: {
    margin: muiTheme.spacing(3, 0, 2),
  },
  googleAuth: {
    fontSize: 14,
    cursor: "pointer",
    color: muiTheme.palette.primary.dark,
  },
  signUpLink: {
    textDecoration: "none",
    color: muiTheme.palette.secondary.dark,
  },
}));

const SignIn = () => {
  let history = useHistory();
  const classes = useStyles();

  // Functionality to go Back to the previous window, in case you do not want to sign in
  const handleClose = () => {
    history.push("/profile");
  };
  // UseState for the profile relevant login data
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });
  // AuthContext -> Ways to sign in, via Google function or via simple email & password function
  const { signIn, signInWithGooglePopUp } = useContext(AuthContext);

  // Simple way to update the useState ot the sign in person (dependant on the input field)
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  // Click Event => Google auth. function to sign in
  const handleGoogleLink = () => {
    signInWithGooglePopUp();
    history.goBack();
  };

  // Submit (click&enter) => Email and password function to sign in
  const handleOnSubmit = (event) => {
    event.preventDefault();
    signIn(profile);
    //apparently we need 2 goBack functions to be on the prev. page
    history.goBack();
    history.goBack();
  };

  // console.log(profile);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.closeIcon}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} color="secondary">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={profile.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={profile.password}
          />
          <Grid item xs>
            <Link
              variant="body2"
              color="secondary"
              onClick={handleGoogleLink}
              className={classes.googleAuth}
            >
              <b>Sign in with your Google Account.</b>
            </Link>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2" className={classes.signUpLink}>
                Don't have an account? <b>Sign Up</b>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default SignIn;
