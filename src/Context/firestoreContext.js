import { createContext, useContext, useState } from "react";
import firebase from "firebase/app";
import { db } from "../firebase.js";
import { AuthContext } from "./authContext";
import { useHistory } from "react-router-dom";

export const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  // const personalRecipesRef = firestore.collection("recipes");
  // const query = personalRecipesRef.orderBy("createdAt").limit(10);
  // const [recipes] = useCollectionData(query, { idField: "id" });
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [likes, setLikes] = useState([]);

  ////////////////////////////////////////////////////////////////////////////
  // Update user Data
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
  // Favorite Functionalities by creating user DOC
  ////////////////////////////////////////////////////////////////////////////

  const addNewFavorite = (title, image, id) => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);

      userRef.set(
        {
          name: user.displayName,
          favoriteRecipes: firebase.firestore.FieldValue.arrayUnion({
            title,
            image,
            id,
          }),
        },
        { merge: true }
      );
    } else {
      history.push("/signin");
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  // Delete Favorite
  ////////////////////////////////////////////////////////////////////////////

  const deleteFavorite = (title, image, id) => {
    const userRef = db.collection("users").doc(user.uid);

    userRef.update({
      favoriteRecipes: firebase.firestore.FieldValue.arrayRemove({
        title,
        image,
        id,
      }),
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

  ////////////////////////////////////////////////////////////////////////////
  // Counting Likes Functionalities
  ////////////////////////////////////////////////////////////////////////////

  const setCommunityLikes = (recipeId, recipeTitle) => {
    if (user) {
      const docRef = db.collection("recipes").doc(recipeId);

      docRef
        .set(
          {
            title: recipeTitle,
            likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
          },
          { merge: true }
        )
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      history.push("/signin");
    }
  };
  const deleteLikes = (recipeId, recipeTitle) => {
    const userRef = db.collection("recipes").doc(recipeId);

    userRef.update({
      title: recipeTitle,
      likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
    });
  };

  // Method to include
  const allocateLikes = (currentRecipes) => {
    db.collection("recipes")
      .get()
      .then((querySnapshot) => {
        const likeArray = [];
        querySnapshot.forEach((doc) => {
          if (currentRecipes?.filter((e) => e.id == doc.id).length > 0) {
            // console.log(doc.id, " => ", doc.data());
            likeArray.push(doc?.data());
          }
        });
        setLikes(likeArray);
      });
  };

  return (
    <FirestoreContext.Provider
      value={{
        updateUserData,
        addNewFavorite,
        deleteFavorite,
        allocateUserData,
        userData,
        likes,
        setCommunityLikes,
        allocateLikes,
        deleteLikes,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
