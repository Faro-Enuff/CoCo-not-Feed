import { useState, createContext, useEffect } from "react";
import firebase, { googleAuth, db } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("Not logged in");
  const [userData, setUserData] = useState([]);

  ////////////////////////////////////////////////////////////////////////////
  //Auth State Observer
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(`user`, uid);
        // setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  // Sign Up with Google Auth
  ////////////////////////////////////////////////////////////////////////////

  const signInWithGooglePopUp = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then((result) => {
        console.log("User has signed in");
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        addDocUserData(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(
          `Errors occured during sign in: ${errorCode}, ${errorMessage}, ${email}, ${credential}`
        );
      });
  };
  ////////////////////////////////////////////////////////////////////////////
  // SignUp with Email and Password
  ////////////////////////////////////////////////////////////////////////////

  const signUp = ({ email, password, name }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        user.updateProfile({ displayName: name });
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
        console.log(`user`, user);
        // console.log(`user.displayName`, user.displayName);
        addDocUserData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorMessage`, errorMessage);
        console.log(`errorCode`, errorCode);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // SignIn Function
  ////////////////////////////////////////////////////////////////////////////

  const signIn = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);
        setUser(user);
        allocateUserData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorMessage`, errorMessage);
        console.log(`errorCode`, errorCode);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // SignOut Function
  ////////////////////////////////////////////////////////////////////////////

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log(user);
      })
      .catch((error) => {
        console.log(`Error Signing out`, error);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // Function to create userData -> doc gets named by user.uid
  ////////////////////////////////////////////////////////////////////////////

  const addDocUserData = (user) => {
    db.collection("users")
      .doc(user?.uid)
      .set({
        name: user?.displayName,
        avatar: user?.photoURL || "",
        favoriteRecipes: [],
      })
      .then((docRef) => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // Update User Data
  ////////////////////////////////////////////////////////////////////////////

  const updateUserData = (updateData) => {
    db.collection("users")
      .doc(user.uid)
      .set({
        ...updateData,
      })
      .then(() => {
        console.log("Document successfully written!");
        setUserData({ ...updateData });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  ////////////////////////////////////////////////////////////////////////////
  // Update userData useState
  ////////////////////////////////////////////////////////////////////////////

  const allocateUserData = () => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((doc) => {
          // console.log("Current data: ", doc?.data());
          setUserData(doc?.data());
        });
    }
  };

  // Return the Provider for the Router
  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        signInWithGooglePopUp,
        updateUserData,
        allocateUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
