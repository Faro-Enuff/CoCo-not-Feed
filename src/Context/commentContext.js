import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";
import firebase from "firebase/app";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";
import { FirestoreContext } from "./firestoreContext";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  let history = useHistory();
  const { user, userData } = useContext(AuthContext);
  const [commentCollection, setCommentCollection] = useState(null);

  const writeNewComment = (recipeId, recipeTitle, commentText) => {
    if (user) {
      const commentsRef = db.collection("recipes").doc(recipeId.toString());
      // console.log(commentsRef);
      // console.log(userData?.avatar);
      commentsRef
        .set(
          {
            title: recipeTitle,
            comments: firebase.firestore.FieldValue.arrayUnion({
              title: recipeTitle,
              name: user.displayName,
              text: commentText,
              timestamp: new Date().toString(),
              avatar: userData?.avatar || "",
            }),
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

  const allocateComments = (recipeId) => {
    db.collection("recipes")
      .doc(recipeId.toString())
      .onSnapshot((doc) => {
        // console.log("Current data: ", doc?.data());
        setCommentCollection(doc.data()?.comments);
      });
  };

  const value = { writeNewComment, allocateComments, commentCollection };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
