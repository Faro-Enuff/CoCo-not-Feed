import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";

// React router dom Import
import { useHistory } from "react-router-dom";

// Icons Import
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

// Internal Imports
import { storage } from "../firebase.js";
import { AuthContext } from "../Context/authContext";
import RecipeList from "../Components/RecipeList";
import logo from "../Components/search/logo.jpg";

// Core Imports
import {
  Box,
  Card,
  Input,
  Button,
  Container,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import ProfileMenuNew from "../Components/profile/ProfileMenuNew";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    color: "#d7ccc8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textShadow: "2px 2px 2px #000000",
  },
  profileCard: {
    borderRadius: 25,
    backgroundColor: "#efebe9",
  },
  profileInformation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "right",
    marginRight: "5%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  profileName: {
    marginRight: "5%",
    marginLeft: "20%",
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  upload: {
    marginLeft: "2%",
  },
  logoPosition: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  favoriteContainer: {
    display: "flex",
    width: "100%",
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
  },
}));

const Profile = () => {
  const classes = useStyles();
  let history = useHistory();

  // useContext for the AuthContext, to have the user object for verification of displaying data as well as the signOut function
  const { user, allocateUserData, userData, updateUserData } =
    useContext(AuthContext);

  // Realtime update of the Favorites in Firestore gets initialized whenever the user changes
  useEffect(() => {
    allocateUserData();
  }, [user]);

  // Upload handler of an image
  const [imgLoading, setImgLoading] = useState(0);
  const fileSelectedHandler = (event) => {
    if (event.target.files) {
      handleUpload(event.target.files);
    }
    console.log(event.target.files[0]);
  };
  const handleUpload = (files) => {
    const file = files[0];
    console.log(file);
    firebaseStorageUpload(file);
  };

  const firebaseStorageUpload = (file) => {
    const storageRef = storage.ref();
    setImgLoading(0);
    // Upload file
    const uploadTask = storageRef.child(`avatar/${file.name}`).put(file);

    // Listen for state changes
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(`snapshot`, snapshot);
        let progress = Math.round(
          (snapshot.bytesTransferred * 100) / snapshot.totalBytes
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("success");
        setImgLoading(100);
        firebase
          .storage()
          .ref(`avatar/`)
          .child(`${file.name}`)
          .getDownloadURL()
          .then((url) =>
            updateUserData({
              avatar: url,
              name: user?.displayName,
              favoriteRecipes: userData?.favoriteRecipes,
            })
          );
      }
    );
  };

  // console.log(`favorites`, userData.favoriteRecipes);
  // console.log(user?.email);

  //Hide and Show features
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = (callback) => {
    resetView();
    setShowDetails(!showDetails);
    callback(null);
  };

  const [showFavorites, setShowFavorites] = useState(false);
  const handleShowFavorites = (callback) => {
    resetView();
    setShowFavorites(!showFavorites);
    callback(null);
  };

  const resetView = () => {
    setShowDetails(false);
    setShowFavorites(false);
  };

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
                <Box m={3} boxShadow={3} borderRadius={10}>
                  <ProfileMenuNew
                    handleShowDetails={handleShowDetails}
                    handleShowFavorites={handleShowFavorites}
                  />
                </Box>
              </div>

              {/* Profile Blog */}

              {showDetails && (
                <Box
                  border={2}
                  color="secondary.main"
                  boxShadow={3}
                  borderRadius={25}
                >
                  <Card className={classes.profileCard}>
                    <div className={classes.profileInformation}>
                      <div className={classes.profileName}>
                        <Typography variant="h5">{userData?.name}</Typography>
                      </div>
                      <div className={classes.pictureDiv}>
                        <Box
                          border={2}
                          borderRadius="50%"
                          borderColor="secondary.main"
                        >
                          <Avatar
                            src={userData?.avatar}
                            className={classes.profilePicture}
                          />
                        </Box>
                      </div>
                      <div className={classes.upload}>
                        <Input
                          required
                          accept="image/*"
                          onChange={fileSelectedHandler}
                          type="file"
                          id="imageUpload"
                        />
                        <label for="imageUpload">
                          {" "}
                          <AddAPhotoIcon
                            color="secondary"
                            fontSize="small"
                            style={{ cursor: "pointer" }}
                          />
                        </label>
                      </div>
                    </div>
                  </Card>
                </Box>
              )}

              {/* Favorite Blog */}

              {showFavorites && (
                <div className={classes.favoriteRecipes}>
                  <div className={classes.mainDiv}>
                    <Box
                      mt={2}
                      p={1}
                      boxShadow={3}
                      border={2}
                      borderRadius={25}
                      borderColor="secondary.main"
                    >
                      <Typography variant="h4">Your CoCo Feed</Typography>
                    </Box>
                    {userData && (
                      <RecipeList currentRecipes={userData?.favoriteRecipes} />
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className={classes.favoriteRecipes}>
                <div className={classes.mainDiv}>
                  <Typography color="primary" variant="h5">
                    Your
                  </Typography>
                  <Typography color="secondary" variant="h3">
                    <strike>CoConot</strike>{" "}
                  </Typography>
                  <Typography color="primary" variant="h5">
                    Profile
                  </Typography>
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
