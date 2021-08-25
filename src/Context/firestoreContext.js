import { createContext, useContext } from "react";
import firebase from "firebase/app";
import { AuthContext } from "./authContext";

export const firestore = firebase.firestore();

export const FirestoreContext = createContext();

export const FirestoreContextProvider = ({ children }) => {
  // const personalRecipesRef = firestore.collection("recipes");
  // const query = personalRecipesRef.orderBy("createdAt").limit(10);
  // const [recipes] = useCollectionData(query, { idField: "id" });

  const { user } = useContext(AuthContext);

  if (user) {
    console.log(user.uid);
  }

  const addDocFavorite = () => {
    firestore
      .collection("recipes")
      .doc(user.uid)
      .set({ Favorites: [] })
      .then((docRef) => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const addFavorite = (recipeFaves) => {
    const userRef = firestore.collection("recipes").doc(user.uid);

    userRef.update({
      Favorites: firebase.firestore.FieldValue.arrayUnion({
        recipe: recipeFaves,
        type: "semi",
      }),
    });
  };

  const deleteFavorite = (recipeFaves) => {
    const userRef = firestore.collection("recipes").doc(user.uid);

    userRef.update({
      Favorites: firebase.firestore.FieldValue.arrayRemove(recipeFaves),
    });
  };

  return (
    <FirestoreContext.Provider
      value={{ addDocFavorite, addFavorite, deleteFavorite }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
