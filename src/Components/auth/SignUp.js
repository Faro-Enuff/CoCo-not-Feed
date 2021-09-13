import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// Internal Imports
import { AuthContext } from "../../Context/authContext";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// Core Imports
import {
  Container,
  Grid,
  Typography,
  TextField,
  CssBaseline,
  Box,
  Button,
  IconButton,
  Avatar,
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
    backgroundColor: muiTheme.palette.secondary.main,
    color: muiTheme.palette.secondary.contrastText,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: muiTheme.spacing(3),
  },
  submit: {
    margin: muiTheme.spacing(3, 0, 2),
  },
  signInLink: {
    textDecoration: "none",
    color: muiTheme.palette.secondary.dark,
  },
}));
const SignUp = () => {
  let history = useHistory();

  const classes = useStyles();

  // Functionality to go Back to the previous window, in case you do not want to sign in
  const handleClose = () => {
    history.push("/profile");
  };

  const [profile, setProfile] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { signUp } = useContext(AuthContext);

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    //prevent react from refreshing the page
    event.preventDefault();
    signUp(profile);
    history.push("/");
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                value={profile.name}
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
                autoComplete="email"
                onChange={handleChange}
                value={profile.email}
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
                onChange={handleChange}
                value={profile.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2" className={classes.signInLink}>
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

export default SignUp;
