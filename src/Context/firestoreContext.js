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
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);

  ////////////////////////////////////////////////////////////////////////////
  // Favorite Functionalities
  ////////////////////////////////////////////////////////////////////////////
  const addNewFavorite = (title, image, id) => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);

      userRef.set(
        {
          favoriteRecipes: firebase.firestore.FieldValue.arrayUnion({
            title,
            image,
            id,
            timestamp: new Date(),
          }),
        },
        { merge: true }
      );
    } else {
      history.push("/signup");
    }
  };

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

  const getFavorites = () => {
    const docRef = db.collection("users").doc(user?.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setFavorites(doc.data().favoriteRecipes);
          // console.log(favorites);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
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
    }
  };
  // Method to include
  const allocateLikes = (currentRecipes) => {
    db.collection("recipes")
      .get()
      .then((querySnapshot) => {
        const likeArray = [];
        querySnapshot.forEach((doc) => {
          if (currentRecipes.filter((e) => e.id == doc.id).length > 0) {
            console.log(doc.id, " => ", doc.data());
            likeArray.push(doc.data());
          }
        });
        setLikes(likeArray);
      });
  };

  return (
    <FirestoreContext.Provider
      value={{
        addNewFavorite,
        deleteFavorite,
        getFavorites,
        favorites,
        likes,
        setCommunityLikes,
        allocateLikes,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
