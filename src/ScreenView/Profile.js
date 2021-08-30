import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../Context/authContext";
import { FirestoreContext } from "../Context/firestoreContext";
import RecipeList from "../Components/RecipeList";

const useStyles = makeStyles((muiTheme) => ({
  heading: {
    marginBottom: 50,
  },
}));

const Profile = () => {
  let history = useHistory();
  const classes = useStyles();
  const { user, signOut } = useContext(AuthContext);
  const { getFavorites, favorites } = useContext(FirestoreContext);
  const backup = "Not logged in";

  useEffect(() => {
    getFavorites();
  }, []);

  const onClickSignOut = () => {
    signOut();
    history.push("/");
  };

  console.log(favorites);
  console.log(user?.email);
  return (
    <Container component="main" maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          {user ? (
            <Button onClick={() => onClickSignOut()}>Sign Out</Button>
          ) : (
            <Button onClick={() => history.push("/signin")}>Sign in</Button>
          )}
          {user ? (
            <div className={classes.heading}>
              <Typography variant="h5">{user.email}</Typography>
              <Typography variant="h4">
                My <strike>CoConot</strike> - Faves
              </Typography>
              {user && <RecipeList currentRecipes={favorites} />}
            </div>
          ) : (
            <Typography variant="h5">{backup}</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
