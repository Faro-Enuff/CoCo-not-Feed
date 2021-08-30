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
      const userRef = db.collection("faves").doc(user.uid);

      userRef.update({
        recipes: firebase.firestore.FieldValue.arrayUnion({
          title,
          image,
          id,
        }),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      history.push("/signup");
    }
  };

  const deleteFavorite = (title, image, id) => {
    const userRef = db.collection("faves").doc(user.uid);

    userRef.update({
      recipes: firebase.firestore.FieldValue.arrayRemove({
        title,
        image,
        id,
      }),
    });
  };

  const getFavorites = () => {
    const docRef = db.collection("faves").doc(user?.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setFavorites(doc.data().recipes);
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

  //If it is the first like of a recipe (gets called by main function GETLIKES)
  const addDocLike = (recipeId, recipeTitle) => {
    db.collection("likes")
      .doc(recipeId)
      .set({
        title: recipeTitle,
        likes: [user.uid],
      })
      .then((docRef) => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  // Main Function -> proves if doc already exists?
  //(Y) => update like doc with the User ID -> array doc.length + 1 //
  //(N) => call addDocLike
  const getLikes = (recipeId, recipeTitle) => {
    if (user) {
      const docRef = db.collection("likes").doc(recipeId);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            //Update Likes Array
            docRef.update({
              likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
            });
            //Set Likes state with total amount
            // setLikes(docRef.data().likes.length);
            // console.log(favorites);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            addDocLike(recipeId, recipeTitle);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };
  // Method to include
  const allocateLikes = (currentRecipes) => {
    db.collection("likes")
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
        getLikes,
        allocateLikes,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
