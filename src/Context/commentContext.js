import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";
import firebase from "firebase/app";
import { db } from "../firebase.js";

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const [comment, setComment] = useState("");

  const writeNewComment = (recipeId, recipeTitle, commentText) => {
    if (user) {
      console.log(recipeId);
      const commentsRef = db.collection("recipes").doc(recipeId);
      console.log(commentsRef);
      commentsRef
        .set(
          {
            title: recipeTitle,
            comments: firebase.firestore.FieldValue.arrayUnion({
              name: user.displayName,
              text: commentText,
              timestamp: new Date(),
              avatar: "",
            }),
          },
          { merge: true }
        )
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  };

  return (
    <CommentContext.Provider value={{ writeNewComment }}>
      {children}
    </CommentContext.Provider>
  );
};
