import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Grid, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../Context/authContext";
import { FirestoreContext } from "../Context/firestoreContext";
import RecipeList from "../Components/RecipeList";
import logo from "../Components/search/logo.jpg";

const useStyles = makeStyles((muiTheme) => ({
  heading: {
    display: "flex",
    marginTop: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoPosition: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: muiTheme.spacing(10),
    height: muiTheme.spacing(10),
  },
  favoriteContainer: {
    display: "flex",
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  favoriteRecipes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20%",
  },
  signOutButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
}));

const Profile = () => {
  let history = useHistory();
  const classes = useStyles();
  const { user, signOut } = useContext(AuthContext);
  const { allocateFavorites, favorites } = useContext(FirestoreContext);

  useEffect(() => {
    allocateFavorites();
  }, []);

  const onClickSignOut = () => {
    signOut();
    history.push("/");
  };

  // console.log(favorites);
  // console.log(user?.email);
  return (
    <Container
      component="main"
      maxWidth="xs"
      className={classes.favoriteContainer}
    >
      <Grid container>
        <Grid item xs={12}>
          {user ? (
            <div>
              <div className={classes.signOutButton}>
                <Button
                  onClick={() => onClickSignOut()}
                  variant="contained"
                  color="primary"
                >
                  Sign Out
                </Button>
              </div>
              <div className={classes.favoriteRecipes}>
                <div className={classes.heading}>
                  <Typography variant="h4">
                    <strike>CoCo</strike> Favorites
                  </Typography>
                  {user && <RecipeList currentRecipes={favorites} />}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.favoriteRecipes}>
                <div className={classes.heading}>
                  <Typography variant="h5">Your</Typography>
                  <Typography variant="h3">
                    <strike>CoConot</strike>{" "}
                  </Typography>
                  <Typography variant="h5">Profile</Typography>
                  <div className={classes.logoPosition}>
                    <Avatar
                      alt="logo"
                      src={logo}
                      className={classes.logo}
                      variant="circular"
                    />
                  </div>
                </div>
              </div>
              <div className={classes.signOutButton}>
                <Button
                  onClick={() => history.push("/signin")}
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
