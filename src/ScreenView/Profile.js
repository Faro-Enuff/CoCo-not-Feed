import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// React router dom Import
import { useHistory } from "react-router-dom";

// Internal Imports
import { storage } from "../firebase";
import { AuthContext } from "../Context/authContext";
import { FirestoreContext } from "../Context/firestoreContext";
import RecipeList from "../Components/RecipeList";
import logo from "../Components/search/logo.jpg";

// Core Imports
import {
  Input,
  Button,
  Container,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";

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
  const classes = useStyles();
  let history = useHistory();

  // useContext for the AuthContext, to have the user object for verification of displaying data as well as the signOut function
  const { user, signOut } = useContext(AuthContext);

  // useContext for the Favorite Context, to have access to the get function, as well as the useSate of favorites
  const { allocateUserData, userData } = useContext(FirestoreContext);

  // Realtime update of the Favorites in Firestore gets initialized whenever the user changes
  useEffect(() => {
    allocateUserData();
  }, [user]);

  // Sign Out function gets fired if you click the button + Redirect to the Homescreen
  const onClickSignOut = () => {
    signOut();
    history.push("/");
  };

  // Upload handler of an image
  const [imgLoading, setImgLoading] = useState(0);
  const fileSelectedHandler = (event) => {
    if (event.targer.files) {
      handleUpload(event.target.files);
    }
    console.log(event.target.files[0]);
  };
  const handleUpload = (files) => {
    const file = files[0];
    console.log(file);
    // firebaseStorageUpload(file);
  };

  // const firebaseStorageUpload = (file) => {
  //   const storageRef = storage.ref();

  //   // Upload file
  //   const uploadTask = storageRef.child(`avatar/${file.name}`.put(file);

  //   // Listen for state changes
  //   uploadTask.on("state_changed", (snapshot) => {
  //     console.log(`snapshot`, snapshot)
  //     let progress = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)

  //   }, (error) => {
  //     console.log(error);
  //   }, () => {
  //     console.log("success");
  //     setImgLoading(100);
  //     firebase.storage().ref(`avatar/`).child(`${file.name}`).getDownloadURL().then(console.log(url))
  //   })
  // };

  // console.log(`favorites`, userData.favoriteRecipes);
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
              <div className={classes.upload}>
                <Input
                  required
                  accept="image/*"
                  onChange={fileSelectedHandler}
                  type="file"
                />
              </div>
              <div className={classes.favoriteRecipes}>
                <div className={classes.heading}>
                  <Typography variant="h4">
                    <strike>CoCo</strike> Favorites
                  </Typography>
                  {userData && (
                    <RecipeList currentRecipes={userData.favoriteRecipes} />
                  )}
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
