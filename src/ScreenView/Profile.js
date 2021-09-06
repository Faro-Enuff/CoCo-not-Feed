import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";

// React router dom Import
import { useHistory } from "react-router-dom";

// Icons Import
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

// Internal Imports
import { storage } from "../firebase";
import { AuthContext } from "../Context/authContext";
import { FirestoreContext } from "../Context/firestoreContext";
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

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    marginTop: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 25,
  },
  profileInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    marginRight: "8%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  profileName: {
    display: "flex",
    marginRight: "0%",
    paddingBottom: "15%",
    alignItems: "center",
  },
  pictureDiv: {
    display: "flex",
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: 2,
    borderColor: theme.palette.primary.main,
  },
  upload: {
    display: "flex",
    alignItems: "end",
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
  const { allocateUserData, userData, updateUserData } =
    useContext(FirestoreContext);

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
              <Box
                border={2}
                boxShadow={2}
                borderRadius={25}
                borderColor="primary.main"
              >
                <Card className={classes.profileCard}>
                  <div className={classes.profileInformation}>
                    <div className={classes.profileName}>
                      <Typography variant="body1">{userData.name}</Typography>
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
                          fontSize="small"
                          style={{ cursor: "pointer" }}
                        />
                      </label>
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
                  </div>
                </Card>
              </Box>
              <div className={classes.favoriteRecipes}>
                <div className={classes.heading}>
                  <Typography variant="h4">
                    <strike>CoCo</strike> Favorites
                  </Typography>
                  {userData && (
                    <RecipeList currentRecipes={userData?.favoriteRecipes} />
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
