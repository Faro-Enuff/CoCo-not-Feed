import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../Context/authContext";
import { Typography } from "@material-ui/core";

const Profile = () => {
  let history = useHistory();
  const { user, signOut } = useContext(AuthContext);
  const backup = "Not logged in";
  console.log(user?.email);
  return (
    <Container component="main" maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          {user ? (
            <Button onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Button onClick={() => history.push("/signin")}>Sign in</Button>
          )}
          {user ? (
            <Typography variant="h5">{user.email}</Typography>
          ) : (
            <Typography variant="h5">{backup}</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
