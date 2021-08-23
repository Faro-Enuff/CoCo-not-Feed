import { useState, createContext, useEffect } from "react";
import firebase, { provider } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Auth State Observer
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(`user`, uid);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  const signInWithGooglePopUp = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("User has signed in");
        // The signed-in user info.
        const user = result.user;
        setUser(user);
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

  const signUp = ({ email, password, name }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        console.log(`user`, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorMessage`, errorMessage);
        console.log(`errorCode`, errorCode);
      });
  };
  const signIn = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorMessage`, errorMessage);
        console.log(`errorCode`, errorCode);
      });
  };

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
  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, signInWithGooglePopUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
